"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const index_1 = require("../../defaults/options/index");
function default_1(configuration) {
    const port = lodash_1.get(configuration, 'port', index_1.defaultPort);
    let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/react@16/umd/react.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.production.min.js"></script>
    
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.css" />
        <script src="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.min.js"></script>
        <title>Wertik-js GraphQL voyager</title>
      </head>
      <body>
        <div id="voyager">Loading...</div>
        <script>
          function introspectionProvider(introspectionQuery) {
            return fetch('http://localhost:${port}', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({query: introspectionQuery}),
            }).then(response => response.json());
          }
    
          // Render <Voyager />
          GraphQLVoyager.init(document.getElementById('voyager'), {
            introspection: introspectionProvider
          })
        </script>
      </body>
    </html>
  `;
    return html;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map