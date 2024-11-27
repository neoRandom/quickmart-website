-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quickmart`
--
CREATE DATABASE IF NOT EXISTS `quickmart` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `quickmart`;

--
-- Dumping data for table `cargo`
--

INSERT INTO `cargo` (`cod_cargo`, `descricao`, `salario`) VALUES
(1, 'Gerente', 6770.00000),
(2, 'Supervisor', 3530.00000),
(3, 'Padeiro', 2370.00000),
(4, 'Açougueiro', 2392.00000),
(5, 'Caixa', 1825.00000);

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`cod_cate`, `cod_promo_cate`, `descricao`) VALUES
(1, 1, 'Bebidas'),
(2, 1, 'Alimentos'),
(3, 2, 'Limpeza'),
(4, 2, 'Higiene'),
(5, 2, 'Pet Shop'),
(6, 3, 'Eletrônicos'),
(7, 3, 'Móveis'),
(8, 4, 'Decoração'),
(9, 4, 'Eletrodomésticos'),
(10, 5, 'Roupas'),
(11, 5, 'Calçados'),
(12, 6, 'Livros'),
(13, 6, 'Papelaria'),
(14, 7, 'Brinquedos'),
(15, 7, 'Esportes'),
(16, 8, 'Ferramentas'),
(17, 8, 'Automotivo'),
(18, 9, 'Jardinagem'),
(19, 9, 'Saúde'),
(20, 10, 'Informática');

--
-- Dumping data for table `classificacao`
--

INSERT INTO `classificacao` (`cod_classific`, `descricao`) VALUES
(1, 'Livre'),
(2, 'Acima de 10'),
(3, 'Acima de 12'),
(4, 'Acima de 14'),
(5, 'Acima de 16'),
(6, 'Acima de 18');

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nome_cli`, `data_nasc`, `cpf`, `rg`, `endereco`) VALUES
(1, 'Renata Schneider', '1994-10-27', '762.391.772-00', '23.763.927-2', 'Rua das Laranjeiras, 786'),
(2, 'Lucas Alves Rivera Tavares', '1997-07-15', '826.410.529-00', '93.652.302-5', 'Av. Soares Garcia Júnior, 900'),
(3, 'Carolina Ramires de Souza', '2000-04-09', '631.043.268-00', '91.528.438-1', 'Rua Cruz Vermelha, 365'),
(4, 'Milene Fernandes Dantas de Jesus', '1986-01-06', '907.612.434-00', '16.797.909-6', 'Av. Chamas Azuis, 571'),
(5, 'Rafael Luz de Mendes', '1962-11-02', '975.325.428-00', '14.482.676-1', 'Rua Recanto dos Sabiás, 240'),
(6, 'Amanda Costa Pereira', '1993-03-14', '983.461.720-00', '15.782.496-4', 'Rua Primavera, 123'),
(7, 'João Victor Monteiro', '1988-09-30', '817.392.654-00', '21.984.376-5', 'Av. Principal, 456'),
(8, 'Fernanda Oliveira Santos', '1975-05-11', '902.674.982-00', '12.786.984-3', 'Rua Esperança, 789'),
(9, 'Carlos Eduardo Martins', '1990-12-21', '783.205.416-00', '32.489.875-6', 'Travessa dos Girassóis, 852'),
(10, 'Beatriz Nogueira Lima', '1998-02-18', '605.948.327-00', '28.567.903-4', 'Rua Jacarandá, 300'),
(11, 'Gabriel Almeida Souza', '2002-07-07', '764.215.849-00', '22.987.321-5', 'Alameda das Flores, 19'),
(12, 'Mariana Barros Silva', '1982-08-09', '861.327.548-00', '34.762.491-8', 'Rua Nova Esperança, 675'),
(13, 'Fábio Lima Barbosa', '1995-03-22', '712.904.638-00', '27.394.807-2', 'Av. Das Acácias, 105'),
(14, 'Ana Clara Fontes', '2003-11-11', '893.261.572-00', '20.374.986-1', 'Rua dos Pinheiros, 47'),
(15, 'Vinícius Ramos Teixeira', '1978-06-30', '684.917.283-00', '19.482.765-0', 'Praça da Liberdade, 901');

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`cod_compra`, `id_func`, `id_cliente`, `data_compra`, `metodo_pag`, `preco_bruto`, `valor_desconto`) VALUES
(1, 1, 1, '2024-09-01 10:00:00', 1, 150.00000, 10.00000),
(2, 1, 2, '2024-09-02 11:00:00', 2, 200.00000, 20.00000),
(3, 2, 3, '2024-09-03 12:00:00', 1, 250.00000, 15.00000),
(4, 2, 1, '2024-09-04 13:00:00', 2, 300.00000, 25.00000),
(5, 3, 4, '2024-09-05 14:00:00', 1, 350.00000, 30.00000),
(6, 4, 5, '2024-09-06 15:00:00', 3, 400.00000, 35.00000),
(7, 5, 6, '2024-09-07 16:00:00', 4, 450.00000, 40.00000),
(8, 1, 7, '2024-09-08 17:00:00', 2, 120.00000, 10.00000),
(9, 2, 8, '2024-09-09 18:00:00', 1, 220.00000, 15.00000),
(10, 3, 9, '2024-09-10 19:00:00', 5, 320.00000, 25.00000),
(11, 4, 10, '2024-09-11 09:30:00', 6, 180.00000, 12.00000),
(12, 5, 11, '2024-09-12 10:45:00', 7, 275.00000, 22.00000),
(13, 1, 12, '2024-09-13 12:15:00', 8, 350.00000, 30.00000),
(14, 2, 13, '2024-09-14 14:00:00', 3, 290.00000, 20.00000),
(15, 3, 14, '2024-09-15 16:30:00', 4, 410.00000, 35.00000),
(16, 4, 15, '2024-09-16 18:15:00', 5, 360.00000, 25.00000),
(17, 5, 16, '2024-09-17 09:45:00', 1, 270.00000, 18.00000),
(18, 1, 17, '2024-09-18 11:15:00', 2, 190.00000, 12.00000),
(19, 2, 18, '2024-09-19 12:45:00', 6, 220.00000, 15.00000),
(20, 3, 19, '2024-09-20 14:15:00', 7, 310.00000, 28.00000),
(21, 4, 20, '2024-09-21 15:30:00', 8, 500.00000, 40.00000),
(22, 5, 21, '2024-09-22 16:45:00', 3, 180.00000, 10.00000),
(23, 1, 22, '2024-09-23 18:00:00', 4, 240.00000, 18.00000),
(24, 2, 23, '2024-09-24 19:30:00', 5, 280.00000, 20.00000),
(25, 3, 24, '2024-09-25 20:00:00', 1, 450.00000, 35.00000),
(26, 3, 32, '2024-09-26 10:00:00', 6, 380.00000, 25.00000),
(27, 1, 18, '2024-09-27 11:30:00', 2, 290.00000, 20.00000),
(28, 4, 25, '2024-09-28 12:15:00', 7, 410.00000, 30.00000),
(29, 2, 5, '2024-09-29 14:45:00', 3, 150.00000, 10.00000),
(30, 5, 8, '2024-09-30 16:30:00', 8, 600.00000, 50.00000),
(31, 4, 12, '2024-10-01 09:00:00', 4, 200.00000, 15.00000),
(32, 2, 30, '2024-10-02 10:30:00', 1, 350.00000, 20.00000),
(33, 3, 40, '2024-10-03 11:45:00', 5, 280.00000, 18.00000),
(34, 1, 14, '2024-10-04 13:15:00', 6, 320.00000, 22.00000),
(35, 5, 9, '2024-10-05 15:00:00', 7, 450.00000, 35.00000),
(36, 3, 22, '2024-10-06 16:15:00', 8, 500.00000, 40.00000),
(37, 4, 3, '2024-10-07 17:45:00', 2, 190.00000, 12.00000),
(38, 2, 28, '2024-10-08 18:30:00', 1, 220.00000, 15.00000),
(39, 5, 6, '2024-10-09 19:15:00', 3, 270.00000, 20.00000),
(40, 1, 17, '2024-10-10 09:45:00', 4, 380.00000, 25.00000),
(41, 4, 10, '2024-10-11 11:15:00', 7, 310.00000, 28.00000),
(42, 2, 21, '2024-10-12 12:30:00', 5, 290.00000, 20.00000),
(43, 3, 2, '2024-10-13 14:00:00', 8, 250.00000, 15.00000),
(44, 5, 36, '2024-10-14 15:45:00', 6, 340.00000, 22.00000),
(45, 1, 13, '2024-10-15 16:30:00', 1, 290.00000, 18.00000),
(46, 2, 7, '2024-10-16 17:15:00', 3, 460.00000, 30.00000),
(47, 4, 26, '2024-10-17 18:00:00', 2, 380.00000, 25.00000),
(48, 3, 11, '2024-10-18 19:30:00', 4, 220.00000, 15.00000),
(49, 5, 19, '2024-10-19 20:15:00', 7, 280.00000, 20.00000),
(50, 1, 4, '2024-10-20 21:00:00', 8, 510.00000, 40.00000);


