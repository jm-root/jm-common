var
      token = require('./util/token')
    , utils = require('./util/utils')
    , jsonPath = require('./util/jsonPath')
    , mq = require('jm-mq')
    , jm = require('jm-dao');

jm.utils = utils;
jm.token = token;
jm.jsonPath = jsonPath;
jm.mq = mq;

module.exports = jm;
