<template>
  <div>
    <div class="page-header">
      <h2>{{ heading }}</h2>
      <div class="buttons">
        <el-button>Create Role</el-button>
      </div>
    </div>
    <div class="grid">
      <div class="columns">
        <div class="column resizable" v-bind:key="index" v-for="(field,index) in fields">
          <div class="head">{{ field.name }}</div>
          <div class="data" v-bind:key="index" v-for="(i,index) in data">
            <span class="data-entry">{{ i[field.key] }}</span>
          </div>
        </div>
        <div class="column actions">
          <div class="head">Actions</div>
          <div class="data" v-bind:key="index2" v-for="(i,index2) in data">
            <el-button size="mini" @click="deleteDialog = true;deleteId = i[primaryKey]">Delete</el-button>
            <router-link :to="`${urlResource}/${i[primaryKey]}/edit`">
              <el-button size="mini">Edit</el-button>
            </router-link>
          </div>
        </div>
      </div>
      <!-- dialog -->
      <el-dialog title="Delete" :visible.sync="deleteDialog" width="30%" center>
        <span>Are you sure you want to delete the selected item?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialog = false">Cancel</el-button>
          <el-button type="danger" @click="deleteInstance">Confirm</el-button>
        </span>
      </el-dialog>
      <!-- dialog -->
    </div>
    <div class="pagination">
      <div>
        <el-button :disabled="pagination.page == 1" @click="previousPage" size="mini">Previous</el-button>
        <el-select @change="handleLimitChange" size="mini" v-model="limit" placeholder="Select">
          <el-option v-for="item in limitOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button
          :disabled="pagination.page == dataPaginationProperties.pages"
          size="mini"
          @click="nextPage"
        >Next</el-button>
      </div>
      <div>
        <span>Current page: {{pagination.page}}</span>
        <span>&middot;</span>
        <span>Showing {{ data.length }} item(s) out of {{ dataPaginationProperties.total }} items.</span>
        <span v-if="filters.length > 0">Search applied</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    urlResource: {
      type: String,
      default: '',
      required: true
    },
    defaultLimit: {
      type: Number,
      default: 10
    },
    defaultPage: {
      type: Number,
      default: 1
    },
    deleteQuery: {
      type: String,
      default: '',
      required: true
    },
    query: {
      type: String,
      default: '',
      required: true
    },
    incoming: {
      type: String,
      default: '',
      required: true
    },
    fields: {
      type: Array,
      default: () => [],
      required: true
    },
    limitOptions: {
      type: Array,
      default: () => []
    },
    heading: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    ...mapState({
      primaryKey: state => state.primaryKey
    }),
    isLastPage() {
      return this.pagination.page == this.dataPaginationProperties.pages
    },
    isFirstPage() {
      return this.pagination.page == 1
    }
  },
  mounted() {
    this.pagination.limit = this.defaultLimit
    this.pagination.page = this.defaultPage
    this.loadEntries()
  },
  methods: {
    handleLimitChange(e) {
      this.pagination.limit = parseInt(this.limit)
      this.loadEntries()
    },
    nextPage() {
      if (!this.isLastPage) {
        this.pagination.page = this.pagination.page + 1
        this.loadEntries()
      }
    },
    previousPage() {
      if (!this.isFirstPage) {
        this.pagination.page = this.pagination.page - 1
        this.loadEntries()
      }
    },
    async deleteInstance() {
      let response = await this.$post(this.deleteQuery, {
        [this.primaryKey]: this.deleteId
      })
      if (response.success) {
        this.$notify.success({
          title: 'Success',
          message: 'Successfully deleted'
        })
        this.deleteId = null
        this.deleteDialog = false
        this.loadEntries()
      } else {
        this.$notify.error({
          title: 'Something went wrong',
          message: 'The item you are deleting cannot be deleted'
        })
      }
    },
    async loadEntries() {
      let query = this.query
      let filters = this.filters
      let pagination = this.pagination
      let response = await this.$post(query, {
        filters,
        pagination
      })
      if (response.success) {
        let list = response.data[this.incoming]
        this.data = list.list
        this.dataPaginationProperties = list.paginationProperties
      } else {
        response.errors.forEach(element => {
          this.$notify.error({
            title: response.message,
            message: element
          })
        })
      }
    }
  },
  data() {
    return {
      filters: [],
      limit: '20',
      pagination: {
        page: 1,
        limit: 10
      },
      deleteDialog: false,
      deleteId: null,
      data: [],
      dataPaginationProperties: {
        page: null,
        total: null
      }
    }
  }
}
</script>

<style>
.columns {
  display: flex;
  border-left: 1px solid rgb(204, 204, 204);
}
.column {
  border-top: 1px solid rgb(204, 204, 204);
  border-right: 1px solid rgb(204, 204, 204);
  border-bottom: 1px solid rgb(204, 204, 204);
}
.column.resizable {
  resize: horizontal;
}
.head {
  padding: 10px 8px;
  background: #eee;
  border-bottom: 1px solid rgb(204, 204, 204);
}
.data {
  height: 28px;
  border-bottom: 1px solid rgb(204, 204, 204);
  padding: 10px 9px;
  overflow: hidden;
}
.data:last-child {
  border-bottom: none;
}
.data .data-entry {
  padding-top: 3px;
  display: inline-block;
}
.page-header {
  display: flex;
}
.page-header .buttons {
  margin-left: auto;
  padding: 18px 0;
}
.pagination {
  border: 1px solid rgb(204, 204, 204);
  border-top: none;
  padding: 10px 7px;
  display: flex;
}
.pagination div:nth-child(2) {
  margin-left: auto;
}
.actions {
  flex: auto;
}
</style>
