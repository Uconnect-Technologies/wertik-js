import connection from "./framework/database/mysql/connection.js";

connection.sync({force:true}).then(() => {
	console.log("comlete");
}).catch( (e) => console.error(`Something went wrong: ${e.message}`) )