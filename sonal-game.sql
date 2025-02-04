DROP TABLE IF EXISTS spanish_easy;

CREATE TABLE spanish_easy (
    spanish_easy_id INT GENERATED ALWAYS AS IDENTITY,
    question VARCHAR(80) NOT NULL,
    question VARCHAR(80),
    english VARCHAR(80),
    fool_1 VARCHAR(80),
    fool_2 VARCHAR(80),
    fool_3 VARCHAR(80)
);

INSERT INTO Questions (question, english, fool_1, fool_2, fool_3) VALUES
('Hola.', 'Hello.', 'Goodbye.', 'Please.', 'Yes.'),
('¿Cómo estás?', 'How are you?', 'What is your name?', 'Where are you?', 'How old are you?'),
('Gracias.', 'Thank you.', 'Please.', 'You''re welcome.', 'Good morning.'),
('Por favor.', 'Please.', 'Thank you.', 'Goodbye.', 'Hello.'),
('Sí.', 'Yes.', 'No.', 'Maybe.', 'Please.'),
('No.', 'No.', 'Yes.', 'Hello.', 'Thank you.'),
('Buenos días.', 'Good morning.', 'Good night.', 'Hello.', 'Goodbye.'),
('Buenas noches.', 'Good night.', 'Good morning.', 'See you later.', 'Goodbye.'),
('¿Adónde vas?', 'Where are you going?', 'What is your name?', 'How are you?', 'Where do you live?'),
('Tengo hambre.', 'I''m hungry.', 'I''m thirsty.', 'I''m sleepy.', 'I''m happy.'),
('Tengo sed.', 'I''m thirsty.', 'I''m hungry.', 'I''m tired.', 'I''m excited.'),
('Perdón.', 'Excuse me.', 'Please.', 'Thank you.', 'Goodbye.'),
('Lo siento.', 'I''m sorry.', 'You''re welcome.', 'Excuse me.', 'See you later.'),
('Muy bien.', 'Very well.', 'Very bad.', 'Not good.', 'See you.'),
('Hasta luego.', 'See you later.', 'Good night.', 'Hello.', 'Good morning.'),
('Buenos tardes.', 'Good afternoon.', 'Good morning.', 'Good night.', 'Goodbye.'),
('Bienvenidos.', 'Welcome.', 'Thank you.', 'See you later.', 'Goodbye.'),
('Hasta mañana.', 'See you tomorrow.', 'Good night.', 'See you later.', 'Good morning.'),
('Nos vemos.', 'See you.', 'Thank you.', 'I''m sorry.', 'Goodbye.'),
('Por supuesto.', 'Of course.', 'Maybe.', 'Never.', 'Why not?'),
('Hasta pronto.', 'See you soon.', 'Good night.', 'See you tomorrow.', 'Hello.'),
('Disculpa.', 'Sorry.', 'Thank you.', 'See you later.', 'Good night.'),
('Te amo.', 'I love you.', 'I need help.', 'I am happy.', 'I am sorry.');
