export default function () {
    let modules = process.env.builtinModules.split(",");
    modules.forEach(element => {
        let module = require(`./../builtinModules/${element}/index`).default;
        console.log(module)
    });
}