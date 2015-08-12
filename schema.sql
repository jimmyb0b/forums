DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS forums;
DROP TABLE IF EXISTS comments;

CREATE TABLE users(
	id INTEGER PRIMARY KEY,
	user_name TEXT,
	photo_url TEXT,
	UNIQUE (user_name)
	);

CREATE TABLE forums(
	id INTEGER PRIMARY KEY,
	user_id INTEGER,
	forum_title TEXT,
	forum_content TEXT,
	up_vote INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(id)
	);

CREATE TABLE comments(
	id INTEGER PRIMARY KEY,
	user_id INTEGER,
	forum_id INTEGER,
	comment_content TEXT,
	time_submitted CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (forum_id) REFERENCES forums(id)
	);


PRAGMA foriegn_keys = ON;