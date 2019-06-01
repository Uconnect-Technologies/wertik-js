import actions from "./actions/index.ts";
import statusCodes from "./../helpers/statusCodes.ts";
import internalServerError from "./../../framework/helpers/internalServerError";

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
			fakeResponse.successMessageType = "Success";
			fakeResponse.successMessage = `${this.tableName} deleted`;
			return fakeResponse;
		} catch (e) {
			return internalServerError(e);
		}
	}

	async create(args) {
		try {
			let fakeResponse = await create(this.model,args,'');
			fakeResponse.successMessageType = "Success";
			fakeResponse.successMessage = `${this.tableName} created`;
			return fakeResponse;
		} catch (e) {
			return internalServerError(e);
		}
	}

	async update(args) {
		try {
			let response = await update(this.model,args);
			response.successMessageType = "Success";
			response.successMessage = `${this.tableName} updated`;
			return response;
		} catch (e) {
			return internalServerError(e);
		}
	}

	async view(args) {
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

	async findOne(args) {
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

	async paginate(args) {
		try {
			let response = await paginate(this.model,args);
			return response;
		} catch (e) {
			return internalServerError(e);
		}
	}
	getInstance() {
		return this.instance;
	}
}

export default Model;