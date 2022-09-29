import minimist from "minimist";
import { help } from "./help";
import { tokenInformation } from "./tokenInfo";
import { isDateValid } from "./_utils/isDateValid";
import { dateToEpochTime } from "./_utils/dateToEpochTime";
import { twirlTimer } from "./_utils/twirlTime";
import { version } from "./version";
const chalk = require('chalk')
export async function cli(argsArray) {
    const args = minimist(argsArray.slice(2))

    let cmd = args._[0] || 'help'
    if(args.version || args.v){
        cmd = 'version';
    }

    if(args.help || args.h){
        cmd = 'help';
    }
    if(args.hasOwnProperty('date')){
        if (isDateValid(args.date)) {
            let [startTimestamp, endTimestamp] = dateToEpochTime(args.date);
            args.startTimestamp = startTimestamp;
            args.endTimestamp = endTimestamp;
        } else {
            console.log(chalk.redBright("Error", 'Please enter valid date in YYYY-MM-DD format'));
            return
        }
    }

    if (args.hasOwnProperty('token') ) {
        if (!args.token) {
            console.log(chalk.redBright("Error", 'Please give a token name'));
            return
        }
      }

    switch (cmd){
        case 'version':
            version(args);
            break;  
        
        case 'help':
            help(args);
            break;

        // case 'createDatabase':
        //     connectToDatabase(args);
        //     break;

        case 'token':
            tokenInformation(args, twirlTimer());
            break;
    }
}