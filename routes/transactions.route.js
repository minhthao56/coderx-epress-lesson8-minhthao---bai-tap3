var express = require('express');
var router = express.Router();
const app = express();
var db = require('../db');
var shortid = require('shortid');
var moment = require('moment');




//Lish transactions
router.get("/",function (req, res) {
    res.render("transactions/trans", {
        trans: db.get("trans").value()
    });
});


// Detail transactions
router.get('/detail/:id/book/:bookId/user/:userId', function (req, res) {
    var bookId = req.params.bookId;
    var userId = req.params.userId;
    var id = req.params.id;
    var detailbook = db.get("titles").find({id: bookId}).value();
    var detailuser = db.get("users").find({id: userId}).value();
    var detailtran = db.get("trans").find({id: id}).value();
    res.render("transactions/detail", {
        title:detailbook,
        user: detailuser,
        tran:detailtran
    })    
  });
// Add
router.get("/add",function (req, res) {
    var titles = db.get("titles").value()
    var users = db.get("users").value()
    res.render("transactions/add", {
        titles:titles,
        users: users
    });
});
router.post('/add', function(req, res){
    req.body.id=shortid.generate();
    db.get('trans').push(req.body).write()
    res.redirect('/trans')
  });



module.exports = router;