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
(5, 2, 'Pet Shop');

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
(5, 'Rafael Luz de Mendes', '1962-11-02', '975.325.428-00', '14.482.676-1', 'Rua Recanto dos Sabiás, 240');

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`cod_compra`, `id_func`, `id_cliente`, `data_compra`, `metodo_pag`, `preco_bruto`, `valor_desconto`) VALUES
(1, 1, 1, '2024-09-01 10:00:00', 1, 150.00000, 10.00000),
(2, 1, 2, '2024-09-02 11:00:00', 2, 200.00000, 20.00000),
(3, 2, 3, '2024-09-03 12:00:00', 1, 250.00000, 15.00000),
(4, 2, 1, '2024-09-04 13:00:00', 2, 300.00000, 25.00000),
(5, 3, 4, '2024-09-05 14:00:00', 1, 350.00000, 30.00000);

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
(5, 5, 5, 12);

--
-- Dumping data for table `lote`
--

INSERT INTO `lote` (`cod_lote`, `cod_prod`, `data_validade`, `data_compra`, `quantidade`) VALUES
(1, 1, '2025-12-31', '2024-01-01', 100),
(2, 2, '2025-06-30', '2024-02-01', 200),
(3, 3, '2025-03-15', '2024-03-01', 150),
(4, 4, '2025-11-20', '2024-04-01', 80),
(5, 5, '2025-05-10', '2024-05-01', 120);

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
(11, 6, 6, 6, 6, 'Achocolatado', 'Achocolatado em pó', 70, 4.50000),
(12, 7, 7, 7, 7, 'Cereal Matinal', 'Cereal integral com mel', 50, 12.50000),
(13, 8, 8, 8, 8, 'Amaciante', 'Amaciante de roupas', 60, 9.00000),
(14, 9, 9, 9, 9, 'Condicionador', 'Condicionador para cabelos', 75, 9.25000),
(15, 10, 10, 10, 10, 'Areia para Gatos', 'Areia sanitária perfumada', 30, 20.00000),
(16, 11, 11, 11, 11, 'Água Mineral', 'Água mineral sem gás', 200, 2.00000),
(17, 12, 12, 12, 12, 'Pão de Forma', 'Pão integral', 100, 7.00000),
(18, 13, 13, 13, 13, 'Esponja de Limpeza', 'Esponja dupla face', 80, 2.50000),
(19, 14, 14, 14, 14, 'Desodorante', 'Desodorante aerosol', 50, 10.00000),
(20, 15, 15, 15, 15, 'Coleira para Cães', 'Coleira ajustável', 15, 25.00000),
(21, 16, 16, 16, 16, 'Chá Verde', 'Chá verde em sachês', 40, 5.75000),
(22, 17, 17, 17, 17, 'Barra de Cereais', 'Barra de cereais com castanhas', 90, 3.50000),
(23, 18, 18, 18, 18, 'Sabão Líquido', 'Sabão líquido concentrado', 50, 11.00000),
(24, 19, 19, 19, 19, 'Creme Dental', 'Creme dental de menta', 100, 5.50000),
(25, 20, 20, 20, 20, 'Brinquedo para Cães', 'Bola de borracha', 20, 15.00000),
(26, 21, 21, 21, 21, 'Café', 'Café torrado e moído', 80, 15.00000),
(27, 22, 22, 22, 22, 'Molho de Tomate', 'Molho de tomate tradicional', 90, 4.00000),
(28, 23, 23, 23, 23, 'Esfregão', 'Esfregão de limpeza', 30, 18.50000),
(29, 24, 24, 24, 24, 'Sabonete em Barra', 'Sabonete de lavanda', 70, 2.75000),
(30, 25, 25, 25, 25, 'Cama para Cães', 'Cama acolchoada', 10, 80.00000),
(31, 26, 26, 26, 26, 'Chá de Camomila', 'Chá de camomila em sachês', 40, 6.00000),
(32, 27, 27, 27, 27, 'Bolinho Recheado', 'Bolinho de chocolate com recheio', 120, 2.75000),
(33, 28, 28, 28, 28, 'Água Sanitária', 'Água sanitária 1 litro', 50, 3.50000),
(34, 29, 29, 29, 29, 'Fio Dental', 'Fio dental de 50m', 100, 7.50000),
(35, 30, 30, 30, 30, 'Osso para Cães', 'Osso mastigável', 30, 12.00000),
(36, 31, 31, 31, 31, 'Vinagre', 'Vinagre de maçã', 60, 4.25000),
(37, 32, 32, 32, 32, 'Macarrão', 'Macarrão espaguete', 80, 5.00000),
(38, 33, 33, 33, 33, 'Rodo de Limpeza', 'Rodo de plástico', 20, 9.00000),
(39, 34, 34, 34, 34, 'Protetor Solar', 'Protetor solar fator 30', 40, 25.00000),
(40, 35, 35, 35, 35, 'Petisco para Gatos', 'Petisco sabor peixe', 50, 8.00000),
(41, 36, 36, 36, 36, 'Açúcar', 'Açúcar refinado', 100, 3.75000),
(42, 37, 37, 37, 37, 'Molho de Soja', 'Molho de soja light', 70, 6.00000),
(43, 38, 38, 38, 38, 'Pá de Lixo', 'Pá de lixo plástica', 30, 12.50000),
(44, 39, 39, 39, 39, 'Hidratante Corporal', 'Hidratante de aveia', 40, 20.00000),
(45, 40, 40, 40, 40, 'Arranhador para Gatos', 'Arranhador pequeno', 10, 50.00000),
(46, 41, 41, 41, 41, 'Bebida Energética', 'Energético sabor limão', 60, 7.50000),
(47, 42, 42, 42, 42, 'Farinha de Trigo', 'Farinha de trigo integral', 80, 4.50000),
(48, 43, 43, 43, 43, 'Escova de Limpeza', 'Escova para azulejos', 20, 9.75000),
(49, 44, 44, 44, 44, 'Lâmina de Barbear', 'Lâmina descartável', 50, 12.00000),
(50, 45, 45, 45, 45, 'Antipulgas', 'Antipulgas para cães', 15, 35.00000);


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
