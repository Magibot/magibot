const mongojs = require("mongojs");
const db = mongojs(process.env.MONGODB, ['municipiosIbge']);

class MunicipioIbgeController {

    static getMunicipioByConcatName(nomeConcat) {
        return new Promise((resolve, reject) => {
            db.municipiosIbge.findOne({ nomeConcat: nomeConcat }, (error, municipio) => {
                if (error) {
                    return reject(error);
                }

                resolve(municipio);
            });
        });
    }
}

module.exports = MunicipioIbgeController;
