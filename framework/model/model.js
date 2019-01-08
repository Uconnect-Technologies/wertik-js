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
			let object = await this.model.findByPk(id);
			this.instance = object;
			return this;
		} catch (e) {
			console.log(e);
		}
	}	


	async delete(args = null) {
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

	async save(args) {
		try {
			let id = get(this,'instance.id',null);
			if (!id) {
				return await this.create(args);
			}else {
				return await this.update(args);
			}
		} catch (e) {
			console.log(e.message);
		}
	}


	async create(args) {
		try {
			let create = await this.model.create(args);
			this.instance = create;
			let bind = this;
			return bind;
		} catch (e) {
			console.log(e.message);
		}
	}

	async createAndReturnInstance(args) {
		
	}
	async updateAndReturnInstance(args) {
		
	}
	async viewAndReturnInstance(args) {
		
	}

	async update(args) {
		try {
			let id = get(this,'instance.id',null);
			let updateObject = await this.instance.update(args);
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

	async paginate(args) {
		try {
			let limit = get(args,'limit',20);
			let page = get(args,'page',1);
			let data = await this.model.findAndCountAll();
			let pages = Math.ceil(data.count / limit);
			let offset = limit * (page - 1);
			let find =  await this.model.findAll({ offset: offset, limit: limit });
			return {
				list: find,
				pagination: {
					page: offset,
					limit: limit
				}
			}
		} catch (e) {
			console.log(e.message);
		}
	}
	getInstance() {
		return this.instance;
	}
}

export default Model;