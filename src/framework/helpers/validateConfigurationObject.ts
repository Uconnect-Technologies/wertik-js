export default function (object) {
    return new Promise((resolve, reject) => {
        const {name} = object;
        if (name) {
            resolve("Configuration object passed");
        }else {
            reject(["Missing name"]);
        }
    })
}