import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import constants, { matrixFilePaths } from 'src/utils/constants';

const fs = require('fs');

const cheerio = require('cheerio');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('1 * * * * *')
  getMatrixData1() {
    this.logger.log(
      `TASK START: Start read data from HTML Export for matrix 1`,
    );
    this.readFile(matrixFilePaths.MATRIX_1, 1);
  }

  @Cron('2 * * * * *')
  getMatrixData2() {
    this.logger.log(
      `TASK START: Start read data from HTML Export for matrix 2`,
    );
  }

  @Cron('3 * * * * *')
  getMatrixData3() {
    this.logger.log(
      `TASK START: Start read data from HTML Export for matrix 3`,
    );
    this.readFile(matrixFilePaths.MATRIX_3, 3);
  }

  connectMongo = (data, type: number) => {
    const logger = this.logger;
    try {
      MongoClient.connect(constants.MONGO_URL, function (err, db) {
        if (err) throw err;
        let dbo = db.db('stock-app');
        let myobj = { data: data, createTime: new Date(), type: type };
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
    // console.log(JSON.stringify(lstResult));
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
        //console.log($table_obj.html());
        const res = processTable($table_obj, ['br']);
        let newData = JSON.parse(JSON.stringify(res));
        newData?.shift();
        connectMongo(newData, type);
        // fs.writeFile(`D:/output${type}.json`, newData, function (err) {
        //   if (err) {
        //     return this.logger.error(`Write file error`);
        //   }
        //   console.log('Read file and send API success!');
        // });
      });
    } catch (ex) {
      this.logger.error(`Write file error`);
    }
  };
}

export default TasksService;
