import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import * as fs from 'fs'
import { Artist, Artwork, Query, Mutation } from './resolvers'
import Painter from './models/painter'
import Painting from './models/painting'
import User from './models/user'

const pubsub = createPubSub();

export const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8'
    ),
    resolvers: {
      Query,
      Mutation,
      // Subscription,
      Artist,
      Artwork,
    },
  }),
  context: {
    pubsub,
    Painter,
    Painting,
    User
  },
  //  graphqlEndpoint: '/',   // uncomment this to send the app to: 4000/
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});