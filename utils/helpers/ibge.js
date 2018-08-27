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
    municipios: function (conn) {
        return this._queryPromise(conn, "SELECT * FROM MUNICIPIOIBGE");
    }
}