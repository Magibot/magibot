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
        
    }
};