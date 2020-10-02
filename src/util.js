const chalk = require('chalk');
const fs = require('fs-extra');
const download = require('download-git-repo')
const ora = require('ora')
const logSymbols = require("log-symbols");
const path = require('path');
const ini = require('ini');
const initChoices = require('../src/choices.json')

const SYRC = path.join(process.env.HOME, '.syrc');

const makeDir = (projectRoot)=>{
  if("." !== projectRoot){
    fs.mkdirSync(projectRoot);
  }
}

const clone = (target, url)=>{
  const spinner = ora({
    text:`download...`,
    color:'green',
  });
  spinner.start()
  return new Promise((resolve,reject) => {
    download(`direct:${url}`,
    target, { clone: true }, (err) => {
      if (err) {
        spinner.fail();
        console.log(logSymbols.error, chalk.red("fail to download"));
        reject(err);
      } else {
        spinner.succeed();
        console.log(logSymbols.success, chalk.green("complete!"));
        resolve();
      }
    })
  })
}


const checkChoices = ()=>{
  const choices = getChoices();
  if(choices.length === 0){
    console.log(chalk.red(`There is no choice exist, Add One please!`));
    console.log(chalk.green(`run: sy add
`))
    return process.exit(-1);
  }
}

const getINIInfo = (path) =>{
  return fs.existsSync(path) ? ini.parse(fs.readFileSync(path, 'utf-8')) : null;
}

const getChoices = ()=>{
  const choices = getINIInfo(SYRC);
  if(choices) {
    return Object.values(choices); 
  }

  setChoices(initChoices);
  return initChoices;
}

const setChoices = (choices)=>{
  fs.writeFileSync(SYRC, ini.stringify(choices))
}


exports.makeDir = makeDir;
exports.clone = clone;
exports.getChoices = getChoices;
exports.setChoices = setChoices;
exports.checkChoices = checkChoices;

