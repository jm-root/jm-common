var lib = require('./');
var DB = lib.DB;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaDefine = {
    title : {type: String},
    content:{type: String},
    isHtml:{type: Boolean, default: false},
    crtime: {type: Date},
    ext: Schema.Types.Mixed
};

var schema = new Schema(schemaDefine);

schema.path('crtime')
    .default(function(){
        return new Date()
    });

(function testDB(){
    //db1
    var dbUri = 'mongodb://localhost/test';
    var c = DB.connect(dbUri, true);
    var c1= DB.connect(dbUri, true);
    var c2= DB.connect(dbUri, true);
    DB.disConnect(dbUri);
    DB.disConnect(dbUri);

    //db2 default DB
    DB.connect();

    sd = lib.sequence();
    for(var i=0;i<5;i++)
        sd.next('uid2', {increase: 10}, function(err, v){
            console.info(v);
        });

    var dao = lib.dao(
        {
            modelName: 'product',
            schema: schema
        }
    );
    dao.create(
        {
            title: '测试文章标题',
            content: '测试文章内容'
        },
        function(err, doc){
            console.info(doc)
        }
    );

    dao.find2({page: 2, rows:3}, function(err, doc){
        console.info(doc);
    });

})();

//testEvent
(function testEvent(){
    var caller = {
        name: 'caller'
    };
    var obj = {
        name: 'obj'
    };
    var fun = function(opts){
        console.info(this.name + ' on test ' + opts.value);
    };

    lib.enableEvent(obj);
    obj.on('test', fun, caller);
    obj.on('test', fun);
    obj.once('test', fun);

    console.info('total listeners: ' + obj.listeners('test').length);

    obj.emit('test', {value: 123});
    obj.removeListener('test', fun, caller);
    obj.emit('test', {value: 456});

    console.info('total listeners: ' + obj.listeners('test').length);

    lib.disableEvent(obj);
    //obj.emit('test'); //will fail
})();

