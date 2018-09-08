const QueryMaker = require("./QueryMaker.js");
const TableDocument = require("./TableDocument.js");

class Finder {

    static queryPromise(conn, query, queryParam=null) {
        return new Promise((resolve, reject) => {
            conn.query(query, queryParam, (err, result, field) => {
                if (err) {
                    return reject(err);
                }

                let rows = [];
                for (let i = 0; i < result.length; i++) {
                    rows.push(new TableDocument(result[i]));
                }

                resolve(rows);
            });
        });
    }

    static async runSearch(conn, searchDoc) {
        let prop = await searchDoc.properties();
        let query = QueryMaker.select(searchDoc.table, prop);
        return Finder.queryPromise(conn, query);
    }

    static async save(conn, searchDoc) {
        let changing = await searchDoc.changers();
        let prop = await searchDoc.properties();
        let query = QueryMaker.update(searchDoc.table, changing, prop);
        return Finder.queryPromise(conn, query);
    }

}

module.exports = Finder;
