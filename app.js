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


app.get('/', function(req, res){
	res.redirect('/forums')
})


app.get('/forums', function (req, res){
	db.all('SELECT * FROM forums', function(err, rows){
		if (err){
			throw err
		}else{
			res.render('index.ejs', {data: rows})			
		}
	})
})

app.get('/forums/new', function(req,res){
	res.render('new.ejs')
})

app.post('/forums', function(req, res){
	db.run('INSERT INTO forums (forum_title, forum_content) VALUES (?,?)', req.body.title, req.body.content, function(err){
		if (err){
			throw err
		}else 
			res.redirect('/forums')
	})
})


app.get('/forums/:id', function(req, res){
	db.all('SELECT * FROM forums WHERE id=?', req.params.id, function(err, rows){
		if (err){
			throw err
		}else {
			res.render('show.ejs', {data:rows})
		}
	})
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







