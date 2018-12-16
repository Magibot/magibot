module.exports = {
    config: () => {
        Array.prototype.randomElement = function () {
            return this[Math.floor(Math.random() * this.length)];
        }
        
        String.prototype.toCamelCase = function() {
            let string = this.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
                return match.charAt(match.length-1).toUpperCase();
            });
            return string.charAt(0).toLowerCase() + string.substring(1);
        }
        
        Object.prototype.zip = function (arr1, arr2) {
            let obj = {};
            for (let i = 0; i < arr1.length; i++) {
                obj[arr1[i]] = arr2[i];
            }
            return obj;
        }
        
        Object.prototype.exists = function () {
            return Object.keys(this).length > 0;
        }
    }
};