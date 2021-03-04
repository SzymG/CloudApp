var mysql = require('mysql');
const fs = require('fs');

let rawdata = fs.readFileSync(__dirname + '/../data/db.json');
let dbData = JSON.parse(rawdata);

var con = mysql.createConnection({
    host: "localhost",
    user: dbData.user,
    password: dbData.password
});

con.connect((err) => {
    if (err) throw err;
    console.log("Połączono!");

    con.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'atp'", (err, result) => {
        if (err) throw err;

        if(result.length) {
            console.log('Baza danych o nazwie `atp` już istnieje. Usuń ją, aby poprawnie wgrać dane od początku')
            destroyConnection();
        } else {
            con.query("CREATE DATABASE atp", function (err, result) {
                if (err) throw err;

                const playerTableCreateQuery = "CREATE TABLE `atp`.`player` (`id` INT NOT NULL AUTO_INCREMENT,\
                    `first_name` VARCHAR(50) NOT NULL, \
                    `last_name` VARCHAR(50) NOT NULL, \
                    `is_right_handed` TINYINT(1) NOT NULL DEFAULT 0, \
                    `birth_date` DATE NOT NULL, \
                    `country_symbol` VARCHAR(10) NOT NULL, \
                    PRIMARY KEY (`id`) \
                );";

                const rankingTableCreateQuery = "CREATE TABLE `atp`.`ranking` ( \
                    `id` INT(11) NOT NULL AUTO_INCREMENT, \
                    `player_id` INT(11) NOT NULL, \
                    `date_creation` DATE NOT NULL, \
                    `rank` INT(11) NOT NULL, \
                    `points` INT(11) NOT NULL, \
                    PRIMARY KEY (`id`), \
                    INDEX `fk_ranking_player` (`player_id`), \
                    CONSTRAINT `fk_ranking_player` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) \
                );";

                con.query(playerTableCreateQuery, function (err, result) {
                    if (err) throw err;
                    console.log("Tabela `player` stworzona poprawnie");
                    
                    con.query(rankingTableCreateQuery, function (err, result) {
                        if (err) throw err;
                        console.log("Tabela `ranking` stworzona poprawnie");

                        destroyConnection();
                    });
                });

                console.log("Baza danych `atp` stworzona poprawnie");
            });
        }
    });
});

destroyConnection = function() {
    con.destroy((err) => {
        console.log('Destroy status error', err);
    });

    console.log("Poprawnie rozłączono!");
}