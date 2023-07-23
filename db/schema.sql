DROP DATABASE IF EXISTS employees_db;


CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department(
    id INT primary key auto_increment,
    name VARCHAR(30)
);
CREATE TABLE role( 
    id INT primary key auto_increment,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT 
);
CREATE TABLE employees( 
    id INT primary key auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    role_id INT 
);

INSERT INTO department(name)
VALUES('engineering'), ('management'), ('legal');
ALTER TABLE department SET name WHERE department;

INSERT INTO role(title, salary, department_id)
VALUES('engineer', 80000, 1), ('manager', 70000, 2), ('legal', 120000, 3);
ALTER TABLE role SET title WHERE role;

INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES('John', 'Doe', NULL, 2),('Jane', 'Doe', 1, 1), ('Millie', 'Jonhns', 2, 3);
ALTER TABLE employees SET role WHERE role_id;
