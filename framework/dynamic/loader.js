export default function (moduleName,{mutations,queries}) {
	return {
		queries: {
			[`list${moduleName}`]: async (_, args, g) => {
				return queries[`list${moduleName}`](_,args,g);
			},
			[`view${moduleName}`]: async (_, args, g) => {
				return queries[`view${moduleName}`](_,args,g);
			}
		},
		mutations: {
			[`create${moduleName}`]: async (_, args, g) => {
      	return mutations[`create${moduleName}`](_,args.input,g);
	    },
	    [`delete${moduleName}`]: async (_, args, g) => {
	      return mutations[`delete${moduleName}`](_,args.input,g);
	    },
	    [`update${moduleName}`]: async (_, args, g) => {
	      return mutations[`update${moduleName}`](_,args.input,g);
	    },
	    [`updateBulk${moduleName}`]: async (_, args, g) => {
	      return mutations[`updateBulk${moduleName}`](_,args.input,g);
	    },
	    [`createBulk${moduleName}`]: async (_, args, g) => {
	      return mutations[`createBulk${moduleName}`](_,args.input,g);
	    },
		}
	}
}