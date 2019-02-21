#!/usr/bin/env node
const fs = require('fs');
const merge = require('lodash.merge');
const path = require('path');
const program = require('commander');

const config = require('./config');
const translateMarkdown = require('./index')

program
  .command('set')
  .description('set config for cli')
  .option('-K --key [key]', 'TRANSLATOR_TEXT_KEY')
  .action(function ({key}) {
    let newConfig = merge(config, {
      key
    });
    fs.writeFileSync(
      path.resolve(__dirname, './config.js'),
      `module.exports = ${JSON.stringify(newConfig)}`
    );
  })

program
  .command('get <key>')
  .description('get value of typical key from config')
  .action(function (key) {
    console.log(config[key] || '');
  })

program
  .command('translate')
  .description('translate markdown file')
  .option('-S, --src [src]', 'src file')
  .option('-D, --dest [dest]', 'dest file')
  .option('-F, --from [from]', 'src lang')
  .option('-T, --to [to]', 'dest lang')
  .option('-K, --key [key]', 'TRANSLATOR_TEXT_KEY')
  .action(function({ src, dest, from, to, key }) {
    const srcPath = path.resolve(process.cwd(), src);
    const destPath = path.resolve(process.cwd(), dest);
    const subscriptionKey = key || config.key;
    translateMarkdown({
      src: srcPath,
      from,
      to,
      subscriptionKey
    }).then(data => {
      const writeStream = fs.createWriteStream(destPath);
      writeStream.write(data, err => {
        if(err) {
          console.error(err)
        }
        process.exit(0)
      });
    }).catch(console.error)
  })

program
  .command('*')
  .action(() => {
    program.help();
  });

program.parse(process.argv);