#!/usr/bin/env node
'use strict'
const opn = require('opn');

const match = require('./match');
const cli = require('./cli');
const url = require('url');

let photourl = cli.param();
match(photourl,(fileName)=>{
  console.log('2'+fileName);
  process.nextTick(()=>{
    opn("两百位日本配乐作曲家，每人一首良曲.jpg");
  });

});
