DROP TABLE IF EXISTS odd_one_out;

CREATE TABLE odd_one_out (
    categories_id INT GENERATED ALWAYS AS IDENTITY,
    color VARCHAR(25) NOT NULL,
    animal VARCHAR(25) NOT NULL,
    country VARCHAR(25) NOT NULL,
    food_drink VARCHAR(25),
    relations VARCHAR(25),
    PRIMARY KEY (categories_id)
);

INSERT INTO odd_one_out (color, animal, country, food_drink, relations) VALUES
('Rosa', 'Perro', 'Francia', 'Hamburguesa', 'Madre'),
('Negro', 'Gato', 'Inglaterra', 'Papas fritas', 'Padre'),
('Marrón', 'Elefante', 'Italia', 'Chocolate', 'Hermano'),
('Blanco', 'Oveja', 'Alemania', 'Pizza', 'Primo/Prima'),
('Gris', 'Tigre', 'España', 'Pollo', 'Tía'),
('Púrpura', 'Pez', 'Grecia', 'Galleta', 'Tío'),
('Amarillo', 'Tortuga', 'Escocia', 'Leche', 'Abuela'),
('Verde', 'Oso', 'Estados Unidos de América', 'Ensalada', 'Abuelo');