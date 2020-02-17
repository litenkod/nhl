
const helpers = {
    sortName(array) { 
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
    },
    rosterSortPos(array) {
        //sub sort by number first
        this.rosterSortNumber(array);
        let goalie = array.filter(player => player.position.type === "Goalie");
        let defenseman = array.filter(player => player.position.type === "Defenseman");
        let forward = array.filter(player => player.position.type === "Forward");
        let sortedArray = [...goalie, ...defenseman, ...forward];
        return sortedArray;
    },
    rosterSortFullName(array) {
        array.sort(function(a, b) {
            const x = a.person.fullName.toUpperCase();
            const y = b.person.fullName.toUpperCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });

        return array
    },
    rosterSortNumber(array) {
        array.sort(function(a, b) {
            //No number exist place player last [100]
            const x = a.jerseyNumber !== undefined ? parseInt(a.jerseyNumber.toUpperCase()) : 100;
            const y = b.jerseyNumber !== undefined ? parseInt(b.jerseyNumber.toUpperCase()) : 100;
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });

        return array
    },
    cleanName(rawName) {
        var trimName = rawName.toLowerCase().replace(' ', '').replace('á', 'a').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace('.', '').replace('é', 'e').split(' ').join('').split('.').join('');
        return trimName;
    }

}

export default helpers