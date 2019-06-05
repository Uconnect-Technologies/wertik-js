import actions from "./actions/index";
import statusCodes from "./../helpers/statusCodes";
import internalServerError from "./../../framework/helpers/internalServerError";
import {get} from "lodash";

const {
	create,
	update,
	destroy,
	findOne,
	view,
	paginate
} = actions;

class Model {
	instance: any;
	tableName: string;
	models: any;
	model: any;
	constructor(props: any) {
		this.instance = null;
		this.tableName = props.tableName;
    this.models = props.models;
		this.model = this.models[this.tableName];
	}

	async delete(args: any) {
		try {
			let fakeResponse: any = {};
			await destroy(this.model,args);
			fakeResponse.successMessageType = "Success";
			fakeResponse.successMessage = `${this.tableName} deleted`;
			return fakeResponse;
		} catch (e) {
			return internalServerError(e);
		}
	}

	async create(args: any) {
		try {
			let fakeResponse: any = await create(this.model,args,'');
			fakeResponse.successMessageType = "Success";
			fakeResponse.successMessage = `${this.tableName} created`;
			return fakeResponse;
		} catch (e) {
			return internalServerError(e);
		}
	}

	async update(args: any) {
		try {
			let response: any = await update(this.model,args);
			response.successMessageType = "Success";
			response.successMessage = `${this.tableName} updated`;
			return response;
		} catch (e) {
			return internalServerError(e);
		}
	}

	async view(args: any) {
		try {
			let response = await view(this.model,args);
			if (!response) {
				return null;
			}
			response.successMessageType = "Success";
			response.successMessage = `${this.tableName} fetched`;
			return response;
		} catch (e) {
			return internalServerError(e);
		}
	}

	async findOne(args: any) {
		try {
			let response = await findOne(this.model,args);
			if (!response) {
				return null;
			}
			response.successMessageType = "Success";
			response.successMessage = `${this.tableName} fetched`;
			return response;
		} catch (e) {
			return internalServerError(e);
		}
	}

	async paginate(args: any) {
		try {
			let response = await paginate(this.model,args);
			return response;
		} catch (e) {
			return internalServerError(e);
		}
	}
	getInstance() {
		return get(this,'instance',null);
	}
}

export default Model;