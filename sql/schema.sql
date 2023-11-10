-- Banco de dados e tabelas aqui

-- 0 Remover database se existir:
DROP DATABASE IF EXISTS pdv;
-- 1 - Criar banco de dados "pdv":
CREATE DATABASE pdv;

-- Criar tabela usuarios:
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

-- Criar tabela categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

-- Inserir dados na tabela categorias
INSERT INTO categorias
(descricao)
VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'), 
('Mercado'), 
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque TEXT NOT NULL,
    valor NUMERIC NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    cep TEXT NULL,
    rua TEXT NULL,
    numero TEXT NULL,
    bairro TEXT NULL,
    cidade TEXT NULL,
    estado TEXT NULL
);