import checkInstalledPackages from "./../initialization/checkInstalledPackages";
import checkModules from "./../initialization/checkModules";

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
    return new Promise( async (resolve, reject) => {
        let responseCheckInstalledPackages = await checkInstalledPackages(Configuration);
        let responseCheckModules = await checkModules(Configuration);
        resolve();
    });
}