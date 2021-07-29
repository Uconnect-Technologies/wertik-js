import { firstLetterLowerCase } from "./../../framework/helpers/index";

export default function (module) {
  return {
    graphql: {
      generateQueriesCrudSchema() {
        return `

        type ${module.name}List {
            list: [${module.name}]
            pagination: Pagination
            filters: [Filter]
            sorting: Sorting
            paginationProperties: PaginationProperties
        }
        type ${module.name}BulkMutationResponse {
            returning: [${module.name}]
            affectedRows: Int
        }
        type Count${module.name} {
            count: Int
        }
        

        extend type Query {
            view${module.name}(where: ${module.name}FilterInput): ${module.name}
            list${module.name}(pagination: PaginationInput, where: ${module.name}FilterInput, sorting: [SortingInput]): ${module.name}List
            count${module.name}(where: ${module.name}FilterInput):  Int
        }`;
      },
      generateMutationsCrudSchema() {
        return `
            extend type Mutation {
                bulkUpdate${module.name}(input: [update${module.name}input],where: ${module.name}FilterInput): ${module.name}BulkMutationResponse
                bulkCreate${module.name}(input: [create${module.name}input]): ${module.name}BulkMutationResponse
                bulkDelete${module.name}(where: ${module.name}FilterInput): SuccessResponse
            }
          `;
      },
      generateCrudResolvers() {
        return {
          Mutation: {
            [`bulkUpdate${module.name}`]: () => {},
            [`bulkDelete${module.name}`]: () => {},
            [`bulkCreate${module.name}`]: () => {},
          },
          Query: {
            [`view${module.name}`]: () => {},
            [`list${module.name}`]: () => {},
            [`count${module.name}`]: () => {},
          },
        };
      },
    },
  };
}
