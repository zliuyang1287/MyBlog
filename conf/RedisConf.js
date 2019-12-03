var redis = require("redis");
var client = redis.createClient(6379,'127.0.0.1');
var json = require("../util/JsonFormat");
var redis={
    setObj:setObj,
    getObj:getObj
}

var setObj = function(res,key,value){
    //写入JSON对象
    client.hmset(key, value, function(err) {
        json.rtnError(res,err.message);
    })
}

var getObj = function(key){
    //读取JavaScript(JSON)对象
client.hgetall(key, function(err, object) {
    if(err){
        
    }
  })
}


