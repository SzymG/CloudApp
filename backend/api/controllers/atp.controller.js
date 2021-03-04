const mysql = require('mysql');
const fs = require('fs');

let rawdata = fs.readFileSync(__dirname + '/../../configuration/data/db.json');
let dbData = JSON.parse(rawdata);

var con = mysql.createConnection({
    host: "localhost",
    user: dbData.user,
    password: dbData.password
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected with database');
});

exports.createPlayer = async (req, res) => {
    let stmt = `INSERT INTO atp.player(first_name, last_name, is_right_handed, birth_date, country_symbol) VALUES(?,?,?,?,?)`;
    let values = [req.body.firstName, req.body.lastName, req.body.isRightHanded, req.body.birthDate, req.body.countrySymbol];

    con.query(stmt, values, (err, results, fields) => {
        if (err) {
            return res.status(500).json(err);
        }
        
        res.send(results);
    });
}

exports.updatePlayer = async (req, res) => {
    let stmt = `UPDATE atp.player SET first_name=?, last_name=?, is_right_handed=?, birth_date=?, country_symbol=? WHERE id=?`;
    let values = [req.body.firstName, req.body.lastName, req.body.isRightHanded, 
            req.body.birthDate, req.body.countrySymbol, req.body.id];

    con.query(stmt, values, (err, results, fields) => {
        if (err) {
            return res.status(500).json(err);
        }
        
        res.send(results);
    });
}

exports.deletePlayer = async (req, res) => {
    let stmt = 'DELETE FROM atp.player WHERE id= ?';
    let values = [req.params.id];

    con.query(stmt, values, (err, results, fields) => {
        if (err) {
            return res.status(500).json(err);
        }
        
        res.send(results);
    });
}

exports.findAllPlayers = async (req, res) => {

    const pageSize = req.query.pageSize || 20;
    const pageNumber = req.query.pageNumber || 1;
    const term = req.query.term || '';

    const offset = (pageNumber - 1) * pageSize;

    const players = await makeDbQuery(`SELECT * FROM atp.player 
        WHERE CONCAT(first_name, ' ', last_name) LIKE '%${term}%' ORDER BY last_name ASC LIMIT ${offset},${pageSize}`);

    res.send(players);
}

exports.findOnePlayer = async (req, res) => {
    const id = req.params.id;

    const playerData = (await makeDbQuery(`SELECT * FROM atp.player WHERE id = ${id}`))[0];

    if (!(!!playerData)) {
        return res.status(404).json('playerNotFound');
    }
    else {
        const playerRanks = await makeDbQuery(`SELECT * FROM atp.ranking WHERE player_id = ${id} ORDER BY date_creation ASC`);

        let topTenCount = 0;
    
        if(!!playerRanks) {
            playerRanks.forEach(item => {
                if(item.rank <= 10) {
                    topTenCount++;
                }
            });
        }
    
        playerData.top_ten_count = topTenCount;
    
        const response = {
            player_data: playerData,
            player_ranks: playerRanks
        }
    
        res.send(response);
    }
}

exports.createRanking = async (req, res) => {
    let stmt = `INSERT INTO atp.ranking(player_id, date_creation, rank, points) VALUES(?,?,?,?)`;
    let values = [req.body.playerId, req.body.dateCreation, req.body.rank, req.body.points];

    con.query(stmt, values, (err, results, fields) => {
        if (err) {
            return res.status(500).json(err);
        }
        
        res.send(results);
    });
}

exports.findOneRanking = async (req, res) => {
    const id = req.params.id;

    const playerData = (await makeDbQuery(`SELECT * FROM atp.ranking INNER JOIN atp.player 
        ON atp.player.id = atp.ranking.player_id WHERE atp.ranking.id = ${id}`))[0];

    if (!(!!playerData)) {
        return res.status(404).json('playerNotFound');
    }
    else {
        res.send(playerData);
    }
}

exports.updateRanking = async (req, res) => {
    let stmt = `UPDATE atp.ranking SET date_creation=?, rank=?, points=? WHERE id=?`;
    let values = [req.body.dateCreation, req.body.rank, req.body.points, req.body.id];

    con.query(stmt, values, (err, results, fields) => {
        if (err) {
            return res.status(500).json(err);
        }
        
        res.send(results);
    });
}

exports.deleteRanking = async (req, res) => {
    let stmt = 'DELETE FROM atp.ranking WHERE id= ?';
    let values = [req.params.id];

    con.query(stmt, values, (err, results, fields) => {
        if (err) {
            return res.status(500).json(err);
        }
        
        res.send(results);
    });
}

makeDbQuery = (query) => {
    return new Promise((resolve) => {
        con.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}