--
-- Dumping data for table `credenciais`
--

INSERT INTO `credenciais` (`cod_credencial`, `usuario`, `hash`, `salt`, `cod_acesso`) VALUES
(1, 'admin', '326a3b68cad9f7178dcebf3792f1244680270e25eaf188cdbf0616686f5834c9', 3721619912, 1),
(2, 'carlos', '005c19658919186b85618c5870463eec8d9b8c1a9d00208a5352891ba5bbe086', 346033364, 2),
(3, 'joao', '9201689b31a58acab182adf1359103b598ffe665d0f28376fd1cf060f2c2ecfd', 1518285939, 2),
(4, 'maria', 'e5e088a0b66163a0a26a5e053d2a4496dc16ab6e0e3dd1adf2d16aa84a078c9d', 1852754427, 2),
(5, 'supervisor', 'f8638b979b2f4f793ddb6dbd197e0ee25a7a6ea32b0ae22f5e3c5d119d839e75', 3976280539, 1);

--
-- Dumping data for table `expediente`
--

INSERT INTO `expediente` (`cod_expediente`, `hora_inicio`, `hora_fim`) VALUES
(1, '06:00:00', '10:59:00'),
(2, '11:00:00', '16:59:00'),
(3, '17:00:00', '22:59:00'),
(4, '09:30:00', '17:30:00'),
(5, '14:00:00', '22:59:00');

