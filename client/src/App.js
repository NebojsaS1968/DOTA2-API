import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Heroes from "./components/Heroes";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Heroes</h1>
      </div>
      <Heroes />
    </ApolloProvider>
  );
}

export default App;
