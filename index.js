'use strict';

exports.topic = {
  name: 'pg'
};

exports.commands = [
  require('./commands/pgcli.js')
];