--
-- Dumping data for table `fabricante`
--

INSERT INTO `fabricante` (`id_fabric`, `nome_fabric`, `email`, `cnpj`, `website_url`) VALUES
(1, 'Fabrica A', 'contato@fabricaa.com', '12.345.678/0001-90', 'www.fabricaa.com'),
(2, 'Fabrica B', 'contato@fabricab.com', '98.765.432/0001-10', 'www.fabricab.com'),
(3, 'Fabrica C', 'contato@fabricac.com', '54.321.987/0001-20', 'www.fabricac.com'),
(4, 'Fabrica D', 'contato@fabricad.com', '23.456.789/0001-30', 'www.fabricad.com'),
(5, 'Fabrica E', 'contato@fabricae.com', '11.111.111/0001-40', 'www.fabricae.com');

--
-- Dumping data for table `funcionario`
--

INSERT INTO `funcionario` (`id_func`, `nome_func`, `data_nasc`, `cpf`, `rg`, `endereco`, `cod_cargo`, `cod_expediente`) VALUES
(1, 'Marceline Alcântara dos Santos', '1995-05-13', '710.263.961-00', '58.033.931-9', 'Av. Moita Bonita, 325', 4, 2),
(2, 'Jean Lucca Campos', '1997-03-22', '736.924.815-00', '47.662.086-4', 'Rua Barro Branco, 544', 5, 3),
(3, 'Bartolomeu Silva de Azevedo', '1967-12-01', '933.625.591-00', '87.462.913-1', 'Av. Presidente Alcântara Machado, 190', 1, 4),
(4, 'Irene Alves Rodrigues', '1984-09-09', '572.328.196-00', '26.283.758-9', 'Rua Alfeneiros, 700', 2, 5),
(5, 'Ricardo Moreira Salles', '1980-06-24', '880.283.116-00', '75.828.326-6', 'Rua Milton Leite, 648', 3, 1);

--
-- Dumping data for table `itens`
--

