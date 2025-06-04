import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};
  

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    // options.headers['Access-Control-Allow-Origin'] = '*'
  } 
  
  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);
  
  return res;
}

export async function apiFetch(url, options = {}, state, setter, setIsLoaded, setMessage) {
  const response = await csrfFetch(url, options);
  if (response.ok) {
      const data = await response.json();
      if (data[state]) setter(data[state]);
      else if (data.message) setMessage(data);
      if (setIsLoaded) setIsLoaded(true);
      return true;
  }
  const errorObj ={};
  if (response.status < 500) {
      const errorMessages = await response.json();
      errorObj.errors = errorMessages
  } else {
      errorObj.errors = { message: "Something went wrong. Please try again" }
  }
  setMessage(errorObj);
  return false;
}

