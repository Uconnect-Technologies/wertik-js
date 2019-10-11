<template>
  <div>
    <list
      url-resource="/admin/role-management/roles"
      heading="Role"
      :query="query"
      incoming="listRole"
      :fields="fields"
      :limit-options="limitOptions"
      :delete-query="deleteQuery"
    />
  </div>
</template>

<script>
import List from '~/components/crud/List'
export default {
  components: {
    List
  },
  data() {
    return {
      limitOptions: ['100', '50', '20', '10'],
      fields: [{ name: 'Id', key: 'id' }, { name: 'Name', key: 'name' }],
      deleteQuery: `
        mutation($id: Int) {
          deleteRole(input: {id: $id}) {
            id
          }
        }
      `,
      query: `
        query Roles($pagination: PaginationInput,$filters: [FilterInput]) {
          listRole(pagination: $pagination, filters: $filters) {
            list {
              id
              name
            }
            filters {
              operator
              value
              column
            }
            pagination {
              limit
              page
            }
            paginationProperties {
              total
              nextPage
              previousPage
              pages
            }
          }
        }
      `
    }
  }
}
</script>

<style>
</style>
