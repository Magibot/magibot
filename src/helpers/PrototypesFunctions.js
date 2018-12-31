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
        
        Array.prototype.shuffle = function() {
            if (this.length == 0) return this;

            for (let i = 0; i < this.length; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [this[i], this[j]] = [this[j], this[i]];
            }

            return this;
        }

        Array.prototype.insert = function(index, item) {
            this.splice(index, 0, item);
        };
    }
};