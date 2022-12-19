import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/antd.css";
import {
  ApolloClient, InMemoryCache, ApolloProvider
} from '@apollo/client';
import { ChatProvider } from "./containers/hooks/useChat"
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChatProvider><App /></ChatProvider>
    </ApolloProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
