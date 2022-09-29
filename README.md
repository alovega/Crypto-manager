#crypto-manager:

This is a command line application built using node that will basically help in managing your crypto  transactions. It expects transactions in csv


#### Dependencies used:
>csv-parser: to parse transaction csv file

>dotenv: to load env variables to cli application

>node-fetch: for calling crypto compare application

>cli-table3: to create a table style console output

> esm: to enable es6 standards

> minimist: to parse command line arguments options

>chalk: to style terminal strings lij=ke Help Messages and Error messages

### Installation and running the application:

*clone this repo:*
```
git clone https://github.com/alovega/Crypto-manager.git
```
**Important:** 
Please add the transaction.csv file in the root directory to be able to run this program


*Install Dependencies:*
navigate to the directory and install dependencies
```
npm install
```
##### Link the application to the local workstation:
In order  to make the local npm package of the app 
to be globally available in our workstation we run command:
```
npm link
```

this step allows us to register and run `crypto` command at any location of the command line

**Important:** 
this is the command name of the application
>**crypto** 