import checkInstalledPackages from "./../initialization/checkInstalledPackages";

export const requiredFields = {
    name: "required",
    dialect: "mysql",
    db_username: "required",
    db_password: "required",
    db_name: "required",
    db_host: "required",
    db_port: "required",
}

export default function (Configuration) {
    return new Promise((resolve, reject) => {
        checkInstalledPackages(Configuration).then(() => {
            resolve();
        });
    });
}