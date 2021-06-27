import { Sequelize } from "sequelize";
export const useDatabase = async function (obj: any) {
  const sequelize = new Sequelize(obj.name, obj.username, obj.password, {
    host: obj.host,
    dialect: "mysql",
    logging: false,
  });
  try {
    await sequelize.authenticate();
    console.log(`[DB] Succcessfully connected to database ${obj.name}`);
  } catch (e) {
    throw new Error(`[DB] Error connecting to database ${obj.name}`);
  }
  return {
    instance: sequelize,
  };
};
