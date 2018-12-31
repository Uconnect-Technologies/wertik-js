import {get} from "lodash";
import connection from "./../connection/connection.js"

class Model {
	constructor(props) {
		this.tableName = get(props,'tableName','');
		this.instance = null;
	}

	async findOne(id) {
		let object = await this.table.findOne({
			where: { id: id }
		});
		this.instance = object;
		return this;
	}	


	async delete(args) {
		let id = get(this,'instance.id',null);
		if (id > 0) {
			let deleteItem = await this.table.destroy({
				where: {
					id: id
				}
			});
		}else {
			let deleteItem = await this.table.destroy({
				where: args
			});
		}
	}


	async create(args) {
		let create = await this.table.create(args);
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