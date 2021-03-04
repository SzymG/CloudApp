const express = require('express');
const router = express.Router();
const { validate, ValidationError } = require('express-validation');
const playerValidator = require(__dirname + '/../validators/playerValidator.js');
const rankingValidator = require(__dirname + '/../validators/rankingValidator.js');

const atpControler = require(__dirname + '/../controllers/atp.controller.js');

router.put('/api/player', validate(playerValidator.validate, {}, {}), atpControler.createPlayer);

router.get('/api/player', atpControler.findAllPlayers);

router.get('/api/player/:id', atpControler.findOnePlayer);

router.post('/api/player/:id', validate(playerValidator.validate, {}, {}), atpControler.updatePlayer);

router.delete('/api/player/:id', atpControler.deletePlayer);



router.put('/api/ranking/:id', validate(rankingValidator.validate, {}, {}), atpControler.createRanking);

router.get('/api/ranking/:id', atpControler.findOneRanking);

router.post('/api/ranking/:id', validate(rankingValidator.validate, {}, {}), atpControler.updateRanking);

router.delete('/api/ranking/:id', atpControler.deleteRanking);

router.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
})

module.exports = router;