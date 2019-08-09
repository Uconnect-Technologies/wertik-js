<template>
  <div>
    <list
      heading="Roles"
      :query="query"
      incoming="listRole"
      :fields="fields"
      :limit-options="limitOptions"
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
      query: `
        query Roles($pagination: PaginationInput,$filters: [FilterInput]) {
          listRole(pagination: $pagination, filters: $filters) {
            list {
              id
              name
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
