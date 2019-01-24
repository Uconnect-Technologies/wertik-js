import {get} from "lodash";
import actions from "./actions/index.js";

const {
	create,
	update,
	destroy,
	findOne,
	view,
	paginate
} = actions;

class Model {
	constructor(props) {
		this.instance = null;
		this.tableName = props.tableName;
    this.models = props.models;
		this.model = this.models[this.tableName];
	}



	async delete(args) {
		try {
			await destroy(this.model,args);
			return true;
		} catch (e) {
			console.log(e.message);
			return false;
		}
	}


	async create(args) {
		try {
			let response = await create(this.model,args,'');
			return response;
		} catch (e) {
			console.log(e.message);
		}
	}

	async update(args) {
		try {
			let response = await update(this.model,args);
			return response;
		} catch (e) {
			console.log(e.message);
		}
	}

	async view(args) {
		try {
			let response = await view(this.model,args);
			return response;
		} catch (e) {
			console.log(e.message);
		}
	}

	async findOne(args) {
		try {
			let response = await findOne(this.model,args);
			return response;
		} catch (e) {
			console.log(e.message);
		}
	}

	async paginate(args) {
		try {
			let response = await paginate(this.model,args);
			return response;
		} catch (e) {
			console.log(e.message);
		}
	}
	getInstance() {
		return this.instance;
	}
}

export default Model;