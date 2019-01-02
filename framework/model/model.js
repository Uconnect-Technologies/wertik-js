import {get} from "lodash";
import {models} from "@framework/connection/connection.js";

class Model {
	constructor(props) {
		this.instance = null;
		this.tableName = props.tableName;
		this.model = models[this.tableName];
		this.models = models;
	}

	async findOne(id) {
		try {
			let object = await this.model.findOne({
				where: { id: id }
			});
			this.instance = object;
			return this;
		} catch (e) {
			console.log(e);
		}
	}	


	async delete(args) {
		let id = get(this,'instance.id',null);
		try {
			if (id > 0) {
				let deleteItem = await this.model.destroy({
					where: {
						id: id
					}
				});
			}else {
				let deleteItem = await this.model.destroy({
					where: args
				});
			}
			return true;
		} catch (e) {
			console.log(e.message);
			return false;
		}
	}


	async create(args) {
		try {
			let create = await this.model.create(args);
			this.instance = create;
			return this;
		} catch (e) {
			console.log(e.message);
		}
	}

	async update(args) {
		try {
			let updateObject = await this.instance.updateAttributes(args);
			this.instance = updateObject;
			return this;
		} catch (e) {
			console.log(e.message);
		}
	}

	async view(args) {
		try {
			let id = get(args,'id',null);
			if (id>0) {
				return await this.findOne(id);
			}
		} catch (e) {
			console.log(e.message);
		}
	}


	async save(args) {
		try {
			let id = get(this,'instance.id',null);
			if (id>0) {
				await this.update(args);
			}else {
				await this.create(args);
			}
			return this;
		} catch (e) {
			console.log(e.message);
		}
	}

}

export default Model;