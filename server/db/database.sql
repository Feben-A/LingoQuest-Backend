DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS subjects;

CREATE TABLE students (
    student_id INT GENERATED ALWAYS AS IDENTITY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    student_login VARCHAR(50) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (student_id)
);

CREATE TABLE subjects (
    subject_id INT GENERATED ALWAYS AS IDENTITY,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY (subject_id)
);

CREATE TABLE marks (
    mark_id INT GENERATED ALWAYS AS IDENTITY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    marks_obtained INT NOT NULL,
    total_marks INT NOT NULL,
    PRIMARY KEY (mark_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
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

INSERT INTO marks (student_id, subject_id, marks_obtained, total_marks) VALUES
(1, 1, 92, 100), -- Emily in Mathematics
(1, 3, 75, 100), -- Emily in Physics
(2, 2, 81, 100), -- Liam in English Literature
(2, 4, 88, 100), -- Liam in Geography
(3, 5, 95, 100), -- Sophia in Computer Science
(3, 1, 78, 100), -- Sophia in Mathematics
(4, 3, 84, 100), -- James in Physics
(4, 2, 90, 100); -- James in English Literature
