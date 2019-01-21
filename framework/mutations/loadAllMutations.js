/*
	Loads all mutations from the app
*/

import getDirectoriesInFolder from "./../helpers/getDirectoriesInFolder.js";
import fs from "fs";

export default function () {
	let directories = getDirectoriesInFolder(__dirname+"/../../app/modules/");
	let mutations = {};
	directories.map((item) => {
		let filePath = `${__dirname}./../../app/modules/${item}/mutations.js`;
		if (fs.existsSync(filePath)) {
			let file = require(filePath).default;
			mutations = {...mutations,...file};
		}
	});
	return mutations;
}