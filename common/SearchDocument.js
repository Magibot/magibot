const Finder = require("./Finder.js");

class SearchDocument {
    constructor(table) {
        this._table = table;
        this.parameters = {};
        this.changes = {};
    }

    get table() {
        return this._table;
    }

    clear() {
        this.parameters = {};
        this.changes = {};
    }

    _isParametersCorrect(param, mapping) {
        let parametersIsOk = true;
        Object.keys(param).forEach(paramKey => {
            let mappedKeys = Object.keys(mapping);
            if (mappedKeys.indexOf(paramKey) < 0) {
                parametersIsOk = false;
            }
        });

        return parametersIsOk;
    }

    _handleProperties(param, mapping) {
        let prop = {};
        Object.keys(param).forEach(paramKey => {
            prop[paramKey] = {
                columnName: mapping[paramKey],
                searchValue: param[paramKey]
            };
        });
        return prop;
    }

    async _mapping() {
        let columns = await Finder.queryPromise(dbconn, `SHOW COLUMNS FROM ${this._table}`);
        let columnNames = [];
        let variables = [];
        columns.forEach(column => {
            columnNames.push(column.field);
            variables.push(column.field.toCamelCase());
        });
        let mapping = Object.zip(variables, columnNames);
        return mapping;
    }

    properties() {
        return this._mapping().then(mapping => {
            let parametersIsOk = this._isParametersCorrect(this.parameters, mapping);
            if (!parametersIsOk) {
                return null;
            }

            let prop = this._handleProperties(this.parameters, mapping);
            return prop;
        });       
    }

    changers() {
        return this._mapping().then(mapping => {
            let changersIsOk = this._isParametersCorrect(this.changes, mapping);
            if (!changersIsOk) {
                return null;
            }

            let prop = this._handleProperties(this.changes, mapping);
            return prop;
        });
    }
}

module.exports = SearchDocument;

