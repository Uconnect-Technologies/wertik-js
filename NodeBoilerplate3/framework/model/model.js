import {get} from "lodash";

class Model {
	constructor(props) {
		this.instance = null;
		this.tableName = props.tableName;
    this.models = props.models;
		this.model = this.models[this.tableName];
	}

	async findOne(args) {
		let object = await this.model.findOne({
			where: args
		});
		return object;
	}

	async findOneByID(id) {
		try {
			let object = await this.model.findByPk(id);
			return object;
		} catch (e) {
			console.log(e);
		}
	}	


	async delete(args = null) {
		let id = get(this,'instance.id',null);
		try {
			await this.model.destroy({
				where: {
					id: id
				}
			});
			return true;
		} catch (e) {
			console.log(e.message);
			return false;
		}
	}


	async create(args) {
		try {
			let create = await this.model.create(args);
			return create;
		} catch (e) {
			console.log(e.message);
		}
	}

	async update(args) {
		try {
			let id = get(args,'id',null);
			let updateObject = await this.findOneByID(id);
			let update = await updateObject.update(args);
			return update;
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
			let find = await this.model.findAll({ offset: offset, limit: limit });
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