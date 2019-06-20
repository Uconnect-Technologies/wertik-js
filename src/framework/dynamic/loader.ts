export default function (moduleName: any,graphql: any) {
	let {mutations,queries} = graphql;
	return {
		queries: {
			[`list${moduleName}`]: async (_: any, args: any, g: any) => {
				return queries[`list${moduleName}`](_,args,g);
			},
			[`view${moduleName}`]: async (_: any, args: any, g: any) => {
				return queries[`view${moduleName}`](_,args,g);
			}
		},
		mutations: {
			[`create${moduleName}`]: async (_: any, args: any, g: any) => {
      	return mutations[`create${moduleName}`](_,args,g);
	    },
	    [`delete${moduleName}`]: async (_: any, args: any, g: any) => {
	      return mutations[`delete${moduleName}`](_,args,g);
	    },
	    [`update${moduleName}`]: async (_: any, args: any, g: any) => {
	      return mutations[`update${moduleName}`](_,args,g);
	    },
	    [`updateBulk${moduleName}`]: async (_: any, args: any, g: any) => {
	      return mutations[`updateBulk${moduleName}`](_,args,g);
	    },
	    [`createBulk${moduleName}`]: async (_: any, args: any, g: any) => {
	      return mutations[`createBulk${moduleName}`](_,args,g);
	    },
	    [`deleteBulk${moduleName}`]: async (_: any, args: any, g: any) => {
	      return mutations[`deleteBulk${moduleName}`](_,args,g);
	    },
		}
	}
}