const relations = ['user', 'forgetPassword','permission','role','rolePermission','userRole','userPermission',"profile" ];

export default function (type) {
	type = type.toLowerCase();
	if (type == "string") {
		return String
	}else if (type == "int") {
		return Number;
	}else if (type == "boolean") {
		return Boolean;
	}else if (type == "date" || type == "datetime") {
		return Date;
	}else if (relations.indexOf(type) > -1) {
		return String;
	}
}