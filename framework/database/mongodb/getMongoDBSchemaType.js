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
	}
}