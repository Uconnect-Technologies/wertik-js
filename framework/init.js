import {init} from "./connection/connection.js";
export default function () {
	let db = init();
	return db;
}