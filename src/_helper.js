
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
            const x = parseInt(a.jerseyNumber.toUpperCase());
            const y = parseInt(b.jerseyNumber.toUpperCase());
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

export default helpers