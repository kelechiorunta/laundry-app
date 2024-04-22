// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const cors = require('cors')

// const app = express();
// const { createServer } = http;
// const PORT = 3001;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors())

// app.get('/register/pricelist', (req, res) => {
//   const { name, email, password } = req.body;
//   res.status(200).json({name});
//   res.end();
// });

// const server = createServer(app);

// server.listen(PORT, () => {
//   console.log('Listening on port', PORT);
// });