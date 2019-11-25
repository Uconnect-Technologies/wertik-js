import {get} from "lodash";

export const requiredFields = {
    name: "required",
    dialect: "mysql",
    db_username: "required",
    db_password: "required",
    db_name: "required",
    db_host: "required",
    db_port: "required",
}

export default function (object) {
    return new Promise((resolve, reject) => {
        const {name, dialect} = object;
        const db_name = get(object,'db_name','');
        const db_host = get(object,'db_host','');
        const db_port = get(object,'db_port','');
        if (name && dialect) {
            if (dialect == "mysql" && db_name && db_host && db_port ) {
                resolve("Configuration object passed");
            }else {
                reject(["Missing db_name/db_host/db_port for MYSQL dialect."]);
            }
        }else {
            reject(["Missing name", "Missing Dialect"]);
        }
    })
}