import fs from "fs";
export default function getDirectoriesInFolder(path: any) {
	return fs.readdirSync(path).filter(function (file: any) {
		return fs.statSync(path+'/'+file).isDirectory();
	});
}