import validations from "./validations";
import getIdName from "./../../../framework/helpers/getIdName";
import dynamic from "./../../../framework/dynamic/index";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";
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