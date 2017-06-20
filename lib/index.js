require('./util/utils');
var
      token = require('./util/token')
    , jsonPath = require('./util/jsonPath')
    , mq = require('jm-mq')
    , jm = require('jm-dao');

jm.token = token;
jm.jsonPath = jsonPath;
jm.mq = mq;

module.exports = jm;
