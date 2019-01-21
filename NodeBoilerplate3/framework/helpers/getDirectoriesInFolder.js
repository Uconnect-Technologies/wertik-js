import fs from "fs";
export default function getDirectoriesInFolder(path) {
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path+'/'+file).isDirectory();
	});
}