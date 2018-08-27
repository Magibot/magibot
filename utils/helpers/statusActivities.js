module.exports = {
    _queryPromise: function(conn, query, queryParam=null) {
        return new Promise((resolve, reject) => {
            conn.query(query, queryParam, (err, result, field) => {
                if (err) {
                    return reject(err);    
                }
                resolve(result);
            });
        });
    },
    activitiesList: function(conn) {
        return this._queryPromise(conn, "SELECT * FROM STATUSATIVIDADE");
    },
    updateUsedActivity: function(conn, activityCode, used) {
        conn.query("UPDATE STATUSATIVIDADE SET UTILIZADO = ? WHERE CODIGOATIV = ?", [used, activityCode]);
    }
}