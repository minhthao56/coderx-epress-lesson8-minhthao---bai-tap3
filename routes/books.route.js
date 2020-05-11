var express = require('express');
var router = express.Router();
var db = require('../db');
var shortid = require('shortid');



// List book and find
router.get("/",function (req, res) {
    res.render("books/book", {
        titles: db.get("titles").value()

    });
});
//Find
router.get ('/find', function(req, res){
    var q = req.query.q;
    var filterlistbook = db.get("titles").filter(function(book){
      var lowercase = book.tl.toLowerCase();
       return lowercase.indexOf(q) !==-1;
    }).write();
    res.render('books/book',{
        titles: filterlistbook
    });
  });
//Detail
router.get('/detail/:id', function (req, res) {
    var id = req.params.id;
    var detailbook = db.get("titles").find({id: id}).value()
    res.render("books/detail", {
        title: detailbook
    })    
  });
// Add book
router.get('/add', function(req, res){
    res.render('books/add')
})
router.post('/add', function(req, res){
    req.body.id=shortid.generate();
    db.get('titles').push(req.body).write()
    res.redirect('/books')
  });

//Delete book
router.get("/delete",function (req, res) {
    res.render("books/delete", {
        titles: db.get("titles").value()
    });
});
router.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    db.get("titles").remove({id: id}).write();
    res.redirect('/books/delete');
});
//Update
router.get("/update",function (req, res) {
    res.render("books/update", {
        titles: db.get("titles").value()

    });
});
router.get('/update/:id', function (req, res) {
    var id = req.params.id;
    var editbook = db.get("titles").find({id: id}).value()
    console.log(editbook);
    res.render("books/edit",{
        title: editbook
    });
    router.post('/update/:id', function(req, res){
        db.get('titles')
            .find({id: id})
            .assign({tl: req.body.tl})
            .assign({description: req.body.description})
            .write()
        res.redirect('/books/update')
    });
});


module.exports = router;
