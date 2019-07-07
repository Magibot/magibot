exports.getUrlWithQueryParams = (url, params) => {
  let urlWitQuery = `${url}?`;
  const totalParams = Object.keys(params).length;
  Object.keys(params).forEach((key, i) => {
    let query = `${key}=${params[key]}`;
    if (i < totalParams - 1) {
      query += '&';
    }
    urlWitQuery += query;
  });

  return urlWitQuery;
};
