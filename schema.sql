-- 创建一个管理员Admin表
DROP TABLE IF EXISTS Admin;
CREATE TABLE IF NOT EXISTS Admin(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
-- 插入一条数据
INSERT INTO Admin (username, password) VALUES ('admin', 'admin');

DROP TABLE IF EXISTS Contents;
CREATE TABLE IF NOT EXISTS Contents(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    sub_title TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    collection_id INTEGER,
    price REAL,
    publish_time INTEGER
);
INSERT INTO Contents (title, sub_title, thumbnail, cover_image, description, type, collection_id, price, publish_time) 
-- 插入12条数据
VALUES 
    ('Python', 'Python入门', 'https://www.baidu.com', 'https://www.baidu.com', 'Python入门教程', 'video', 1, 0.0, 1612137600),
    ('Java', 'Java入门', 'https://www.baidu.com', 'https://www.baidu.com', 'Java入门教程', 'video', 2, 0.0, 1612137600),
    ('C++', 'C++入门', 'https://www.baidu.com', 'https://www.baidu.com', 'C++入门教程', 'video', 3, 3.0, 1612137600),
    ('Python', 'Python进阶', 'https://www.baidu.com', 'https://www.baidu.com', 'Python进阶教程', 'video', 4, 0.0, 1612137600),
    ('Java', 'Java进阶', 'https://www.baidu.com', 'https://www.baidu.com', 'Java进阶教程', 'video', 1, 0.0, 1612137600),
    ('C++', 'C++进阶', 'https://www.baidu.com', 'https://www.baidu.com', 'C++进阶教程', 'video', 1, 0.0, 1612137600),
    ('Python', 'Python高级', 'https://www.baidu.com', 'https://www.baidu.com', 'Python高级教程', 'video', 1, 0.0, 1612137600),
    ('Java', 'Java高级', 'https://www.baidu.com', 'https://www.baidu.com', 'Java高级教程', 'video', 1, 0.0, 1612137600),
    ('C++', 'C++高级', 'https://www.baidu.com', 'https://www.baidu.com', 'C++高级教程', 'video', 1, 0.0, 1612137600),
    ('Python', 'Python实战', 'https://www.baidu.com', 'https://www.baidu.com', 'Python实战教程', 'video', 1, 0.0, 1612137600),
    ('Java', 'Java实战', 'https://www.baidu.com', 'https://www.baidu.com', 'Java实战教程', 'video', 1, 0.0, 1612137600),
    ('C++', 'C++实战', 'https://www.baidu.com', 'https://www.baidu.com', 'C++实战教程', 'video', 1, 0.0, 1612137600);