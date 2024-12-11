const express = require('express');
const cors = require('cors');//misa 24/5/2024

//Import and initialise the environment variables - stored in .dotenv file in project root
require('dotenv').config();

//Import Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const logisticaRoutes = require('./routes/logistica');

//Initialise Express
const app = express();
app.use(cors());
//Set up parser so we can read JSON info from the request
app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

//Set up API routes
app.use('/api/user', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/logistica', logisticaRoutes);

app.use(express.static('public'));//Hosteo la carpeta public con el index.html


//404 Error route as a catch-all
// app.use((req, res, next)=>{
//     res.status(404).send("Error 404 - Resource not found");
// });

//Set default port to serve app on
const port = process.env.PORT || 3000;

app.listen(port, console.log(`App running on port: ${port}`));

//Esta version aloja de forma publica un index.html
//que  permite registro login y acceso protegido