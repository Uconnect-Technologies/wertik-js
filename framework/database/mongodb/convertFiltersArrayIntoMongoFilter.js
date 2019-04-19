export default async function (filters) {
	let c = {};
	filters.forEach((a) => {
		c[a.column] = a.value;
	});
	return c;
}