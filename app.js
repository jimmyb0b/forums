var express = require('express')
var app = express()
var ejs = require('ejs')
var request = require('request')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var urlencodedBodyParser = bodyParser.urlencoded({extended:false})
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('forums.db')

app.use(urlencodedBodyParser)
app.use(methodOverride('_method'))
app.set('views_engine', 'ejs')



app.get('/forums', function (req, res){
	//// show all forum posts
})

app.get('/forums/new' function(req,res){
	//// now post form
})

app.post('/forums', function(req, res){
	//// add new post to db
})

app.get('/forums/:id', function(req, res){
	//// display a forum post
})

app.put('/forums/:id', function(req, res){
	//// update post... maybe
})

app.delete('/forums/:id', function(req, res){
	//// delete that post
})





app.listen(3000, function(){
	console.log('listening on 3-thou')
})