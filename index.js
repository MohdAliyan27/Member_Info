const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const middleware_logger = require('./middleware/logger');
const members = require('./Members')

const app =express();
const port=process.env.PORT || 3000;

//Body parser Middleware.
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Homepage route
app.get('/', (req,res) => res.render('index', {
        title:"Title of page",
        members
}))

//Set the static folder.
//serve as the middleware.
app.use(express.static(path.join((__dirname,'public'))));


// app.get('/', (req,res) => {
//     res.send("Hey.........")
// })

//Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//homepage route handlebars
app.get('/', (req, res) => {
    res.render('index');
});


//Initialize the middleware
//now commenting as we need not to log this thing again and again.
//app.use(middleware_logger); 

//Members API routes
app.use('/api/memberinfo',require('./routes/api/api_route'))


//For individual files
// app.get('/indexFile', (req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })

app.listen(port, (err,data) => {
    console.log(`Server running at ${port}`)
})

//HANDLING ROUTES IN NODE USING EXPRESS IS EASY.
// get, post, put, delete.
//Request parameter has access to params, query strings, url parts,
// Response. send or response.sendFile, etc
// Express has a router we can store route in other file and then export them .
// we can parse incoming data from body-parser or using express.

//MIDDLEWARE
// This function has access to req and res object.
// express has its own middleware but we can also have custom middleware.
// 
// USE OF MIDDLEWARE
// Execute any code.
// MAke changes in req/res object.
// end the res cycle.
// call the next middleware.
//
//express.js
