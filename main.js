#!/usr/bin/env node
'use strict'
const match = require('./match');
const cli = require('./cli');
const url = require('url');
let photourl = cli.param();
match(photourl);
