import { firstLetterLowerCase } from "./../../framework/helpers/index";

export default function (module) {
  return {
    graphql: {
      generateQueriesCrudSchema() {
        return `

        type ${module.table}List {
            list: [${module.table}]
            pagination: Pagination
            filters: [Filter]
            sorting: Sorting
            paginationProperties: PaginationProperties
        }
        type ${module.table}BulkMutationResponse {
            returning: [${module.table}]
            affectedRows: Int
        }
        type Count${module.table} {
            count: Int
        }
        

        extend type Query {
            view${module.table}(where: ${module.table}FilterInput): ${module.table}
            list${module.table}(pagination: PaginationInput, where: ${module.table}FilterInput, sorting: [SortingInput]): ${module.table}List
            count${module.table}(where: ${module.table}FilterInput):  Int
        }`;
      },
      generateMutationsCrudSchema() {
        return `
            extend type Mutation {
                bulkUpdate${module.table}(input: [update${module.table}input],where: ${module.table}FilterInput): ${module.table}BulkMutationResponse
                bulkCreate${module.table}(input: [create${module.table}input]): ${module.table}BulkMutationResponse
                bulkDelete${module.table}(where: ${module.table}FilterInput): SuccessResponse
            }
          `;
      },
      generateCrudResolvers() {
        return {
          Mutation: {
            [`bulkUpdate${module.table}`]: () => {},
            [`bulkDelete${module.table}`]: () => {},
            [`bulkCreate${module.table}`]: () => {},
          },
          Query: {
            [`view${module.table}`]: () => {},
            [`list${module.table}`]: () => {},
            [`count${module.table}`]: () => {},
          },
        };
      },
    },
  };
}
