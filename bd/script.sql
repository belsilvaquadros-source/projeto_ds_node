--
CREATE DATABASE projeto_backend_angela;
--
USE projeto_backend_angela;
--
CREATE TABLE usuarios (
    id_Usuario INT PRIMARY KEY,
    nome VARCHAR(100)not null,
    email varchar(100)not null unique,
    telefone varchar(20),
    cep (9),
    endereco varchar(150),
    numero varchar(10),
    complemento varchar(100),
    bairro varchar(100),
    cidade varchar(100),
    estado(2),
    login VARCHAR(50) not null unique,
    senha VARCHAR(255)not null
);
--

insert into usuarios Values (
NULL, 'Geovanna', 'Geov4nn4', '12356'
);

SELECT *
    FROM usuarios;
