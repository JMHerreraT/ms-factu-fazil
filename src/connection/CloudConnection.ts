import { MySqlConnection, MySqlDatabase } from '@jherrerat/lib-commons/database';
let poolConnection;

const dbconfig = {
  user: process.env.PC_CLOUD_USER,
  password: process.env.PC_CLOUD_PASSWORD,
  host: process.env.PC_CLOUD_HOST,
  database: process.env.PC_CLOUD_HOST?.split('.')[0],
};

class CloudConnection extends MySqlConnection.default {
  static async getPool() {
    if (!poolConnection) {
      poolConnection = await this.createPool(dbconfig);
    }
    return poolConnection;
  }

  static async _createPool() {
    if (!poolConnection) {
      poolConnection = await MySqlDatabase.default.createPool(dbconfig);
    }
  }

  static async executeSQL(sql, bindParams, target) {
    try {
      await this._createPool();
      const result = await MySqlDatabase.default.executeSQL(sql, bindParams, target, poolConnection);
      // TODO: Se esta trabajando en una mejor form de cerrar el pool de conexiones
      await MySqlDatabase.default.closePool(poolConnection);
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CloudConnection;
