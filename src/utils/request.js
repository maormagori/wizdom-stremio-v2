import superagent from 'superagent';


const get = async (url, headers = {}) => await superagent.get(url).set(headers);
const getBuffer = async (url, headers = {}) => await superagent.get(url).set(headers).buffer(true);
const post = async (url, headers = {}, body = {}) => await superagent.post(url).set(headers).send(body);

const request = {
    get,
    getBuffer,
    post
}


export default request;