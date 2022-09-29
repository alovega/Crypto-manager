const chalk = require('chalk');

export async function version(args, loading) {
    const packagejson = require('../package.json')
    console.log(chalk.greenBright(`vesion ${packagejson.version}`))
}