-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;



-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3: Sorting


SELECT id, first_name, last_name from users
ORDER BY last_name

-- Exercise 4: Filtering

SELECT id, user_id, image_url from posts
WHERE user_id=26


-- Exercise 5: Filtering with logical operators

SELECT id, user_id, image_url from posts
WHERE user_id=26 or user_id=12


-- Exercise 6: Using functions in a select statement


SELECT COUNT(*) FROM posts

-- Exercise 7: Aggregating data

SELECT user_id, COUNT(*) FROM comments 
GROUP BY user_id
ORDER BY COUNT(*) DESC


-- Exercise 8: Joining: two tables
SELECT posts.id, posts.user_id, posts.image_url, users.username, users.first_name, users.last_name from posts
INNER JOIN users ON posts.user_id=users.id
WHERE user_id=26 or user_id=12



-- Exercise 9: More joining practice: two tables

SELECT posts.id, posts.pub_date, following.following_id from posts
INNER JOIN following ON posts.user_id=following.user_id
WHERE following.user_id=26 
ORDER BY following.following_id


-- Exercise 10: More joining practice: three tables (Optional)




-- Exercise 11: Inserting records

INSERT INTO bookmarks(user_id ,post_id, timestamp)
VALUES(26, 219, NOW())
INSERT INTO bookmarks(user_id ,post_id, timestamp)
VALUES(26, 220, NOW())
INSERT INTO bookmarks(user_id ,post_id, timestamp)
VALUES(26, 221, NOW())





-- Exercise 12: Deleting records
DELETE FROM bookmarks WHERE post_id=219
DELETE FROM bookmarks WHERE post_id=220
DELETE FROM bookmarks WHERE post_id=221




-- Exercise 13: Updating records

UPDATE users
SET email='knick2022@gmail.com'
WHERE id=26




-- Exercise 14: More Querying Practice (Optional)
