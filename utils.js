module.exports = {
    assertString: function(string) {
        const isString = typeof string === 'string';
        if (!isString) throw new Error(`Parameter needs to be a type of string: ${string}`);
    },

    assertArray: function(array) {
        const notArray = !(array instanceof Array);
        if (notArray) throw new Error(`Parameter needs to be an instance of Array: ${array}`);
    }
};