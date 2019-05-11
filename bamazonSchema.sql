DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Alterna HairCare Bamboo Smooth Anti-Frizz Shampoo", "Hair Care", 22.00, 2),
       ("Alterna HairCare Bamboo Smooth Anti-Frizz Conditioner", "Hair Care", 24.00, 14),
       ("Biore Self Heating One Minute Mask - Natural Charcoal - 4 ct", "Beauty", 5.99, 56),
       ("Biore Charcoal Pore Strip - 18 ct", "Beauty", 13.99, 18),
       ("Cinnamon Chex Gluten-Free Cereal", "Grocery", 3.95, 24),
       ("Simply Orange Pulp Free Juice", "Beverages", 6.19, 12),
       ("Cuties Clementines - 3lb Bag", "Produce", 4.49, 20),
       ("Band-Aid Brand Adhesive Bandages, Wonder Woman", "First Aid", 3.29, 4),
       ("Crest + Scope Outlast Complete Whitening Toothpaste Mint", "Oral Care", 4.99, 32),
       ("Oral-B Complete Deep Clean Toothbrush Soft", "Oral Care", 2.99, 64),
       ("Rubrik's Cube 3X3", "Toy", 9.59, 8),
       ("Sharp Objects by Gillian Flynn", "Ficiton", 7.99, 6),
       ("Mary Poppins Returns (Blue Ray + DVD + Digital)", "Ficiton", 24.99, 48),
       ("Ariana Grande thank u, next (CD)", "Ficiton", 13.99, 36);