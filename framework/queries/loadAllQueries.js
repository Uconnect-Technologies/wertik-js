/*
	Loads all queries from the app
*/

import getDirectoriesInFolder from "./../helpers/getDirectoriesInFolder.js";
import fs from "fs";


export default function () {
	let directories = getDirectoriesInFolder(__dirname+"/../../app/modules/");
	let queries = {};
	directories.map((item) => {
		let filePath = `${__dirname}./../../app/modules/${item}/queries.js`;
		if (fs.existsSync(filePath)) {
			let file = require(filePath).default;
			queries = {...queries,...file};
		}
	});
	return queries;
}