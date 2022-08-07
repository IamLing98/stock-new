import { Injectable } from '@nestjs/common';

import constants from 'src/utils/constants';
import { CONNECT_MONGO_FAILED, HTTP_STATUS_OK } from 'src/utils/message';
import ReponseData from 'src/utils/response';
import Error from 'src/utils/error';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

@Injectable()
export class MatrixService {
  async getMatrix(type): Promise<any | Error> {
    try {
      const client = await MongoClient.connect(constants.MONGO_URL, {
        useNewUrlParser: true,
      }).catch((err) => {
        console.log(err);
      });

      if (!client) {
        return new Error(CONNECT_MONGO_FAILED, null);
      }
      try {
        const dbo = client.db('stock-app');
        const collection = dbo.collection('matrix-data');
        const query = {};
        const sort = { sort: { _id: -1 } };
        const res = await collection.findOne(query, sort);
        return new ReponseData(HTTP_STATUS_OK, null, res);
      } catch (ex) {
        console.error(ex);
      }
    } catch (ex) {
      console.error('getMatrix', ex);
    }
  }
}

export default MatrixService;
