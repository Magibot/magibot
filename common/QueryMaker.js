class QueryMaker {

    static _handleWhereQuery(queryParam) {
        let query = " WHERE";
        let keys = Object.keys(queryParam); 
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = queryParam[key].searchValue;
            if (isNaN(parseInt(value))) {
                value = `'${value}'`;
            }
            query += ` ${queryParam[key].columnName} = ${value}`;
            if (i < keys.length - 1) {
                query += " AND";
            }
            
        }

        return query;
    }

    static select(table, queryParam) {
        let query = `SELECT * FROM ${table}`;
        if (!queryParam.exists()) {
            return query;
        }

        query += QueryMaker._handleWhereQuery(queryParam);
        return query;
    }

    static update(table, changersParam, queryParam) {
        let query = `UPDATE ${table} SET`;
        Object.keys(changersParam).forEach(key => {
            let value = changersParam[key].searchValue;
            if (isNaN(parseInt(value))) {
                value = `'${value}'`;
            }
            query += ` ${changersParam[key].columnName} = ${value}`
        });
        if (!queryParam.exists()) {
            return query;
        }

        query += QueryMaker._handleWhereQuery(queryParam);
        return query;
    }

}

module.exports = QueryMaker;
