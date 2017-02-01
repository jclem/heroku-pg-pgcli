'use strict';

const childProcess = require('child_process');
const cli          = require('heroku-cli-util');
const co           = require('co');

module.exports = {
  topic: 'pg',
  command: 'pgcli',
  description: 'open a pgcli shell to the database (requires pgcli)',
  flags: [{
    name: 'name',
    char: 'n',
    description: 'Attachment name to connect to',
    hasValue: true
  }],
  needsApp: true,
  needsAuth: true,
  run: cli.command(co.wrap(pgcli))
};

function* pgcli({ app, flags }, heroku) {
  const name = flags.name || 'DATABASE';
  const configVars = yield heroku.get(`/apps/${app}/config-vars`);
  const url = configVars[`${name}_URL`];
  const child = childProcess.spawn('pgcli', [url], { stdio: 'inherit' });
  child.on('close', process.exit);
}
