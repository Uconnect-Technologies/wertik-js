import {get} from "lodash";
import {models} from "./../connection/connection.js"

class Model {
	constructor(props) {
		this.instance = null;
		this.tableName = props.tableName;
		this.model = models[this.tableName];
		this.models = models;
	}

	async findOne(id) {
		let object = await this.model.findOne({
			where: { id: id }
		});
		this.instance = object;
		return this;
	}	


	async delete(args) {
		let id = get(this,'instance.id',null);
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
	}


	async create(args) {
		let create = await this.model.create(args);
		this.instance = create;
		return this;
	}

	async update(args) {
		let updateObject = await this.instance.updateAttributes(args);
		this.instance = updateObject;
		return this;
	}

	async view(args) {
		let id = get(args,'id',null);
		if (id>0) {
			return await this.findOne(id);
		}
	}


	async save(args) {
		let id = get(this,'instance.id',null);
		if (id>0) {
			await this.update(args);
		}else {
			await this.create(args);
		}
		return this;
	}

}

export default Model;