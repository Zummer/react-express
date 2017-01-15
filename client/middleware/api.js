const API_ROOT = '/';

const callApi = (endpoint, method, data) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  let requestOptions = {
    method,
    headers: {
      Accept: 'application/json'
    }
  };

  if (data) {
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(data);
  }

  return fetch(fullUrl, requestOptions)
    .then(response =>
      response.json()
      .then(json => {
        if (!response.ok) {
          return Promise.reject(json)

        }

        console.log('callApi OK');
        return json;

      })
    )
}

export const CALL_API = Symbol('Call API');

const api = store => next => action => {

  if(!action) {
    return;
  }

  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action)

  }

  let { endpoint  } = callAPI;
  const { data, method, types  } = callAPI;

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

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;

  }

  const [ requestType, successType, failureType  ] = types;
  next(actionWith({
    type: requestType
  }));

  return callApi(endpoint, method, data)
    .then(
      response => next(actionWith({
        response,
        type: successType

      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'

      }))

    )

}

export default api;
