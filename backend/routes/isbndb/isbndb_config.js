import axios from 'axios';

let headers = {
    "Content-Type": 'application/json',
    "Authorization": '54077_e16a78df9c89d5e4d11e7b5d317a697d'
}

const instance = axios.create({
    baseURL: 'https://api2.isbndb.com',
    headers: headers
});

export default instance;