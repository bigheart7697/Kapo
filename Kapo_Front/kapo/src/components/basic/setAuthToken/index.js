import server from '../../../apis/server'
import heroku from '../../../apis/heroku'

export default token => {
    if(token) {
        server.defaults.headers.common["Authorization"] = `JWT ${token}`;
        heroku.defaults.headers.common["Authorization"] = `JWT ${token}`;
    } else {
        delete heroku.defaults.headers.common["Authorization"];
    }
}