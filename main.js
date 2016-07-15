#!/usr/bin/env node
'use strict'
const match = require('./match');
const url = require('url');
console.log("run...");


let photourl = 'http://music.163.com/#/m/playlist?id=421492315&userid=57694400';
match(photourl);
