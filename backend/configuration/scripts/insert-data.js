var mysql = require('mysql');
const fs = require('fs');
const csv = require('csv-parser');

let rawdata = fs.readFileSync(__dirname + '/../data/db.json');
let dbData = JSON.parse(rawdata);

var con = mysql.createConnection({
    host: "localhost",
    user: dbData.user,
    password: dbData.password
});

con.connect(async (err) => {
    if (err) throw err;
    console.log("Połączono!");

    var playersInsertQuery = "INSERT INTO `atp`.`player` (id, first_name, last_name, is_right_handed, birth_date, country_symbol) VALUES ?";
    var rankingInsertQuery = "INSERT INTO `atp`.`ranking` (player_id, date_creation, rank, points) VALUES ?";

    let isRankingInsert = false;
    let data = await getCsvData('atp_players.csv', isRankingInsert, 55005);

    con.query(isRankingInsert ? rankingInsertQuery : playersInsertQuery, [data], async (err, result) => {
        if (err) throw err;
        console.log('Players insert result: ', result);

        let isRankingInsert = true;
        let data = await getCsvData('atp_rankings_10s.csv', isRankingInsert, 915618);
    
        con.query(isRankingInsert ? rankingInsertQuery : playersInsertQuery, [data], async (err, result) => {
            if (err) throw err;
            console.log('10s ranking insert result: ', result);
            
            let isRankingInsert = true;
            let data = await getCsvData('atp_rankings_20s.csv', isRankingInsert, 53157);
        
            con.query(isRankingInsert ? rankingInsertQuery : playersInsertQuery, [data], async (err, result) => {
                if (err) throw err;
                console.log('20s ranking insert result: ', result);
                
                let isRankingInsert = true;
                let data = await getCsvData('atp_rankings_current.csv', isRankingInsert, 16152);
            
                con.query(isRankingInsert ? rankingInsertQuery : playersInsertQuery, [data], function(err, result) {
                    if (err) throw err;
                    console.log('Current ranking insert result: ', result);
                    destroyConnection();
                });
            });
        });
    });
});

getCsvData = (fileName, isRankingInsert, count) => {
    let readedRows = 0;
    let values = [];

    return new Promise((resolve) => {
        fs.createReadStream(__dirname + `/../data/${fileName}`)
        .pipe(csv())
        .on('data', (row) => {
            console.log(`Readed ${fileName} rows: ${++readedRows}/${count}`);
            
            if(isRankingInsert) {
                values.push([
                    row.player,
                    row.ranking_date,
                    row.rank,
                    row.points,
                ]);
            } else {
                values.push([
                    row.id,
                    row.first_name,
                    row.last_name,
                    row.hand == 'R' ? true : false,
                    row.birth,
                    row.country
                ]);
            }
        })
        .on('end', () => {
            console.log(`CSV file ${fileName} successfully readed`);
            resolve(values);
        });
    });
}

destroyConnection = () => {
    con.destroy((err) => {
        console.log('Destroy status error', err);
    });

    console.log("Poprawnie rozłączono!");
}