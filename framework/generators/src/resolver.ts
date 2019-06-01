import validations from "./validations.ts";
import getIdName from "./../../../framework/helpers/getIdName.ts";
import dynamic from "./../../../framework/dynamic/index.ts";
import allModels from "./../../../framework/dynamic/allModels.ts";
import relateResolver from "./../../../framework/database/relateResolver.ts";
let { gameModel } = allModels;

let gameResolver = dynamic.resolvers({
  moduleName: 'game',
  validations: {
    create: validations.creategame,
    delete: validations.deletegame,
    update: validations.updategame,
    view: validations.game
  },
  model: gameModel
});


export default {

	queries: {
		...dynamic.loader("game",gameResolver).mutations
  },

  mutations: {
  	...dynamic.loader("game",gameResolver).mutations
  },

}