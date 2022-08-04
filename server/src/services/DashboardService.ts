import { Model } from 'mongoose';
import { Injectable, Inject, Req } from '@nestjs/common';
import ReponseData from 'src/utils/response';
import { HTTP_STATUS_OK } from 'src/utils/message';
import fetch from 'node-fetch'

@Injectable()
export class DashboardService {
    constructor(
    
    ) { }

          lstItemCode = [
            {itemCode: '51001', itemName: 'Cao nhất 52 tuần'},
            {itemCode: '51002', itemName: 'Thấp nhất 52 tuần'},
            {itemCode: '51003', itemName: 'Vốn hóa thị trường'},
            {itemCode: '51004', itemName: 'Số CP lưu hành'},
            {itemCode: '51006', itemName: 'P/E'},
            {itemCode: '51007', itemName: 'Beta'},
            {itemCode: '51012', itemName: 'P/B'},
            {itemCode: '51016', itemName: 'KLGD TB 10 phiên'},
            {itemCode: '57066', itemName: 'Free float'},
            {itemCode: '51033', itemName: 'Tỷ suất cổ tức'},
            {itemCode: '51035', itemName: 'BPVS'},
         ]

    async getDataBCTC(code: string) {

        //Infomation company
        const company_info = await fetch(
            "https://finfo-api.vndirect.com.vn/v4/company_profiles?q=code:" + code, {
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9,vi;q=0.8",
                "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "host": "finfo-api.vndirect.com.vn",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                Origin: "https://dstock.vndirect.com.vn",
                Referer: "https://finfo-api.vndirect.com.vn/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            method: "GET",
        }
        ).then((res) => res.json()
        ).catch((error) => {
            console.error("Error data...!");
            return null;
          });
          return new ReponseData(HTTP_STATUS_OK, null, company_info)
    }
}

export default DashboardService;
 

// @Injectable()
// export class DashboardService {
//   async getMatrix(type): Promise<string[] | Error> {
//     return [];
//   }
// }

// export default DashboardService;

