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
			let fakeResponse = {};
			await destroy(this.model,args);
			fakeResponse.statusCode = statusCodes.CREATED.type;
			fakeResponse.statusCodeNumber = statusCodes.CREATED.number;
			fakeResponse.successMessageType = "Success";
			fakeResponse.successMessage = `${this.tableName} deleted`;
			return fakeResponse;
		} catch (e) {
			console.log(e.message);
			return false;
		}
	}


	async create(args) {
		try {
			let response = await create(this.model,args,'');
			model.statusCode = statusCodes.CREATED.type;
			model.statusCodeNumber = statusCodes.CREATED.number;
			model.successMessageType = "Success";
			model.successMessage = `${this.tableName} created`;
			return response;
		} catch (e) {
			console.log(e.message);
		}
	}

	async update(args) {
		try {
			let response = await update(this.model,args);
			response.statusCode = statusCodes.OK.type;
			response.statusCodeNumber = statusCodes.OK.number;
			response.successMessageType = "Success";
			response.successMessage = `${this.tableName} updated`;
			return response;
		} catch (e) {
			console.log(e.message);
		}
	}

	async view(args) {
		try {
			let response = await view(this.model,args);
			response.statusCode = statusCodes.OK.type;
			response.statusCodeNumber = statusCodes.OK.number;
			response.successMessageType = "Success";
			response.successMessage = `${this.tableName} fetched`;
			return response;
		} catch (e) {
			console.log(e.message);
		}
	}

	async findOne(args) {
		try {
			let response = await findOne(this.model,args);
			response.statusCode = statusCodes.OK.type;
			response.statusCodeNumber = statusCodes.OK.number;
			response.successMessageType = "Success";
			response.successMessage = `${this.tableName} fetched`;
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