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
app.use(express.static(__dirname + '/views'))


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
	db.all('SELECT forums.forum_title AS f_title, forums.forum_content AS f_content, comments.comment_content AS c_conetent, forums.id AS f_id FROM forums LEFT JOIN comments on forums.id = comments.forum_id WHERE forums.id=?', req.params.id, function(err, rows){
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
	//// delete that post super user power
})


app.post('/comments', function(req, res){
	var id = parseInt(req.body.f_id)
	db.run('INSERT INTO comments (forum_id, comment_content) VALUES (?,?)', id, req.body.comment, function(err){
		console.log(req.body.f_id)
		if (err){
			throw err
		}else {
			res.redirect('/forums/'+id)
		}
	})
})








app.listen(3000, function(){
	console.log('listening on 3-thou')
})







