TRUNCATE marks RESTART IDENTITY;
TRUNCATE students RESTART IDENTITY;
TRUNCATE subjects RESTART IDENTITY;
TRUNCATE odd_one_out RESTART IDENTITY;
TRUNCATE spanish_translate RESTART IDENTITY;

INSERT INTO subjects (subject_name, subject_code) 
VALUES
  ('Spanish Basics', 'SPAN101'),
  ('Intermediate Spanish', 'SPAN201'),
  ('Advanced Spanish', 'SPAN301');

INSERT INTO students (firstname, lastname, student_login, password) 
VALUES
  ('Alice', 'Smith', 'alice123', 'hashedpassword1'),
  ('Bob', 'Johnson', 'bob456', 'hashedpassword2'),
  ('Charlie', 'Brown', 'charlie789', 'hashedpassword3');

INSERT INTO marks (student_id, subject_id, total_marks)
VALUES
  (1, 1, 0),
  (2, 2, 0),
  (3, 3, 0);

INSERT INTO odd_one_out (question, correct_answer, option_1, option_2, option_3) 
VALUES
  ('Which word does not belong?', 'perro', 'gato', 'ratón', 'perro'),
  ('Which is the odd one out?', 'rojo', 'verde', 'azul', 'manzana'),
  ('Pick the odd one', 'montaña', 'río', 'lago', 'correr');

INSERT INTO spanish_translate (question, english, fool_1, fool_2, fool_3, level) 
VALUES
  ('¿Cómo estás?', 'How are you?', 'Where are you?', 'What time is it?', 'Who are you?', 1),
  ('¿Dónde vives?', 'Where do you live?', 'Where do you work?', 'What do you like?', 'How old are you?', 1),
  ('¿Cuál es tu comida favorita?', 'What is your favorite food?', 'Where do you live?', 'How are you?', 'What is your hobby?', 2);
