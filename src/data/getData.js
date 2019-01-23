
function getData(API,DEFAULT_QUERY) {
    fetch(API + DEFAULT_QUERY)
        .then(response => response.json())
        .then(data => {
            return data.teams;
        });
}

module.exports = {
    teamData: function() {

        const API = 'https://statsapi.web.nhl.com/api/v1/teams';
        const DEFAULT_QUERY = '';
        const result = getData(API,DEFAULT_QUERY)
        return 'result';

    }
}
