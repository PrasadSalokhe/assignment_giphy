const RequestHandler = (
  url: string,
  {headers = {'Content-Type': 'application/json'}, method, body}: RequestInit,
): Promise<object> => {
  return new Promise((resolve, reject) => {
    fetch(url, {method, body, headers})
      .then(response => {
        if (!response.ok) throw response;
        return response
          .json()
          .then((successFullResponse: object) => resolve(successFullResponse));
      })
      .catch(err => {
        err.json().then((errorResponse: object) => reject(errorResponse));
      });
  });
};

export default RequestHandler;
