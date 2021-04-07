var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'liquidity'
});

connection.connect();

//CHANGE THIS: Reward devided by the number of hours and minutes in the period.
var reward = 500000 / 720 / 60;

//CHANGE THESE DATES:
var date = new Date('Apr 1 2021 00:00:00 GMT+0000 (UTC)').getTime();

while(date < new Date('Apr 15 2021 00:00:00 GMT+0000 (UTC)')) {

    date += (60 * 1000);

    var query = connection.query({
        sql: "insert into awards(address, amount) select trans.from, sum(quantity) / (select sum(qty) from (select trans.from, sum(quantity) qty from trans where UnixTimestamp < ? group by trans.from having sum(quantity) > 0) daily_total) * ? award from trans where UnixTimestamp < ? group by trans.from having sum(quantity) > 0", 
        values: [date.valueOf() / 1000, reward, date.valueOf() / 1000]
    },
        function (error, results, fields) {
            console.log(results);
        }
    );
}

connection.end();