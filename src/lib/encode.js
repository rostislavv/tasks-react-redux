export const encodeParams = params => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');
