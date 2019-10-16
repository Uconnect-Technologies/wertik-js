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