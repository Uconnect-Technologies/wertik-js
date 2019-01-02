import conn from "./framework/connection/connection.js";
const {
	PORT,
	MODE
} = process.env;
conn.sync({force: true}).then(()=> {
	console.log("sync complete");
	process.exit();
})