
    INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
    ('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');
    INSERT INTO categories(name) VALUES
    ('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Железо'),
('Еда'),
('Рисование');
    ALTER TABLE articles DISABLE TRIGGER ALL;
    INSERT INTO articles(title, announce, full_text, picture, user_id, created_at) VALUES
    ('Как собрать камни бесконечности', 'Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.', 'Первая большая ёлка была установлена только в 1938 году. Еду надо примимать как минимум три раза. Собрать камни бесконечности легко, если вы прирожденный герой.', 'item03.jpg', 2, '2021-03-25 20:59:18');
    ALTER TABLE articles ENABLE TRIGGER ALL;
    ALTER TABLE article_categories DISABLE TRIGGER ALL;
    INSERT INTO article_categories(article_id, category_id) VALUES
    (1, 2);
    ALTER TABLE article_categories ENABLE TRIGGER ALL;
    ALTER TABLE comments DISABLE TRIGGER ALL;
    INSERT INTO COMMENTS(text, user_id, article_id) VALUES
    ('Плюсую, но слишком много буквы!', 2, 1),
('Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то?', 2, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 1);
    ALTER TABLE comments ENABLE TRIGGER ALL;