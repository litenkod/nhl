

module.exports = {
    sortName: function(array, sortValue) {

        array.sort(function(a, b) {
            const x = a.name.toUpperCase();
            const y = b.name.toUpperCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        

        return array

    }
}
