export default `
  profileView(id: Int,_id: String): Profile
  listProfile(pagination: PaginationInput,filters: [FilterInput]): [Profile]
`