INSERT INTO `itens` (`cod_item`, `cod_lote`, `cod_compra`, `quantidade`) VALUES
(1, 1, 1, 10),
(2, 2, 2, 15),
(3, 3, 3, 5),
(4, 4, 4, 8),
(5, 5, 5, 12),
(6, 6, 1, 20),
(7, 7, 1, 30),
(8, 8, 2, 25),
(9, 9, 2, 35),
(10, 10, 3, 40),
(11, 11, 3, 50),
(12, 12, 4, 15),
(13, 13, 4, 20),
(14, 14, 5, 25),
(15, 15, 5, 30),
(16, 16, 6, 5),
(17, 17, 6, 10),
(18, 18, 7, 15),
(19, 19, 7, 20),
(20, 20, 8, 10),
(21, 21, 8, 15),
(22, 22, 9, 5),
(23, 23, 9, 7),
(24, 24, 10, 8),
(25, 25, 10, 12),
(26, 26, 11, 18),
(27, 27, 11, 22),
(28, 28, 12, 15),
(29, 29, 12, 18),
(30, 30, 13, 20),
(31, 31, 13, 25),
(32, 32, 14, 10),
(33, 33, 14, 12),
(34, 34, 15, 5),
(35, 35, 15, 8),
(36, 36, 16, 22),
(37, 37, 16, 28),
(38, 38, 17, 20),
(39, 39, 17, 30),
(40, 40, 18, 15),
(41, 6, 18, 12),
(42, 7, 19, 30),
(43, 8, 19, 40),
(44, 9, 20, 35),
(45, 10, 20, 45),
(46, 11, 21, 12),
(47, 12, 21, 8),
(48, 13, 22, 5),
(49, 14, 22, 10),
(50, 15, 23, 25),
(51, 16, 23, 30),
(52, 17, 24, 20),
(53, 18, 24, 10),
(54, 19, 25, 15),
(55, 20, 25, 18),
(56, 21, 26, 20),
(57, 22, 26, 25),
(58, 23, 27, 30),
(59, 24, 27, 40),
(60, 25, 28, 35),
(61, 26, 28, 45),
(62, 27, 29, 12),
(63, 28, 29, 8),
(64, 29, 30, 20),
(65, 30, 30, 30);


--
-- Dumping data for table `lote`
--

INSERT INTO `lote` (`cod_lote`, `cod_prod`, `data_validade`, `data_compra`, `quantidade`) VALUES
(1, 1, '2025-12-31', '2024-01-01', 100),
(2, 2, '2025-06-30', '2024-02-01', 200),
(3, 3, '2025-03-15', '2024-03-01', 150),
(4, 4, '2025-11-20', '2024-04-01', 80),
(5, 5, '2025-05-10', '2024-05-01', 120),
(6, 6, '2025-08-30', '2024-06-01', 90),
(7, 7, '2025-07-20', '2024-07-01', 110),
(8, 8, '2025-09-10', '2024-08-01', 95),
(9, 9, '2025-10-05', '2024-09-01', 130),
(10, 10, '2025-12-15', '2024-10-01', 140),
(11, 11, '2025-05-25', '2024-11-01', 160),
(12, 12, '2025-11-05', '2024-12-01', 105),
(13, 13, '2025-06-25', '2024-01-01', 125),
(14, 14, '2025-02-28', '2024-02-01', 135),
(15, 15, '2025-03-10', '2024-03-01', 115),
(16, 16, '2025-04-15', '2024-04-01', 80),
(17, 17, '2025-07-05', '2024-05-01', 150),
(18, 18, '2025-08-15', '2024-06-01', 110),
(19, 19, '2025-09-25', '2024-07-01', 125),
(20, 20, '2025-10-10', '2024-08-01', 95),
(21, 6, '2025-08-12', '2024-09-01', 105),
(22, 7, '2025-07-30', '2024-10-01', 120),
(23, 8, '2025-09-20', '2024-11-01', 130),
(24, 9, '2025-11-10', '2024-12-01', 140),
(25, 10, '2025-12-05', '2024-01-01', 115),
(26, 11, '2025-03-25', '2024-02-01', 125),
(27, 12, '2025-06-30', '2024-03-01', 135),
(28, 13, '2025-05-10', '2024-04-01', 110),
(29, 14, '2025-02-20', '2024-05-01', 145),
(30, 15, '2025-06-05', '2024-06-01', 120),
(31, 16, '2025-09-15', '2024-07-01', 95),
(32, 17, '2025-08-20', '2024-08-01', 130),
(33, 18, '2025-07-10', '2024-09-01', 110),
(34, 19, '2025-10-01', '2024-10-01', 125),
(35, 20, '2025-11-01', '2024-11-01', 115),
(36, 6, '2025-12-25', '2024-12-01', 120),
(37, 7, '2025-05-30', '2024-01-01', 105),
(38, 8, '2025-08-05', '2024-02-01', 130),
(39, 9, '2025-09-30', '2024-03-01', 115),
(40, 10, '2025-06-20', '2024-04-01', 140);

--
-- Dumping data for table `metodo_pagamento`
--

INSERT INTO `metodo_pagamento` (`cod_pagamento`, `descricao`) VALUES
(1, 'Dinheiro'),
(2, 'Cheque'),
(3, 'Cartão de Crédito'),
(4, 'Cartão de Débito'),
(5, 'Boleto Bancário'),
(6, 'PIX'),
(7, 'Crediário'),
(8, 'Transferência bancária');

--
-- Dumping data for table `nivel_acesso`
--

INSERT INTO `nivel_acesso` (`cod_nivel`, `descricao`) VALUES
(1, 'admin'),
(2, 'caixa');

