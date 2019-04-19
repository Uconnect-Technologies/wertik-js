import {get} from "lodash";
export default async function () {
	let filters = [{operator: ">",value: 1,column: "age" },{operator: ">",value: 1,column: "age" },{operator: ">",value: 1,column: "age" }]
	let string = "";
	filters.forEach( (item,index) => {
		let operator = get(item,'operator','');
		let value = get(item,'value','');
		let column = get(item, 'column','');
		if (operator && value && column) {
			string = string + `${column} ${operator} ${value} AND `;
		}
	});
	let a = string.trim().split(" ");
	a.pop();
	a = a.join(" ");
	return a;
}