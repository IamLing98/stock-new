import { tsvParse, csvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';
import moment from 'moment';
const parseDate = timeParse('%Y-%m-%d');

export function parseData(record) {
    let d = { ...record };
    d.date = parseDate(record.raw_date);
    d.open = +record.open;
    d.high = +record.high;
    d.low = +record.low;
    d.close = +record.close;
    d.volume = +record.volume;
    return d;
}

export function parseData2(parse) {
    return function (d) {
        console.log('d', d);
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        console.log(d);
        return d;
    };
}

export function getData() {
    const promiseMSFT = fetch('https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv')
        .then((response) => {
            let data = response;
            console.log('response:', data);
            return response.text();
        })
        .then((data) => tsvParse(data, parseData2(parseDate)));
    return promiseMSFT;
}
