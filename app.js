var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/library');

var borrowers = mongoose.model('borrowers', { usn: String, booksIssued : Array });
var users = mongoose.model('users', { name: String, usn : String});
var books = mongoose.model('books', { name: String, accessionNumber : Number, category : String, author : String, publication : String, edition : String });
var search = mongoose.model("search",{value: String , no : Number});




app.post("/api/getallbooks/",function(req,res){

    var book = new books(req.body);
    book.save(function (err) {
        if (err) {
            console.log('Error occured while registering new book.'+err);
            
        } else {
            console.log(req.body);
        }
    });
    books.find({}, function (err, book) {
        if (err || book == null) {
            res.badRequest()
        } else
            res.send(book);
    });

});

app.post('/issue',function (req,res) {
    books.find({name:req.body.bookname}, function (err, books) {
        if (err || books == null) {
            res.send("error");
        } else
            if (books.length > 1){
                res.send("Books are repeated");
            }
            else {
                borrowers.find({usn: req.body.usnissue},function (err,bow) {
                     if (bow.length==0){
                         var borrower = new borrowers;
                         borrower.usn = req.body.usnissue;
                         borrower.booksIssued.push(books[0]);
                         borrower.save(function (err) {
                             if (err){
                                 console.log("error");
                             }
                         });
                     }
                     else {
                         var oldBooks = bow[0].booksIssued;
                         oldBooks.push(books[0]);
                         borrowers.update({usn:req.body.usnissue},{booksIssued:oldBooks},function (err) {
                            if (err)console.log("err");
                         });
                     }
                });

            }

    });
});

app.post('/return',function (req,res) {
    var id = parseInt(req.body.bookid);
        borrowers.update({usn:req.body.usnVal},{$pull : { "booksIssued" :{"accessionNumber" : id}}},function(err,up){
            if(err){
                console.log("error");
            }
            else{
                console.log("returned");
            }
        });

});

app.post("/AdminLogin",function(req,res){
    console.log(req.body.Key);
    if(req.body.Key=="admin"){
        res.redirect("/Admindashboard");
    }
});

app.post("/StudentLogin",function(req,res){
    res.redirect("/dash")
});

app.get("/Admindashboard",function(req,res){
    res.render("index");
});

app.get("/dash",function(req,res){
   res.render("index"); 
});

app.post("/api/search",function(req,res){
    search.remove(function(err,removed){
        if(err){
            console.log("error in deleting");
        }
    });
        var searchval = new search();
        searchval.value= req.body.searchValue ;
        searchval.no = req.body.values;
        searchval.save(function(err,data){
            if(err){
                console.log("error");
            }
            res.send(data);
        });
    });

app.get("/searchresult",function(req,res){

    search.find({},function(err,data){
        if(err){
            console.log("error in finding");
        }
        switch(data[0].no){
            case 1 :
                    books.find({name:data[0].value}, function (err, book) {
                        if (err || book == null) {
                            res.send("error");
                        } else
                        res.send(book);    
                    });
                    break;
            case 2 :
                    books.find({author:data[0].value}, function (err, book) {
                        if (err || book == null) {
                            res.send("error");
                        } else
                        res.send(book);    
                    });
                    break;
            case 3 :
                    books.find({publication:data[0].value}, function (err, book) {
                        if (err || book == null) {
                            res.send("error");
                        } else
                        res.send(book);    
                    }); 
                    break;
            case 4 :
                    books.find({category:data[0].value}, function (err, book) {
                        if (err || book == null) {
                            res.send("error");
                        } else
                        res.send(book);    
                    });
                    break;
            default : res.send("error");

        }
    });
});

app.get("/getbooknames",function(req,res){
    books.find({}, function (err, book) {
        if (err || book == null) {
            res.send("error");
        } else
           var bookvalue = [];
            book.forEach(function(data){
                bookvalue.push(data.name);
            });
        res.send(bookvalue);    
    });
});


app.get('/api/getallbooks/', function(req, res) {

    books.find({}, function (err, book) {
        if (err || book == null) {
            res.badRequest()
        } else
           var bookvalue = [];
            book.forEach(function(data){
                bookvalue.push(data);
            });
        res.send(bookvalue);    
    });
});





app.use('/', routes);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
