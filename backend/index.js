const cors = require('cors')
const connectToMongo = require('./database');


connectToMongo();

const express = require('express')
const app = express();
const port = 5000



app.use(cors())
app.use(express.json());

//All Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.listen(port, () => {
  console.log(`Mybook Backend listening on port http://localhost:${port}`)
})
