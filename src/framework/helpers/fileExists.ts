var fs = require("fs");

export default function exists(path: any){
	try{
		fs.accessSync(path);
	} catch (err){
		return false;
	}
	return true;
}