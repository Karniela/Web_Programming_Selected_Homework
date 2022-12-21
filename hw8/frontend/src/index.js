import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Containers/App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/',
  options: { reconnect: true }
})


const link =  split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return(
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({})
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