--
-- Dumping data for table `produto`
--

INSERT INTO `produto` (`cod_prod`, `cod_cate`, `cod_promo_prod`, `cod_classific`, `id_fabric`, `nome`, `descricao`, `estoque`, `preco`) VALUES
(1, 1, 1, 1, 1, 'Refrigerante', 'Refrigerante sabor cola', 50, 5.00000),
(2, 2, 2, 2, 2, 'Bolacha', 'Bolacha de chocolate', 100, 2.50000),
(3, 3, 3, 3, 3, 'Detergente', 'Detergente para lavar louças', 30, 3.75000),
(4, 4, 4, 4, 4, 'Sabonete', 'Sabonete líquido', 80, 4.00000),
(5, 5, 5, 5, 5, 'Ração para cães', 'Ração premium', 20, 15.00000),
(6, 1, 1, 1, 1, 'Suco de Laranja', 'Suco natural de laranja', 60, 6.50000),
(7, 2, 2, 2, 2, 'Biscoito Salgado', 'Biscoito de queijo', 120, 3.25000),
(8, 3, 3, 3, 3, 'Sabão em Pó', 'Sabão em pó para roupas', 40, 10.00000),
(9, 4, 4, 4, 4, 'Shampoo', 'Shampoo para cabelos secos', 90, 8.75000),
(10, 5, 5, 5, 5, 'Ração para Gatos', 'Ração premium para gatos', 25, 18.00000),
(11, 2, 5, 5, 5, 'Achocolatado', 'Achocolatado em pó', 70, 4.50000),
(12, 2, 2, 2, 2, 'Cereal Matinal', 'Cereal integral com mel', 50, 12.50000),
(13, 3, 4, 2, 3, 'Amaciante', 'Amaciante de roupas', 60, 9.00000),
(14, 4, 3, 1, 3, 'Condicionador', 'Condicionador para cabelos', 75, 9.25000),
(15, 5, 2, 2, 5, 'Areia para Gatos', 'Areia sanitária perfumada', 30, 20.00000),
(16, 1, 3, 5, 2, 'Água Mineral', 'Água mineral sem gás', 200, 2.00000),
(17, 2, 3, 2, 2, 'Pão de Forma', 'Pão integral', 100, 7.00000),
(18, 3, 3, 1, 4, 'Esponja de Limpeza', 'Esponja dupla face', 80, 2.50000),
(19, 4, 1, 5, 5, 'Desodorante', 'Desodorante aerosol', 50, 10.00000),
(20, 5, 2, 3, 1, 'Coleira para Cães', 'Coleira ajustável', 15, 25.00000);


--
-- Dumping data for table `promocao_categoria`
--

INSERT INTO `promocao_categoria` (`cod_promo_cate`, `porcentagem`, `data_inicio`, `data_termino`) VALUES
(1, 0.10000, '2024-09-01', '2024-09-30'),
(2, 0.15000, '2024-10-01', '2024-10-31'),
(3, 0.20000, '2024-11-01', '2024-11-30'),
(4, 0.25000, '2024-12-01', '2024-12-31'),
(5, 0.30000, '2025-01-01', '2025-01-31');

--
-- Dumping data for table `promocao_produto`
--

INSERT INTO `promocao_produto` (`cod_promo_prod`, `porcentagem`, `data_inicio`, `data_termino`) VALUES
(1, 0.05000, '2024-09-01', '2024-09-30'),
(2, 0.10000, '2024-10-01', '2024-10-31'),
(3, 0.15000, '2024-11-01', '2024-11-30'),
(4, 0.20000, '2024-12-01', '2024-12-31'),
(5, 0.25000, '2025-01-01', '2025-01-31');

--
-- Dumping data for table `telefone`
--

INSERT INTO `telefone` (`id_tel`, `id_dono`, `tipo_tel`, `tipo_dono`, `telefone`) VALUES
(1, 0, 1, 'null', '(62) 44124-3784'),
(2, 0, 1, 'null', '(79) 30307-6901'),
(3, 0, 4, 'null', '(85) 43382-0062'),
(4, 0, 3, 'null', '(21) 10482-0060'),
(5, 0, 2, 'null', '(34) 80083-4239');

--
-- Dumping data for table `tipo_telefone`
--

INSERT INTO `tipo_telefone` (`id_tipo`, `descricao`) VALUES
(1, 'Pessoal'),
(2, 'Empresarial'),
(3, 'Fixo Domiciliar'),
(4, 'Fixo Empresarial');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
