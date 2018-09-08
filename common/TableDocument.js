class TableDocument {
    constructor(constructorObj) {
        Object.keys(constructorObj).forEach(objKey => {
            this[objKey.toCamelCase()] = constructorObj[objKey];
        });
    }
}

module.exports = TableDocument;
