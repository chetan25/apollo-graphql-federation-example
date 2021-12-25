## How to setup Managed Federation with Apollo Studio

- First create an account in [Apollo Studio](https://studio.apollographql.com/).
- Create an Organization in there to store the graphs.
- Create a new graph for the Gateway service.
- Graph can be created in two modes, `development` and `Production`.
- The `development` mode one will just fire up from your running local gateway instance in localhost.
- The `production` mode will require us to push the service registry, to it to build up the composite federated graph.
- In production mode the Gateway will automatcially be pulling for changes from the Apollo Studio registry. We configure the registry to be pulling the changes from.
- This is manged registry, where we don't need to worry about updating Gateway anytime a federated service pushes changes.
- For this after you have set up the graph in Apollo studio, copy the keys int o the `.env` file.

```js
// .env.example
FEDERATED_SERVICE_A_URL=Some remote URL
FEDERATED_SERVICE_B_URL=Some remote URL
APOLLO_KEY=The key you got from Apollo Studio
APOLLO_GRAPH_ID=The key you got from Apollo Studio
APOLLO_GRAPH_VARIANT=current
```

- In the Gateway file we configure it to pull form Apollo Registry for production and locally build the federated schema in local

```js
if (process.env.NODE_ENV === "development") {
  gateway = new ApolloGateway({
    serviceList: [
      {
        name: "books",
        url: process.env.BOOKS_SERVICE_URL,
      },
      {
        name: "authors",
        url: process.env.AUTHORS_SERVICE_URL,
      },
    ],
    debug: true,
  });
} else {
  gateway = new ApolloGateway();
}
```

- In order for Gateway to keep polling for changes in production we need to configure the Apollo Registry it shoudl pull from

```js
const server = new ApolloServer({
  gateway,
  // this needs to be there for Managed Federation to work
  engine: {
    apiKey: process.env.APOLLO_KEY,
  },
  subscriptions: false,
});
```

- Now we can push the individual sub graphs to the gateway registry from our CD/CI and Gateway will automatically pick those changes.

```js
// Command to push a book schema registry from a federated service
`npx -p @apollo/rover rover subgraph publish <graphName>@current --name <serviceName> --schema <schemaFile> --routing-url <URL for the service>`

npx -p @apollo/rover rover subgraph publish chets-federated-gateway-prd@current --name books --schema .\books.graphql --routing-url http://localhost:4001/graphql

```

- You can then call rover <parameters> directly in your package.json scripts, or you can run
  `npx -p @apollo/rover rover <parameters>` in your project directory to execute commands.

// Apollo Server option

Pick this option when you want Apollo Server to automatically push its schema when it starts. This is the easiest way to keep your schema current in Studio and requires no further maintenance or installation. (You must be using Apollo Server v2.15.0+ to use this option.)

All you have to do is set four environment variables in your server's environment:

// federation

Pick this option to set up a graph that uses Apollo Federation. As you register each subgraph, Apollo will attempt to compose all your subgraphs into a single supergraph schema. Whenever supergraph schema build succeeds, your gateway can fetch the latest federated schema from the registry.

Rover is our command-line tool for interacting with the schema registry. Install Rover and choose an option below to start your first publish. Set up your CI/CD pipeline to automatically keep your schema current in Studio going forward!

Option 1: Use a local file containing the subgraph schema (e.g., called products-schema.graphql)

```js
 APOLLO_KEY=Your Key \
  rover subgraph publish chets-federated-gateway-prd@current \
  --name products --schema ./products-schema.graphql \
  --routing-url http://products.prod.svc.cluster.local:4001/graphql
```

Option 2: Introspect a running subgraph (e.g., at http://localhost:4001)

```js
 rover subgraph introspect \
  http://localhost:4001 | \
  APOLLO_KEY=Your Key \
  rover subgraph publish chets-federated-gateway-prd@current \
  --name products --schema - \
  --routing-url http://products.svc.cluster.local:4001/graphql

```

// CI/CD

Rover is our command-line tool for interacting with the schema registry. Install Rover and choose an option below to start your first publish. Set up your CI/CD pipeline to automatically keep your schema current in Studio going forward!

Option 1: Use a local file containing the schema (e.g., called schema.graphql)

```js
$ APOLLO_KEY=Your Key \
  rover graph publish chets-federated-gateway-prd@current \
  --schema ./schema.graphql
```

Option 2: Introspect a running server (e.g., at http://localhost:4000)

```js
 rover graph introspect \
  http://localhost:4000 | \
  APOLLO_KEY=Your Key \
  rover graph publish chets-federated-gateway-prd@current --schema -
```
