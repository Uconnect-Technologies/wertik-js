import getDirectoriesInFolder from "./getDirectoriesInFolder.js";
export default function () {
	console.log("Loading all models");
	console.log(getDirectoriesInFolder(__dirname+"./../../app/modules/"))
}