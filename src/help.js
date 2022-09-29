const chalk = require('chalk');

const menus = {
  main: `
  ${chalk.greenBright('crypto token <options>')}

  ${chalk.blueBright('``')} .. show all tokens latest portfolio [boolean]
  ${chalk.blueBright('--token=<token>')} .. return latest portfolio value of the token in USD [string]
  ${chalk.blueBright('--date=<date>')}.. return portfolio value per token in USD for given date [string]
  ${chalk.blueBright('--date=<date> --token=<token>')} .. return portfolio value of the token in USD for the selected database [string]
  ${chalk.blueBright('help, -h ')} .. show help menu for a command [boolean]
  ${chalk.blueBright('version, -v')} .. show application version [boolean]
`,

  create: `//...
        `,
  token: `//...
        `,
  date: `//...
        `,
}

export async function help(argv, loading) {
  const subCmd = argv._[0] === 'help'
    ? argv._[1]
    : argv._[0]
  console.log(menus[subCmd] || menus.main)
  clearTimeout(loading);
}