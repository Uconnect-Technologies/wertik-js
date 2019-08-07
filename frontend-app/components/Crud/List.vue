<template>
  <div>
    <div class="page-header">
      <h2>Roles</h2>
      <div class="buttons">
        <el-button>Create Role</el-button>
      </div>
    </div>
    <div class="grid">
      <div class="columns">
        <div class="column" v-bind:key="index" v-for="(field,index) in fields">
          <div class="head">{{ field.name }}</div>
          <div class="data" v-bind:key="index" v-for="(i,index) in data">
            <span class="data-entry">{{ i[field.key] }}</span>
          </div>
        </div>
        <div class="column actions">
          <div class="head">Actions</div>
          <div class="data" v-bind:key="index2" v-for="(i,index2) in data">
            <el-button size="mini" @click="deleteDialog = true">Delete</el-button>
            <el-button size="mini">Edit</el-button>
          </div>
        </div>
      </div>
      <!-- dialog -->
      <el-dialog title="Delete" :visible.sync="deleteDialog" width="30%" center>
        <span>Are you sure you want to delete the selected item?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialog = false">Cancel</el-button>
          <el-button type="danger" @click="deleteDialog = false">Confirm</el-button>
        </span>
      </el-dialog>
      <!-- dialog -->
    </div>
    <div class="pagination">
      <el-button size="mini">Previous</el-button>
      <el-select size="mini" v-model="limit" placeholder="Select">
        <el-option v-for="item in limitOptions" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-button size="mini">Next</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limit: '20',
      deleteDialog: false,
      fields: [
        { name: 'Name', key: 'name' },
        { name: 'Age', key: 'age' },
        { name: 'Title', key: 'title' }
      ],
      limitOptions: ['100', '50', '20', '10'],
      data: [
        { name: 'Name', age: 12, title: 'asdasd' },
        { name: 'Name', age: 12, title: 'asdasd' },
        { name: 'Name', age: 12, title: 'asdasd' }
      ]
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
  min-width: 100px;
  display: inline-block;
  border-top: 1px solid rgb(204, 204, 204);
  border-right: 1px solid rgb(204, 204, 204);
  border-bottom: 1px solid rgb(204, 204, 204);
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
}
.actions {
  width: 100%;
}
</style>
