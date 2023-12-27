const express = require('express')
const connectToDatabase = require('./app/db/config')
const app = express()
const Router = require('./app/routes/routes')
require('dotenv').config();
const morgan = require('morgan')
connectToDatabase()
app.use(morgan("dev"))
app.use(express.json());
PORT = process.env.PORT || 5000
app.use('/api',Router) 

app.get('/',(req,res)=>{
   res.send("HEllo for server side app");
})
app.listen(PORT,()=>{
    console.log("\x1b[32m%s\x1b[0m", `✅ Server is  running at this PORT http://localhost:${PORT}/ ✅`); // \x1b[32m sets the color to green, \x1b[0m resets the color
})