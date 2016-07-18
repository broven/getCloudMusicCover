#!/usr/bin/env node
'use strict'
const opn = require('opn');

const match = require('./match');
const cli = require('./cli');
const url = require('url');

let photourl = cli.param();
match(photourl,(fileName)=>{
  setTimeout(()=>{
    opn(fileName)
  },3000);
});
