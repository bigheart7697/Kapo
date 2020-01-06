import server from '../../../apis/server'

export default token => {
    if(token) {
        server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete server.defaults.headers.common["Authorization"];
    }
}