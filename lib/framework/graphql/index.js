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
const { ApolloServer } = require("apollo-server");
const loadAllMutations_1 = __importDefault(require("./loadAllMutations"));
const loadAllQueries_1 = __importDefault(require("./loadAllQueries"));
const loadAllResolvers_1 = __importDefault(require("./loadAllResolvers"));
const loadAllSubscriptions_1 = __importDefault(require("./loadAllSubscriptions"));
const loadAllSchemas_1 = __importDefault(require("./loadAllSchemas"));
const generalSchema_1 = __importDefault(require("./../helpers/generalSchema"));
const validateAccessToken_1 = __importDefault(require("./../security/validateAccessToken"));
function default_1(rootDirectory, app) {
    let appMutations = loadAllMutations_1.default(rootDirectory);
    let appQueries = loadAllQueries_1.default(rootDirectory);
    let appSchema = loadAllSchemas_1.default(rootDirectory);
    let appResolvers = loadAllResolvers_1.default(rootDirectory);
    let appSubscriptions = loadAllSubscriptions_1.default(rootDirectory);
    let mainSchema = `
		${generalSchema_1.default}
		${appSchema}
		type Subscription {
			${appSubscriptions}
		}
		type Mutation {
			${appMutations}
		}
		type Query {
			${appQueries}
		}
		schema {
			query: Query
			mutation: Mutation
			subscription: Subscription
		}
	`;
    const server = new ApolloServer({
        typeDefs: mainSchema,
        resolvers: appResolvers,
        context: (req) => __awaiter(this, void 0, void 0, function* () {
            let validateToken = yield validateAccessToken_1.default(req);
            return {
            // ...validateToken
            };
        })
        // formatError(err) {
        //   console.log(err.extensions.code);
        //   return err;
        // },
        // formatError: err => ({ message: err.message, status: err.status })
    });
    server.listen(1209).then(({ url, subscriptionsUrl }) => {
        console.log(`Server ready at ${url}`);
        console.log(`Subscriptions ready at ${subscriptionsUrl}`);
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map