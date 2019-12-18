let {ApolloError} = require("apollo-server");
import fs from "fs";

export const generateError = (e: any,statusCode: Number = 404) => {
    return new ApolloError(e.message);
}

export const getDirectoriesInFolder = (path: string) => {
	return fs.readdirSync(path).filter(function (file: any) {
		return fs.statSync(path+'/'+file).isDirectory();
	});
}

export const filesInAFolder = (path: string) => {
	return fs.readdirSync(path);
}

export const exists = (path: any) => {
	try{
		fs.accessSync(path);
	} catch (err){
		return false;
	}
	return true;
}

export const appendToFileSync = function (path: string, content: string) {
  // try {
    fs.appendFileSync(path, content);
  //   return true;
  // } catch (e) {
  //   return false;
  // }
}

export const createEmptyFile = function (path: string,cb: Function) {
  fs.writeFile(path, '', function (err) {
    if (err) throw err;
    cb();
  });
}

export const deleteFile = async (path: string, cb: Function) => {
  if (exists(path)) {
    try {
      fs.unlink(path, function (err) {
        cb();
      });
      return true;
    } catch (e) {
      return false;
    }
  }else {
    return true;
  }
}