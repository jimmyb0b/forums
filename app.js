var express = require('express')
var app = express()
var ejs = require('ejs')
var request = require('request')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var urlencodedBodyParser = bodyParser.urlencoded({extended:false})
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('forums.db')
var cookieSession = require('cookie-session')



app.use(urlencodedBodyParser)
app.use(methodOverride('_method'))
app.set('views_engine', 'ejs')
app.use(express.static(__dirname + '/views'))




app.get('/', function(req, res){
	res.redirect('/forums')
})

//// get all forums posts and post to list page
app.get('/forums', function(req, res){
	db.all('SELECT * FROM forums JOIN users ON users.user_id = forums.user_id', function(err, rows){
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


// //// post new forum to db
// app.post('/forums', function(req, res){
// 	db.run('INSERT INTO users (user_name, password) VALUES (?,?)', req.body.user, req.body.password, function(err){
// 			if (err){
// 				res.redirect('/forums/new/#alert')
// 			}else{

// 				db.run('INSERT INTO forums (forum_title, forum_content, user_id) VALUES (?,?,?)', req.body.title, req.body.content, this.lastID, function(err){
// 					if (err){
// 						throw err
// 					}else {
// 						res.redirect('/forums')
// 					}	
// 			})
// 		}		
// 	})
// })




app.post('/forums', function(req, res){
	db.get('select * from users where user_name = ? AND password = ?', req.body.user, req.body.password, function(err, name){
			console.log(name)
			if (name === undefined){
				db.run('INSERT INTO users (user_name, password) VALUES (?,?)',req.body.user, req.body.password, function(err){
					if (err){
						throw err
					}else{
						db.run('INSERT INTO forums (forum_title, forum_content, user_id) VALUES (?,?,?)', req.body.title, req.body.content, this.lastID, function(err){
							if (err){
								throw err
							} else {
								res.redirect('/forums/#bottom')
							}
						})
					}
				})
			}else{
				db.run('INSERT INTO forums (forum_title, forum_content, user_id) VALUES (?,?,?)', req.body.title, req.body.content, name.user_id, function(err){
					if (err){
						throw err

					}else { 
						res.redirect('/forums/#bottom')
				}
			})
		}
	})
})






app.get('/forums/:id', function(req, res){
	var id = req.params.id
		db.get('SELECT * FROM forums JOIN users ON forums.user_id = users.user_id WHERE forums.forum_id=?', id, function(err, data){
		console.log(data)
			if (err){
				throw err
			}else {
				db.all('select * from comments JOIN users on users.user_id = comments.user_id WHERE forum_id=?', id, function(err, comments){
		//console.log(comments)
					if (err){
						throw err
					}else {			
						db.get('SELECT count(*) AS num FROM comments WHERE forum_id=?', id, function(err, count){
							if (err){
								throw err
							}else {
		//console.log(count)
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
	var id = parseInt(req.body.forum_id)

//// check if user/password exist
	db.get('select * from users where user_name = ? AND password = ?', req.body.user, req.body.password, function(err, name){
			console.log(name)
			if (name === undefined){
				db.run('INSERT INTO users (user_name, password) VALUES (?,?)',req.body.user, req.body.password, function(err){
					if (err){
						throw err
					}else{
						db.run('INSERT into comments (forum_id, comment_content, user_id) VALUES (?,?,?)', id, req.body.comment, this.lastID, function(err){
							if (err){
								throw err
							} else {
								res.redirect('/forums/'+id+'#bottom')
							}
						})
					}
				})
			}else{
				db.run('INSERT INTO comments (forum_id, comment_content, user_id) VALUES (?,?,?)', id, req.body.comment, name.user_id, function(err){
					if (err){
						throw err

					}else { 
						res.redirect('/forums/'+id+'#bottom')
				}
			})
		}
	})
})


////increment vote count
app.post('/vote', function(req, res){
	db.get('SELECT up_vote AS num FROM forums WHERE forum_id = ?', req.body.forum_id, function(err, count){
//		console.log(count)
		if (count.num === undefined){
			count = 0
			var add = count.num += 1
		}else {
			var add = count.num += 1
//			console.log(add)
		}
			db.run('UPDATE forums SET up_vote =? WHERE forum_id = ?', add, req.body.forum_id, function(err){
				if (err){
					throw err
				}else {
					res.redirect('/forums')
				}
			})
		
	})
})


app.get('/forums/:user', function(req, res){
	var name = req.params.user
	db.get('SELECT * FROM forums JOIN users ON users.user_id = forums.user_id WHERE user_name = ?', name, function(err, data){
		if (err){
			throw err
		}else{
			res.render('user.ejs', {data:data})
		}
	})
})



///// *** TO DO *** //////
//// css this bitch









app.listen(3000, function(){
	console.log('listening on 3-thou')
})







