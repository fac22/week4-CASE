BEGIN;

DROP TABLE IF EXISTS users, sessions, pictures, guess CASCADE;

SET timezone = 'Europe/London';

CREATE TABLE users (
  id serial primary key,
  name varchar(255) NOT NULL,
  email text unique not NULL,
  password text not null
);

CREATE TABLE sessions (
    sid text primary key,
    data json not null
);

CREATE TABLE pictures(
    id serial primary key,
    picture bytea not null,
    user_id integer references users(id) ON DELETE CASCADE,
    created_at timestamp
);

CREATE TABLE guesses(
    id serial primary key,
    guess_name varchar(255) not null,
    picture_id integer references pictures(id),
    user_id integer references users(id) ON DELETE CASCADE,
    created_at timestamp
);

INSERT INTO users (name, email, password) VALUES
('elena','elena@test.com','ejhsfdgeshkd.gsfhskhfks');

INSERT INTO sessions (sid, data) VALUES
('abc123','{"test":"stuff"}');

-- INSERT INTO pictures (picture, user_id, timestamp) VALUES
-- ();

-- INSERT INTO cat_names (id, name, cat_id, votes, created_at) VALUES
-- ( (SELECT CURRENT_TIMESTAMP));

COMMIT;