DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS forums;
DROP TABLE IF EXISTS comments;

CREATE TABLE users(
	user_id INTEGER PRIMARY KEY,
	user_name TEXT,
	password TEXT,
	photo_url TEXT,
	UNIQUE (user_name)
	);

CREATE TABLE forums(
	forum_id INTEGER PRIMARY KEY,
	user_id INTEGER,
	forum_title TEXT,
	forum_content TEXT,
	up_vote INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(id)
	);

CREATE TABLE comments(
	comment_id INTEGER PRIMARY KEY,
	user_id INTEGER,
	forum_id INTEGER,
	comment_content TEXT,
	time_submitted CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (forum_id) REFERENCES forums(id)
	);


PRAGMA foreign_keys = ON;