DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS odd_one_out;
DROP TABLE IF EXISTS spanish_translate;

CREATE TABLE students (
    student_id INT GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    student_login VARCHAR(50) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (student_id)
);

CREATE TABLE marks (
    mark_id INT GENERATED ALWAYS AS IDENTITY,
    student_id INT NOT NULL,
    total_marks INT NOT NULL,
    PRIMARY KEY (mark_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

CREATE TABLE subjects (
    subject_id INT GENERATED ALWAYS AS IDENTITY,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY (subject_id)
);

CREATE TABLE odd_one_out (
    categories_id INT GENERATED ALWAYS AS IDENTITY,
    color VARCHAR(25) NOT NULL,
    animal VARCHAR(25) NOT NULL,
    country VARCHAR(25) NOT NULL,
    food_drink VARCHAR(25),
    relations VARCHAR(25),
    PRIMARY KEY (categories_id)
);

CREATE TABLE spanish_translate (
    spanish_id INT GENERATED ALWAYS AS IDENTITY,
    level VARCHAR(30) NOT NULL,
    question VARCHAR(80) NOT NULL,
    english VARCHAR(80),
    fool_1 VARCHAR(80),
    fool_2 VARCHAR(80),
    fool_3 VARCHAR(80)
);


INSERT INTO students (firstName, lastName, student_login, password) VALUES
('Emily', 'Clark', 'emily_clark01', 'securepass1'),
('Liam', 'Miller', 'liam_miller22', 'securepass2'),
('Sophia', 'Davis', 'sophia_davis33', 'securepass3'),
('James', 'Wilson', 'james_wilson44', 'securepass4');

INSERT INTO subjects (subject_name, subject_code) VALUES
('Mathematics', 'MATH101'),
('English Literature', 'ENG202'),
('Physics', 'PHYS303'),
('Geography', 'GEO404'),
('Computer Science', 'CS505');

-- INSERT INTO marks (student_id, subject_id, marks_obtained, total_marks) VALUES
-- (1, 1, 92, 100), -- Emily in Mathematics
-- (1, 3, 75, 100), -- Emily in Physics
-- (2, 2, 81, 100), -- Liam in English Literature
-- (2, 4, 88, 100), -- Liam in Geography
-- (3, 5, 95, 100), -- Sophia in Computer Science
-- (3, 1, 78, 100), -- Sophia in Mathematics
-- (4, 3, 84, 100), -- James in Physics
-- (4, 2, 90, 100); -- James in English Literature

INSERT INTO odd_one_out (color, animal, country, food_drink, relations) VALUES
('Rosa', 'Perro', 'Francia', 'Hamburguesa', 'Madre'),
('Negro', 'Gato', 'Inglaterra', 'Papas fritas', 'Padre'),
('Marrón', 'Elefante', 'Italia', 'Chocolate', 'Hermano'),
('Blanco', 'Oveja', 'Alemania', 'Pizza', 'Primo/Prima'),
('Gris', 'Tigre', 'España', 'Pollo', 'Tía'),
('Púrpura', 'Pez', 'Grecia', 'Galleta', 'Tío'),
('Amarillo', 'Tortuga', 'Escocia', 'Leche', 'Abuela'),
('Verde', 'Oso', 'Estados Unidos de América', 'Ensalada', 'Abuelo');

INSERT INTO spanish_translate (level, question, english, fool_1, fool_2, fool_3) VALUES
('easy', 'Hola.', 'Hello.', 'Goodbye.', 'Please.', 'Yes.'),
('easy', '¿Cómo estás?', 'How are you?', 'What is your name?', 'Where are you?', 'How old are you?'),
('easy', 'Gracias.', 'Thank you.', 'Please.', 'You''re welcome.', 'Good morning.'),
('easy', 'Por favor.', 'Please.', 'Thank you.', 'Goodbye.', 'Hello.'),
('easy', 'Sí.', 'Yes.', 'No.', 'Maybe.', 'Please.'),
('easy', 'No.', 'No.', 'Yes.', 'Hello.', 'Thank you.'),
('easy', 'Buenos días.', 'Good morning.', 'Good night.', 'Hello.', 'Goodbye.'),
('easy', 'Buenas noches.', 'Good night.', 'Good morning.', 'See you later.', 'Goodbye.'),
('easy', '¿Adónde vas?', 'Where are you going?', 'What is your name?', 'How are you?', 'Where do you live?'),
('easy', 'Tengo hambre.', 'I''m hungry.', 'I''m thirsty.', 'I''m sleepy.', 'I''m happy.'),
('easy', 'Tengo sed.', 'I''m thirsty.', 'I''m hungry.', 'I''m tired.', 'I''m excited.'),
('easy', 'Perdón.', 'Excuse me.', 'Please.', 'Thank you.', 'Goodbye.'),
('easy', 'Lo siento.', 'I''m sorry.', 'You''re welcome.', 'Excuse me.', 'See you later.'),
('easy', 'Muy bien.', 'Very well.', 'Very bad.', 'Not good.', 'See you.'),
('easy', 'Hasta luego.', 'See you later.', 'Good night.', 'Hello.', 'Good morning.'),
('easy', 'Buenos tardes.', 'Good afternoon.', 'Good morning.', 'Good night.', 'Goodbye.'),
('easy', 'Bienvenidos.', 'Welcome.', 'Thank you.', 'See you later.', 'Goodbye.'),
('easy', 'Hasta mañana.', 'See you tomorrow.', 'Good night.', 'See you later.', 'Good morning.'),
('easy', 'Nos vemos.', 'See you.', 'Thank you.', 'I''m sorry.', 'Goodbye.'),
('easy', 'Por supuesto.', 'Of course.', 'Maybe.', 'Never.', 'Why not?'),
('easy', 'Hasta pronto.', 'See you soon.', 'Good night.', 'See you tomorrow.', 'Hello.'),
('easy', 'Disculpa.', 'Sorry.', 'Thank you.', 'See you later.', 'Good night.'),
('easy', 'Te amo.', 'I love you.', 'I need help.', 'I am happy.', 'I am sorry.'),
('medium', '¿Cuál es tu nombre?', 'What is your name?', 'What is your book?', 'What is your age?', 'Where do you live?'),
('medium', 'Hablo un poco de español.', 'I speak a little Spanish.', 'I like to dance.', 'I want some water.', 'I need a pen.'),
('medium', '¿Dónde vives?', 'Where do you live?', 'When is your birthday?', 'What do you eat?', 'What time is it?'),
('medium', 'Me gusta la música.', 'I like music.', 'I want to go home.', 'I have a cat.', 'I don''t like coffee.'),
('medium', '¿Qué día es hoy?', 'What day is today?', 'What is your favorite color?', 'Where is the library?', 'What time do you leave?'),
('medium', 'Voy al cine.', 'I''m going to the movies.', 'I''m hungry.', 'I have two brothers.', 'I''m going to the park.'),
('medium', '¿Cómo te llamas?', 'What''s your name?', 'How old are you?', 'Where are you from?', 'What is your address?'),
('medium', 'Estoy cansado.', 'I''m tired.', 'I''m happy.', 'I want to learn Spanish.', 'I''m excited.'),
('medium', '¿Dónde trabajas?', 'Where do you work?', 'Where do you study?', 'Where do you live?', 'What do you drink?'),
('medium', 'Tengo un perro.', 'I have a dog.', 'I like to swim.', 'I want to go shopping.', 'I have a cat.'),
('medium', '¿A qué hora es la reunión?', 'What time is the meeting?', 'What''s your favorite food?', 'What day is it today?', 'What do you want to buy?'),
('medium', 'Hace frío afuera.', 'It''s cold outside.', 'It''s hot today.', 'I''m hungry.', 'It''s sunny today.'),
('medium', 'Vamos al parque.', 'Let''s go to the park.', 'Let''s eat pizza.', 'Let''s watch TV.', 'Let''s visit the museum.'),
('medium', '¿Cuántos años tienes?', 'How old are you?', 'What''s your name?', 'Where do you live?', 'What do you like to eat?'),
('medium', 'Estoy estudiando español.', 'I''m studying Spanish.', 'I''m going shopping.', 'I have a cat.', 'I''m learning French.'),
('medium', '¿Puedes ayudarme?', 'Can you help me?', 'Can you sing?', 'Can you dance?', 'Can you cook?'),
('medium', 'Tengo sed.', 'I''m thirsty.', 'I''m sleepy.', 'I''m happy.', 'I''m tired.'),
('medium', 'Vivo en Nueva York.', 'I live in New York.', 'I like to travel.', 'I have two sisters.', 'I live in Los Angeles.'),
('medium', '¿Dónde está el baño?', 'Where is the bathroom?', 'What is your name?', 'What do you do?', 'Where is the kitchen?'),
('medium', 'Me gusta bailar.', 'I like to dance.', 'I like to read.', 'I like to cook.', 'I like to sing.'),
('medium', '¿A qué hora sales?', 'What time do you leave?', 'What''s your favorite color?', 'What do you want?', 'What do you like to eat?'),
('medium', 'Hace sol hoy.', 'It''s sunny today.', 'It''s raining today.', 'It''s snowing today.', 'It''s cloudy today.'),
('medium', '¿Cómo te sientes?', 'How do you feel?', 'What do you think?', 'What do you want?', 'Where are you going?'),
('medium', 'Voy a la tienda.', 'I''m going to the store.', 'I''m going to the park.', 'I''m going to the beach.', 'I''m going to the office.'),
('medium', '¿Qué te gusta hacer?', 'What do you like to do?', 'What do you want to eat?', 'What do you need?', 'What do you watch on TV?'),
('medium', 'Ella tiene una bicicleta.', 'She has a bicycle.', 'She likes to swim.', 'She wants to go shopping.', 'She has a car.'),
('medium', '¿Cuántos hermanos tienes?', 'How many siblings do you have?', 'How old are you?', 'What''s your favorite color?', 'Where do you live?'),
('medium', 'Estoy enfermo.', 'I''m sick.', 'I''m happy.', 'I''m hungry.', 'I''m thirsty.'),
('medium', '¿Qué te duele?', 'What hurts?', 'What do you want?', 'What''s your name?', 'Where are you going?'),
('medium', 'Tengo un examen mañana.', 'I have an exam tomorrow.', 'I have a party tomorrow.', 'I have a job interview tomorrow.', 'I have a dentist appointment tomorrow.'),
('medium', '¿Cuál es tu comida favorita?', 'What is your favorite food?', 'What is your favorite color?', 'What is your favorite movie?', 'What is your favorite book?'),
('hard', 'A pesar de la lluvia, decidimos salir.', 'Despite the rain, we decided to go out.', 'It started raining outside.', 'We stayed home.', 'It was sunny today.'),
('hard', 'El concierto fue cancelado debido a problemas técnicos.', 'The concert was canceled due to technical issues.', 'The concert was amazing.', 'We missed the concert.', 'The concert was postponed.'),
('hard', 'Tengo que presentar mi informe mañana a primera hora.', 'I have to present my report first thing tomorrow.', 'I finished my report yesterday.', 'I will submit the report next week.', 'I don''t have a report.'),
('hard', 'El puente colapsó por falta de mantenimiento.', 'The bridge collapsed due to lack of maintenance.', 'The bridge is newly built.', 'They painted the bridge.', 'The bridge was repaired.'),
('hard', 'Ella logró superar todos los obstáculos en su camino.', 'She managed to overcome all obstacles in her path.', 'She failed the task.', 'She gave up halfway.', 'She struggled without success.'),
('hard', '¿Cuánto tiempo te llevará terminar el proyecto?', 'How long will it take you to finish the project?', 'When will you start the project?', 'Who is helping with the project?', 'Is the project already finished?'),
('hard', 'La decisión del juez fue considerada injusta por muchos.', 'The judge''s decision was considered unfair by many.', 'The decision was celebrated by everyone.', 'No one knew about the decision.', 'The decision was not controversial.'),
('hard', 'Este restaurante ofrece una experiencia gastronómica única.', 'This restaurant offers a unique dining experience.', 'The food is very basic.', 'The service is poor.', 'The restaurant is closed.'),
('hard', 'La obra de teatro recibió excelentes críticas.', 'The play received excellent reviews.', 'The play was not well-received.', 'The play was cancelled.', 'The audience left early.'),
('hard', 'Es fundamental mantener una comunicación abierta y honesta.', 'It''s essential to maintain open and honest communication.', 'Avoid communication as much as possible.', 'Keep communication secret.', 'Lie to avoid conflicts.'),
('hard', 'La situación política del país es bastante inestable.', 'The political situation of the country is quite unstable.', 'The political situation is stable.', 'The government has no problems.', 'There is peace everywhere.'),
('hard', 'Ellos se mudaron a una ciudad más tranquila.', 'They moved to a quieter city.', 'They stayed in the same city.', 'They moved to a busier city.', 'They prefer noise and traffic.'),
('hard', 'El científico propuso una teoría innovadora.', 'The scientist proposed an innovative theory.', 'The theory was outdated.', 'The scientist had no new ideas.', 'The theory was simple.'),
('hard', 'Es importante conservar los recursos naturales.', 'It is important to conserve natural resources.', 'Wasting resources is necessary.', 'Resources are unlimited.', 'We don''t need resources.'),
('hard', 'El clima cambiante afecta las cosechas.', 'The changing climate affects crops.', 'The climate is stable.', 'Crops are not affected.', 'Crops are thriving without issues.');




