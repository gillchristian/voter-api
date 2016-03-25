'use strict';

var Zone = require('./zones.model');

module.exports = zonesRoutes;

function zonesRoutes(app, express){
  var router = express.Router();

  router.route('/')
    // --- get all zones ---
    .get((req, res)=>{

      Zone.find({}, (err, zones)=>{
        if (err) throw err;
        res.json(zones);
      })

    })
    // --- add a zone ---
    .post((req, res)=>{

      let zone        = new Zone();
      zone.name       = req.body.name;
      zone.desc       = req.body.desc;
      zone.goal       = req.body.goal;
      zone.delivered  = req.body.delivered;

      zone.save(err=>{
        if (err) {
          var exists = {
            success: false,
            message: 'Ya existe una zona con ese nombre!'
          };
          return err.code === 11000 ? res.json(exists) : res.send(err);
        }
        res.json({message: 'Zona creada'})
      })
    })

  return router;
}
