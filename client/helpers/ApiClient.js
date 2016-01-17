import superagent from 'superagent';

export default class ApiClient {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'del']
      .forEach((method) => {
        this[method] = ({path, options}) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](this.formatUrl(path));

            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                // TODO find a better way to do that. middleware?
                reject(err);
              } else {
                resolve(res.body);
              }
            });
          });
        };
      });
  }

  formatUrl(path) {
    return path[0] !== '/' ? '/' + path : path;
  }

}
