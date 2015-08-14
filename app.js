var express = require('express')
var app = express()
var ejs = require('ejs')
var request = require('request')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var urlencodedBodyParser = bodyParser.urlencoded({extended:false})
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('forums.db')
var dotenv = require('dotenv').load();
var $ = require('jquery')


app.use(urlencodedBodyParser)
app.use(methodOverride('_method'))
app.set('views_engine', 'ejs')
app.use(express.static(__dirname + '/views'))

// console.log(dotenv.password)
// console.log(dotenv.username)






app.get('/', function(req, res){
	res.redirect('/forums')
})

//// get all forums posts and post to list page
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


//// post new forum to db
app.post('/forums', function(req, res){
	db.run('INSERT INTO users (user_name, password) VALUES (?,?)', req.body.user, req.body.password, function(err){
			if (err){
				res.redirect('/forums/new/#alert')
			}else{

				db.run('INSERT INTO forums (forum_title, forum_content, user_id) VALUES (?,?,?)', req.body.title, req.body.content, this.lastID, function(err){
					if (err){
						throw err
					}else {
						res.redirect('/forums')
					}	
			})
		}		
	})
})


// //// get forum, comment, user info and post to page
// app.get('/forums/:id', function(req, res){
// 	var id = parseInt(req.params.id)
// 	db.all('SELECT forums.forum_title AS f_title, forums.forum_content AS f_content, comments.comment_content AS c_content, forums.id AS f_id, users.user_name AS name FROM forums LEFT JOIN comments ON forums.id = comments.forum_id LEFT JOIN users ON comments.user_id = users.id WHERE forums.id=?', id, function(err, data){
// console.log(data)
// 			if (err){
// 				throw err
// 			}else {
// ////count returning as object				
// 				db.all('SELECT count(*) FROM comments WHERE forum_id=?', id, function(err, count){
// 				if (err){
// 					throw err
// 				}else {
// 					console.log('count' + count)
// 					res.render('show.ejs', {data:data, count: count})
// 			}		
// 		})
// 	}
// })
// })



app.get('/forums/:id', function(req, res){
	var id = req.params.id
	db.all('SELECT * FROM forums JOIN users ON forums.user_id = users.user_id WHERE forums.forum_id=?', id, function(err, data){
		console.log(data)
		if (err){
			throw err
		}else {
			db .all('select * from comments JOIN users on users.user_id = comments.user_id WHERE forum_id=?', id, function(err, comments){
				if (err){
					throw err
				}else {
	////count returning as object				
					db.get('SELECT count(*) FROM comments WHERE forum_id=?', id, function(err, count){
						if (err){
							throw err
						}else {
							console.log('count' + count)
							res.render('show.ejs', {data: data, comments: comments, count: count})
						}
					})
				}		
			})
		}
	})
})


app.put('/forums/:id', function(req, res){
	//// update post... maybe
})


app.delete('/forums/:id', function(req, res){
	//// delete that post super user power
})


//// post comments to db
app.post('/comments', function(req, res){
	var id = parseInt(req.body.f_id)
//console.log(id)	
		db.run('INSERT INTO users (user_name, password) VALUES (?,?)',req.body.user, req.body.password, function(err){
			if (err){
				res.redirect('/forums/'+id)
			}else{

				db.run('INSERT INTO comments (forum_id, comment_content, user_id) VALUES (?,?,?)', id, req.body.comment, this.lastID, function(err){
//					console.log(req.body.f_id)
					if (err){
						throw err

		}else { 
			res.redirect('/forums/'+id+'#bottom')
				}
		})
		}
	})
})





///// if statements for when a user name exists
///// vote button
///// comment count
///// why is name returning null?








app.listen(3000, function(){
	console.log('listening on 3-thou')
})







