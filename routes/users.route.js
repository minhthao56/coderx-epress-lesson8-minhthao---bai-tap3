var express = require('express');
var router = express.Router();
var db = require('../db');
var shortid = require('shortid');



// List book
router.get("/",function (req, res) {
    res.render("users/user", {
        users: db.get("users").value()

    });
});
//Find
router.get ('/find', function(req, res){
    var q = req.query.q;
    var filterlistuser = db.get("users").filter(function(user){
      var lowercase = user.name.toLowerCase();
       return lowercase.indexOf(q) !==-1;
    }).write();
    res.render('users/user',{
        users: filterlistuser
    });
  });
//Detail
router.get('/detail/:id', function (req, res) {
    var id = req.params.id;
    var detailuser = db.get("users").find({id: id}).value()
    res.render("users/detail", {
        user: detailuser
    })    
  });
// Add book
router.get('/add', function(req, res){
    res.render('users/add')
})
router.post('/add', function(req, res){
    req.body.id=shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users')
  });

//Delete book
router.get("/delete",function (req, res) {
    res.render("users/delete", {
        users: db.get("users").value()
    });
});
router.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    db.get("users").remove({id: id}).write();
    res.redirect('/users/delete');
});
//Update
router.get("/update",function (req, res) {
    res.render("users/update", {
        users: db.get("users").value()

    });
});
router.get('/update/:id', function (req, res) {
    var id = req.params.id;
    var edituser = db.get("users").find({id: id}).value()
    res.render("users/edit",{
        user: edituser
    });
    router.post('/update/:id', function(req, res){
        db.get('users')
            .find({id: id})
            .assign({name: req.body.name})
            // .assign({description: req.body.description})
            .write()
        res.redirect('/users/update')
    });
});


module.exports = router;