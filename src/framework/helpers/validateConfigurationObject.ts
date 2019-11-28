
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
        if (name && dialect) {
            resolve("Configuration object passed");
        }else {
            reject(["Missing name", "Missing Dialect"]);
        }
    })
}