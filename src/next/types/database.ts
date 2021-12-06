import { iObject } from ".";

export interface useDatabaseProps {
  /**
   * Database name
   */
  name: string;
  /**
   * Database user name
   */
  username: string;
  /**
   * Database user password
   */
  password: string;
  /**
   * Database host
   */
  host: string;
  /**
   * Database port
   */
  port: number;
  /**
   * Sequelize Database options.
   */
  options?: iObject;
}
