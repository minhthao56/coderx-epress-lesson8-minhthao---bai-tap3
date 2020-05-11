const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var bookRouters = require("./routes/books.route");
var userRouters = require("./routes/users.route");
var transactionsRouters = require("./routes/transactions.route");

const port = 3000;



app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json())  
app.use(express.urlencoded({ extended: true }));

// Trang chủ
app.get("/", function (req, res){
    res.render("index")    
});

app.use("/books", bookRouters);
app.use("/users", userRouters);
app.use("/trans", transactionsRouters);

// Listening
app.listen(port, function(){
    console.log('Server listen on port' + port);
  });
  