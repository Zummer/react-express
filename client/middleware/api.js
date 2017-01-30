//import fetch from 'isomorphic-fetch'

const API_ROOT = 'api/';

const callApi = (endpoint, method, payload, testUrl) => {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  if (testUrl) {
    fullUrl = testUrl + '/' + fullUrl;
  }

  let requestOptions = {
    method,
    headers: {
      Accept: 'application/json'
    }
  };

  if (payload) {
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(payload);
  }

  return fetch(fullUrl, requestOptions)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        //throw json; // аналогично строке ниже
        return Promise.reject(json);
      }
      return json;
    })
}

export const CALL_API = Symbol('Call API');

const api = store => next => action => {

  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action)

  }

  let { endpoint  } = callAPI;
  const { payload, method, types, testUrl } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());

  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');

  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');

  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');

  }

  const actionWith = payload => {
    const finalAction = Object.assign({}, action, payload);
    delete finalAction[CALL_API];
    return finalAction;

  }

  const [ requestType, successType, failureType  ] = types;
  next(actionWith({
    type: requestType,
    status: 'SEND'
  }));

  return callApi(endpoint, method, payload, testUrl)
    .then(
      (response) => next(actionWith({
        type: successType,
        response,
        status: 'SUCCESS'

      })),
      (error) => next(actionWith({
        type: failureType,
        error: error, 
        message: error.message || 'Something bad happened',
        status: 'FAIL'

      }))

    );

}

export default api;
