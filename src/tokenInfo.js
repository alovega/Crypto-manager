import {cryptoToUSD} from "./_utils/cryptoUsD";
import Table  from "cli-table3";
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
import  { portfolioCounter } from './_utils/portfolioCounter';
let tokenInfo = {};
let tokenList = [];

export async function tokenInformation(argv, loading){
  fs.createReadStream(`./transactions.csv`)
    .pipe(csv())
    .on('data', data => {
      if (!tokenList.includes(data.token)) {
        tokenList.push(data.token);
      }
      if (argv.token && argv.date) {
        if (
          data.token === argv.token &&
          data.timestamp >= argv.startTimestamp &&
          data.timestamp < argv.endTimestamp
        ) {
          portfolioCounter(tokenInfo, data);
        }
      } else if (argv.token) {
        if (data.token === argv.token) {
          portfolioCounter(tokenInfo, data);
        }
      } else if (argv.date) {
        if (
          data.timestamp >= argv.startTimestamp &&
          data.timestamp < argv.endTimestamp
        ) {
          portfolioCounter(tokenInfo, data);
        }
      } else {
        portfolioCounter(tokenInfo, data);
      }
    })
    .on('end', async () => {
      clearTimeout(loading);
      console.log('\n');
      if (Object.keys(tokenInfo).length === 0) {
        if (argv.date && argv.token) {
          if (tokenList.includes(argv.token)) {
            console.error(
              `No any ${argv.token} token transacted on ${argv.date}`,
            );
          } else {
            console.error(`${argv.token} token not found`);
          }
        } else if (argv.date) {
          console.error(`No any token transacted on ${argv.date} `);
        } else if (argv.token) {
          console.error(`${argv.token} token not found`);
        } else {
          console.error('No any transactions data on the CSV');
        }
        return;
      } else {
        for (let [token, amount] of Object.entries(tokenInfo)) {
          tokenInfo[token] = amount * (await cryptoToUSD(token));
        }
        console.log('Token portfolio in USD');
        let th = [];
        tokenInfo.hasOwnProperty('BTC')?th.push('BTC'):''
        tokenInfo.hasOwnProperty('ETH')?th.push('ETH'):''
        tokenInfo.hasOwnProperty('XRP')?th.push('XRP'):''
        const table = new Table({
          head: th,
          wordWrap: true
        })
        let data = [];
        tokenInfo.hasOwnProperty('BTC')?data.push(tokenInfo.BTC):''
        tokenInfo.hasOwnProperty('ETH')?data.push(tokenInfo.ETH):''
        tokenInfo.hasOwnProperty('XRP')?data.push(tokenInfo.XRP):''
        table.push(data)
        console.log(table.toString())
      }
    })
    .on('error', err => console.log(err));
};

module.exports = { tokenInformation };