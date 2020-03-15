import { IConfiguration } from "src/framework/types/configuration";
import { successMessage } from "./../../logger/consoleMessages";

export default function(configuration: IConfiguration, expressInstance: any) {
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/react@16/umd/react.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.production.min.js"></script>
    
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.css" />
        <script src="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.min.js"></script>
      </head>
      <body>
        <div id="voyager">Loading...</div>
        <script>
          function introspectionProvider(introspectionQuery) {
            return fetch('http://localhost:${configuration.ports.graphql}', {
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
  const app = expressInstance();
  const port = 9090;

  app.get("/", (req, res) => res.send(html));

  app.listen(port, () => successMessage(`GraphQL voyager is running at server: `, `http://localhost:${port}!`));
}
