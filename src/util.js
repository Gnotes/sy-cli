const chalk = require('chalk');
const fs = require('fs-extra');
const download = require('download-git-repo')
const ora = require('ora')
const logSymbols = require("log-symbols");

const makeDir = (projectRoot)=>{
  if("." !== projectRoot){
    fs.mkdirSync(projectRoot);
  }
}

const clone = (target, url)=>{
  const spinner = ora({
    text:`download...`,
    color:'yellow',
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

exports.makeDir = makeDir;
exports.clone = clone;

