-- npx wrangler d1 execute prod-d1-tutorial --remote --file=./schema.sql



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


-- 创建一个用户表
DROP TABLE IF EXISTS User;
CREATE TABLE IF NOT EXISTS User(
    id INTEGER PRIMARY KEY,-- 主键
    username TEXT NOT NULL,-- 用户名
    password TEXT NOT NULL,-- 密码
    nickname TEXT,-- 昵称
    avatar TEXT,-- 头像
    email TEXT,-- 邮箱
    phone TEXT,-- 电话
    wechat_id TEXT,-- 微信号
    create_time INTEGER-- 创建时间
);
-- 插入两个用户
INSERT INTO User (username, password, email, phone, create_time)
VALUES 
    ('user1', 'user1', 'abcdefg@gmail.com', '12345678901', 1612137600),
    ('user2', 'user2', 'adjkajlfakljf@qq.com','kajdfkajfdakjdfk', 1612137600);

-- 创建一个验证码表
DROP TABLE IF EXISTS VerificationCode;
CREATE TABLE IF NOT EXISTS VerificationCode(
    id INTEGER PRIMARY KEY, -- 主键 
    email TEXT NOT NULL, -- 邮箱
    code TEXT NOT NULL, -- 验证码
    create_time INTEGER NOT NULL, -- 创建时间
    expire_time INTEGER NOT NULL,  -- 过期时间
    is_used INTEGER DEFAULT 0, -- 是否使用 0 未使用 1 已使用
    purpose TEXT NOT NULL -- 验证码用途 ,register , login , reset_password
);