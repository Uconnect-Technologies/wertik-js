"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let { buildSchema } = require("graphql");
const { ApolloServer } = require('apollo-server');
const loadAllMutations_1 = __importDefault(require("./loadAllMutations"));
const loadAllQueries_1 = __importDefault(require("./loadAllQueries"));
const loadAllResolvers_1 = __importDefault(require("./loadAllResolvers"));
const loadAllSchemas_1 = __importDefault(require("./loadAllSchemas"));
const generalSchema_1 = __importDefault(require("./../helpers/generalSchema"));
function default_1(rootDirectory, app, configuration) {
    let allMutations = loadAllMutations_1.default(rootDirectory);
    let allQueries = loadAllQueries_1.default(rootDirectory);
    let allSchemas = loadAllSchemas_1.default(rootDirectory);
    let allResolvers = loadAllResolvers_1.default(rootDirectory);
    let { validateAccessToken } = require(`${rootDirectory}/framework/predefinedModules/user/auth`).default;
    let mainSchema = `
		${generalSchema_1.default}
		${allSchemas}

		type Mutation {
			${allMutations}
		}
		type Query {
			${allQueries}
		}
		schema {
			query: Query
			mutatiobn: Mutation
		}
	`;
    let schema = buildSchema(mainSchema);
    const server = new ApolloServer({
        typeDefs: mainSchema,
        resolvers: allResolvers,
        context: (a) => __awaiter(this, void 0, void 0, function* () {
            yield validateAccessToken(a.req);
        })
    });
    server.listen(1209).then((a) => {
        console.log(`Server ready at ${a.url}`);
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map