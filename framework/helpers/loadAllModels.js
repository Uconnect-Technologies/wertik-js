import getDirectoriesInFolder from "./getDirectoriesInFolder.js";
import {get} from "lodash";
import fs from "fs";
export default function () {
	console.log("Loading all models");
	let models = [];
	let modules = getDirectoriesInFolder(__dirname+"./../../app/modules/");
	modules.map((item) => {
		let filePath = `${__dirname}./../../app/modules/${item}/model.js`;
		if (fs.existsSync(filePath)) {
			let path = require(filePath).default;
			let fields = get(path,'fields',null);
			let tableName = get(path,'tableName',null)
			if (fields && tableName) {
				models.push({
					tableName,
					fields: fields()
				})
			}else {
				throw "Fields and tablename property require for " + item;
			}
		}else {
			console.warn("Model not found for " + item)
		}
	})
	return models;
}