import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import constants, {
  matrixFilePaths,
  tickFilterMatrix2,
} from 'src/utils/constants';
import { isNumeric, roundUsing } from 'src/utils/dataUtils';

const fs = require('fs');

const cheerio = require('cheerio');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 */1 * * * *')
  getMatrixData1() {
    this.logger.log(`TASK START: Start read data from HTML Export for matrix `);
    this.clear();
    this.readFile(matrixFilePaths.MATRIX_1, 1);
    this.readFile(matrixFilePaths.MATRIX_3, 3);
  }

  prepareDataMatrix1(data): [] {
    if (data) {
      let prepareRes = [];
      prepareRes = data?.map((item, index) => {
        let newItem = { ...item, TickerSearch: item?.TICKERVN?.value };
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

        newItem['Change(%)Search'] = item['Change(%)']?.value;
        newItem['TrendCycle(%)Search'] = item['TrendCycle(%)']?.value;
        newItem['Longtrend(%)Search'] = item['Longtrend(%)']?.value;

        newItem['DistributionSearch'] =
          item['G31']?.value + item['G32']?.value + item['G33']?.value;
        return newItem;
      });

      data = prepareRes;
    }
    return data;
  }

  buildTable1Matrix2(data) {
    let rs = [];
    let firstRow = {
      label: 'Tên mã',
      strongDown: [],
      mediumDown: [],
      softDown: [],
      refer: [],
      softUp: [],
      mediumUp: [],
      strongUp: [],
    };
    let sumRow = {
      label: 'Tổng số mã',
      strongDown: 0,
      mediumDown: 0,
      softDown: 0,
      refer: 0,
      softUp: 0,
      mediumUp: 0,
      strongUp: 0,
      pined: true,
    };
    let lastRow = {
      label: '% trên tổng số mã',
      strongDown: 0,
      mediumDown: 0,
      softDown: 0,
      refer: 0,
      softUp: 0,
      mediumUp: 0,
      strongUp: 0,
      pined: true,
    };

    const hostEndsWith = (host, ends) => {
      let value = false;
      value = ends.some((element) => {
        return host?.includes(element);
      });
      return value;
    };

    data
      ?.filter((item) =>
        hostEndsWith(item['TICKERVN']?.value, tickFilterMatrix2),
      )
      ?.forEach((item) => {
        item['Change(%)Search'] = item['Change(%)']?.value;
        item['TickerSearch'] = item['TICKERVN']?.value;
        // Giảm mạnh
        if (parseFloat(item['Change(%)Search']) < -5.0) {
          firstRow.strongDown.push(item);
          sumRow.strongDown += 1;
          lastRow.strongDown = Math.round(
            ((sumRow.strongDown + 1) / data?.length) * 100,
          );
        }
        // Giảm vừa
        if (
          parseFloat(item['Change(%)Search']) > -3.0 &&
          parseFloat(item['Change(%)Search']) <= 0
        ) {
          firstRow.mediumDown.push(item);
          sumRow.mediumDown += 1;
          lastRow.mediumDown = Math.round(
            ((sumRow.mediumDown + 1) / data?.length) * 100,
          );
        }
        // Giảm nhẹ
        if (
          parseFloat(item['Change(%)Search']) >= -5.0 &&
          parseFloat(item['Change(%)Search']) <= -3.0
        ) {
          firstRow.softDown.push(item);
          sumRow.softDown += 1;
          lastRow.softDown = Math.round(
            ((sumRow.softDown + 1) / data?.length) * 100,
          );
        }
        // Tham chiếu
        if (parseFloat(item['Change(%)Search']) === 0) {
          firstRow.refer.push(item);
          sumRow.refer += 1;
          lastRow.refer = Math.round(((sumRow.refer + 1) / data?.length) * 100);
        }
        // Tăng nhẹ
        if (
          parseFloat(item['Change(%)Search']) > 0 &&
          parseFloat(item['Change(%)Search']) <= 3.0
        ) {
          firstRow.softUp.push(item);
          sumRow.softUp += 1;
          lastRow.softUp = Math.round(
            ((sumRow.softUp + 1) / data?.length) * 100,
          );
        }
        // Tăng vừa
        if (
          parseFloat(item['Change(%)Search']) > 3.0 &&
          parseFloat(item['Change(%)Search']) <= 5.0
        ) {
          firstRow.mediumUp.push(item);
          sumRow.mediumUp += 1;
          lastRow.mediumUp = Math.round(
            ((sumRow.mediumUp + 1) / data?.length) * 100,
          );
        }
        // Tăng mạnh
        if (parseFloat(item['Change(%)Search']) > 5.0) {
          firstRow.strongUp.push(item);
          sumRow.strongUp += 1;
          lastRow.strongUp = Math.round(
            ((sumRow.strongUp + 1) / data?.length) * 100,
          );
        }
      });
    rs.push(firstRow);
    rs.push(sumRow);
    rs.push(lastRow);
    return rs;
  }

  buildTable2Matrix2(data) {
    let sectors = [];

    let sectorsName = [];

    const hostEndsWith = (host, ends) => {
      let value = false;
      value = ends.some((element) => {
        return host?.includes(element);
      });
      return value;
    };

    // Sort data by score value
    data = data?.sort((a, b) => {
      const aScore = parseFloat(a?.SCORE?.value?.split(',', '')?.join(''));
      const bScore = parseFloat(b?.SCORE?.value?.split(',', '')?.join(''));
      return bScore - aScore;
    });

    // Find all ticker for sector name: Future
    const futureTickers = data?.filter(
      (item) => item?.TICKERVN?.value === 'VN30F1M',
    );

    // Find all ticker for sector name: Index(Include in tickFilterMatrix2 )
    const indexTickers = data?.filter((item) =>
      hostEndsWith(item?.TICKERVN?.value, tickFilterMatrix2),
    );

    // Group by sector name
    data?.forEach((item) => {
      if (sectorsName.indexOf(item?.Sector?.value) === -1) {
        sectors.push(item?.Sector);
        sectorsName.push(item?.Sector?.value);
      }
    });

    sectorsName.push('Future');
    sectors.push({ value: 'Future', color: 'black' });
    sectorsName.push('Index');
    sectors.push({ value: 'Index', color: 'black' });
    let rs = [];
    sectors?.forEach((sector) => {
      let sumRow = {
        label: sector,
        strongDown: 0,
        mediumDown: 0,
        softDown: 0,
        refer: 0,
        softUp: 0,
        mediumUp: 0,
        strongUp: 0,
        medianScore: 0,
        medianMarket: 0,
        sumVolume: 0,
        top3Score: [],
        totalTicker: 0,
        sumMarket: 0,
        sumScore: 0,
      };
      let findData = [];
      if (sector.value === 'Future') {
        findData = futureTickers;
      } else if (sector.value === 'Index') {
        findData = indexTickers;
      } else {
        findData = data;
      }

      let top3Score = findData
        ?.filter(
          (item) =>
            sector?.value?.toLowerCase() === item?.Sector?.value?.toLowerCase(),
        )
        .sort(
          (a, b) =>
            parseFloat(b?.SCORE?.value?.split(',')?.join('')) -
            parseFloat(a?.SCORE?.value?.split(',')?.join('')),
        )
        .slice(0, 3);
      sumRow.top3Score = top3Score;
      findData.forEach((item) => {
        if (
          sector?.value?.toLowerCase() === item?.Sector?.value?.toLowerCase() ||
          sector.value === 'Future' ||
          sector.value === 'Index'
        ) {
          sumRow.totalTicker += 1;
          sumRow.sumVolume += isNumeric(
            item?.Volume?.value?.split(',')?.join(''),
          )
            ? parseInt(item?.Volume?.value?.split(',')?.join(''))
            : 0;
          sumRow.sumMarket += isNumeric(
            item?.MKControl?.value?.split(',')?.join(''),
          )
            ? parseInt(item?.MKControl?.value?.split(',')?.join(''))
            : 0;
          sumRow.sumScore += isNumeric(item?.SCORE?.value?.split(',')?.join(''))
            ? parseInt(item?.SCORE?.value?.split(',')?.join(''))
            : 0;
          item['Change(%)Search'] = item['Change(%)']?.value;
          // Giảm mạnh
          if (parseFloat(item['Change(%)Search']) < -5.0) {
            sumRow.strongDown += 1;
          }
          // Giảm vừa
          if (
            parseFloat(item['Change(%)Search']) > -3.0 &&
            parseFloat(item['Change(%)Search']) <= 0
          ) {
            sumRow.mediumDown += 1;
          }
          // Giảm nhẹ
          if (
            parseFloat(item['Change(%)Search']) >= -5.0 &&
            parseFloat(item['Change(%)Search']) <= -3.0
          ) {
            sumRow.softDown += 1;
          }
          // Tham chiếu
          if (parseFloat(item['Change(%)Search']) === 0) {
            sumRow.refer += 1;
          }
          // Tăng nhẹ
          if (
            parseFloat(item['Change(%)Search']) > 0 &&
            parseFloat(item['Change(%)Search']) <= 3.0
          ) {
            sumRow.softUp += 1;
          }
          // Tăng vừa
          if (
            parseFloat(item['Change(%)Search']) > 3.0 &&
            parseFloat(item['Change(%)Search']) <= 5.0
          ) {
            sumRow.mediumUp += 1;
          }
          // Tăng mạnh
          if (parseFloat(item['Change(%)Search']) > 5.0) {
            sumRow.strongUp += 1;
          }
        }
      });
      sumRow.medianScore = roundUsing(
        Math.floor,
        sumRow.sumScore / sumRow.totalTicker,
        2,
      );
      sumRow.medianMarket = roundUsing(
        Math.floor,
        sumRow.sumMarket / sumRow.totalTicker,
        2,
      );
      rs.push(sumRow);
    });

    return rs;
  }

  prepareDataMatrix3(data): [] {
    if (data) {
      let prepareRes = data;
      prepareRes = prepareRes?.map((item, index) => {
        let newItem = { ...item };
        for (const [key, value] of Object.entries(item)) {
          newItem[`${key}Search`] = item[`${key}`]?.value;
        }
        return newItem;
      });

      data = prepareRes;
    }
    return data;
  }

  buildChart1Data = (data, table2Data) => {
    const hostEndsWith = (host, ends) => {
      let value = false;
      value = ends.some((element) => {
        return host?.includes(element);
      });
      return value;
    };

    const rs = data
      ?.filter((item) =>
        hostEndsWith(item['TICKERVN']?.value, tickFilterMatrix2),
      )
      ?.map((item, index) => {
        let x = parseFloat(item?.MKControl?.value?.split(',').join(''));
        let y = parseFloat(item?.SCORE?.value?.split(',').join(''));
        const newItem = {
          x: x,
          y: y,
          z:
            parseFloat(item?.SCORE?.value?.split(',').join('')) *
            parseFloat(item?.Volume?.value?.split(',').join('')),
          name: item?.TICKERVN?.value,
          ticker: item?.TICKERVN?.value,
        };

        return newItem;
      });
    const sectorData = table2Data?.map((sector, index) => {
      const newItem = {
        x: parseFloat(sector?.medianMarket),
        y: parseFloat(sector?.medianScore),
        z: sector?.sumVolume * sector?.sumScore,
        name: sector?.label?.value,
        ticker: sector?.label?.value,
      };

      return newItem;
    });
    return [...rs, ...sectorData];
  };

  connectMongo = (data, type: number) => {
    const logger = this.logger;
    const buildTable1Matrix2 = this.buildTable1Matrix2;
    const buildTable2Matrix2 = this.buildTable2Matrix2;
    const prepareDataMatrix1 = this.prepareDataMatrix1;
    const prepareDataMatrix3 = this.prepareDataMatrix3;
    const buildChart1Data = this.buildChart1Data;
    try {
      MongoClient.connect(constants.MONGO_URL, function (err, db) {
        if (err) throw err;
        const dbo = db.db('stock-app');
        let myobj = {
          data:
            type === 3 ? prepareDataMatrix3(data) : prepareDataMatrix1(data),
          createTime: new Date(),
          type: type,
          table1Data: [],
          table2Data: [],
          chartLeftData: [],
        };
        if (type !== 3) {
          myobj.table1Data = buildTable1Matrix2(data);
          myobj.table2Data = buildTable2Matrix2(data);
          myobj.chartLeftData = buildChart1Data(data, myobj.table2Data);
        }
        dbo.collection('matrix-data').insertOne(myobj, function (err, res) {
          if (err) throw err;
          db.close();
        });
      });
    } catch (ex) {
      logger.error('Insert data to mongo error: ' + ex);
    }
  };

  processTable = (cheerio_table_object, remove_tags = []) => {
    let columns = [];
    let lstResult = [];
    // preprocessing remove tags
    if (remove_tags.length) {
      remove_tags.forEach((tag) => {
        cheerio_table_object(tag).replaceWith('');
      });
    }

    // get columnss
    cheerio_table_object('tr th').each((index, el) => {
      columns.push(cheerio_table_object(el).text());
    });

    // get data from table
    cheerio_table_object('tr').each((index, tr) => {
      let backgroundColor;
      let color;
      let value;
      let items = {};
      cheerio_table_object('td', tr).each((index, td) => {
        backgroundColor = cheerio_table_object(td).attr('bgcolor');
        color = cheerio_table_object(td).children('font').attr('color');
        value = cheerio_table_object(td).text();
        items[columns[index]] = {
          background: backgroundColor ? backgroundColor : null,
          color: color ? color : null,
          value: value ? value : null,
        };
      });

      lstResult.push(items);
    });
    return lstResult;
  };

  readFile = (path: string, type: number) => {
    this.logger.log('Read file from path: ' + path);
    const processTable = this.processTable;
    const connectMongo = this.connectMongo;
    try {
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) return;
        const $table_obj = cheerio.load(data);
        const res = processTable($table_obj, ['br']);
        let newData = JSON.parse(JSON.stringify(res));
        newData?.shift();
        connectMongo(newData, type);
      });
    } catch (ex) {
      this.logger.error(`Write file error`);
    }
  };

  clear() {
    this.logger.log('Clear old data: ');
    try {
      MongoClient.connect(constants.MONGO_URL, function (err, db) {
        if (err) throw err;
        const dbo = db.db('stock-app');
        dbo.collection('matrix-data').deleteMany({}, function (err, res) {
          if (err) throw err;
          db.close();
        });
      });
    } catch (ex) {
      this.logger.error('Clear old data  error: ' + ex);
    }
  }
}

export default TasksService;
