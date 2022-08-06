import { Injectable } from '@nestjs/common';

// import mongodb from 'mongodb';
import constants from 'src/utils/constants';
import { HTTP_STATUS_OK } from 'src/utils/message';
import ReponseData from 'src/utils/response';

// const MongoClient = mongodb.MongoClient;

@Injectable()
export class MatrixService {
  async getMatrix(type): Promise<any | Error> {
    // try {
    //   await MongoClient.connect(constants.MONGO_URL, async function (err, db) {
    //     if (err) throw err;
    //     const dbo = db.db('stock-app');
    //     const rs = await dbo
    //       .collection('matrix-data')
    //       .findOne({}, { sort: { _id: -1 } }, async (err, data) => {
    //         return {
    //           id: data._id,
    //           data: JSON.parse(data.data),
    //         };
    //       });
    //     return new ReponseData(HTTP_STATUS_OK, null, rs);
    //   });
    // } catch (ex) {
    //   console.log('Find error', ex);
    // }
  }
}

export default MatrixService;
