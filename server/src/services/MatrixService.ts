import { Injectable, Logger } from '@nestjs/common';

import constants from 'src/utils/constants';
import { CONNECT_MONGO_FAILED, HTTP_STATUS_OK } from 'src/utils/message';
import ReponseData from 'src/utils/response';
import Error from 'src/utils/error';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

@Injectable()
export class MatrixService {
  private readonly logger = new Logger(MatrixService.name);

  prepareDataMatrix1(data): [] {
    if (data) {
      let prepareRes = data?.data;
      prepareRes = prepareRes?.map((item, index) => {
        let newItem = { ...item, TickerSearch: item?.Ticker.value };
        newItem['Date/TimeSearch'] = item['Date/Time']?.value;
        newItem['ExchangeSearch'] = item['Exchange']?.value;
        newItem['TypeSearch'] = item['Type']?.value;
        newItem['SectorSearch'] = item['Sector']?.value;
        newItem['DeltaScoreSearch'] = item['DeltaScore']?.value;
        newItem['DeltaMKSearch'] = item['DeltaMK']?.value;
        newItem['T-9Search'] =
          item['T-9']?.value +
          item['Column 5']?.value +
          item['Column 6']?.value +
          item['Column 7']?.value +
          item['Column 8']?.value +
          item['Column 9']?.value;

        newItem['T-8Search'] =
          item['T-8']?.value +
          item['Column 10']?.value +
          item['Column 11']?.value +
          item['Column 12']?.value +
          item['Column 13']?.value +
          item['Column 14']?.value;

        newItem['T-7Search'] =
          item['T-7']?.value +
          item['Column 15']?.value +
          item['Column 16']?.value +
          item['Column 17']?.value +
          item['Column 18']?.value +
          item['Column 19']?.value;

        newItem['T-6Search'] =
          item['T-6']?.value +
          item['Column 20']?.value +
          item['Column 21']?.value +
          item['Column 22']?.value +
          item['Column 23']?.value +
          item['Column 24']?.value;

        newItem['T-5Search'] =
          item['T-5']?.value +
          item['Column 25']?.value +
          item['Column 26']?.value +
          item['Column 27']?.value +
          item['Column 28']?.value +
          item['Column 29']?.value;

        newItem['T-4Search'] =
          item['T-4']?.value +
          item['Column 30']?.value +
          item['Column 31']?.value +
          item['Column 32']?.value +
          item['Column 33']?.value +
          item['Column 34']?.value;

        newItem['T-3Search'] =
          item['T-3']?.value +
          item['Column 35']?.value +
          item['Column 36']?.value +
          item['Column 37']?.value +
          item['Column 38']?.value +
          item['Column 39']?.value;

        newItem['T-2Search'] =
          item['T-2']?.value +
          item['Column 40']?.value +
          item['Column 51']?.value +
          item['Column 42']?.value +
          item['Column 43']?.value +
          item['Column 44']?.value;

        newItem['T-1Search'] =
          item['T-1']?.value +
          item['Column 45']?.value +
          item['Column 46']?.value +
          item['Column 47']?.value +
          item['Column 48']?.value +
          item['Column 49']?.value;

        newItem['T-0Search'] =
          item['T-0']?.value +
          item['Column 50']?.value +
          item['Column 51']?.value +
          item['Column 52']?.value +
          item['Column 53']?.value +
          item['Column 54']?.value;

        newItem['CloseSearch'] = item['Close']?.value;
        newItem['SCORESearch'] = item['SCORE']?.value;
        newItem['MKControlSearch'] = item['MKControl']?.value;
        newItem['VolumeSearch'] = item['Volume']?.value;
        newItem['DailyRadarSearch'] =
          item['G21']?.value +
          item['G22']?.value +
          item['G23']?.value +
          item['G24']?.value +
          item['G25']?.value +
          item['G26']?.value;

        newItem['DailyRadarSearch'] =
          item['G21']?.value +
          item['G22']?.value +
          item['G23']?.value +
          item['G24']?.value +
          item['G25']?.value +
          item['G26']?.value;

        newItem['Change(%)Search'] = item['Change(%)']?.value;
        newItem['TrendCycle(%)Search'] = item['TrendCycle(%)']?.value;
        newItem['Longtrend(%)Search'] = item['Longtrend(%)']?.value;

        newItem['DistributionSearch'] =
          item['G31']?.value + item['G32']?.value + item['G33']?.value;
        return newItem;
      });

      data.data = prepareRes;
    }
    return data;
  }

  prepareDataMatrix3(data): [] {
    if (data) {
      let prepareRes = data?.data;
      prepareRes = prepareRes?.map((item, index) => {
        let newItem = { ...item };
        for (const [key, value] of Object.entries(item)) {
          newItem[`${key}Search`] = item[`${key}`]?.value;
        }
        return newItem;
      });

      data.data = prepareRes;
    }
    return data;
  }

  async getMatrix(type): Promise<any | Error> {
    this.logger.log('Start get matrix data: ' + type);
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
        const query = { type: parseInt(type) };
        const sort = { sort: { createTime: -1 } };
        let res = await collection.findOne(query, sort);
        if (parseInt(type) === 1) {
          res = this.prepareDataMatrix1(res);
        }
        if (parseInt(type) === 3) {
          res = this.prepareDataMatrix3(res);
        }
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
