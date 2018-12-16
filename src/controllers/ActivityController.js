const mongojs = require("mongojs");
const db = mongojs(process.env.MONGODB, ['activities']);

class ActivityController {

    static getUnusedActivity() {
        return new Promise((resolve, reject) => {
            db.activities.find({ foiUtilizado: false }, (error, activities) => {
                if (error) {
                    reject("Ocorreu um erro ao buscar por atividades no banco de dados");
                }
    
                // Tratar o caso de receber todas as atividades já utilizadas
                if (activities.length == 0) {
                    ActivityController.updateAllUsed();
                    ActivityController.updateBotActivity(client);
                    return;
                }
    
                let activity = activities.randomElement();
    
                // Atualizar o 'foiUtilizado' desta atividade para true 
                let updActivity = activity;
                updActivity.foiUtilizado = true;
                ActivityController.updateActivity(activity._id, updActivity);
                
                resolve(activity);
            }); 
        });
    }

    static updateAllUsed() {
        db.activities.find({ foiUtilizado: true }, (error, activities) => {
            for (let i = 0; i < activities.length; i++) {
                let id = mongojs.ObjectID(activities[i]._id);
                let updActivity = activities[i];
                updActivity.foiUtilizado = false;
                db.activities.update({ _id: id }, updActivity, {}, (error, activity) => {
                    if (error) {
                        return console.log("Erro ao realizar update.");
                    }
                });
            }
        });
    }

    static updateActivity(activityId, updActivity) {
        db.activities.update({ _id: mongojs.ObjectID(activityId) }, updActivity, {}, (error, activity) => {
            if (error) {
                return console.log("Erro ao realizar update.");
            }
        });
    }
}

module.exports = ActivityController;
