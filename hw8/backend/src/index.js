// import GraphQL server
import server from './server'

import mongo from './mongo';
mongo.connect();


const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
}) 


