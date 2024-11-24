-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 24, 2024 at 04:31 AM
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

INSERT INTO `credenciais` (`usuario`, `hash`, `salt`, `cod_acesso`) VALUES
('admin', '1234', 0, 1),
('carlos', 'ijkl', 0, 2),
('joao', 'abcd', 0, 2),
('maria', 'efgh', 0, 2),
('supervisor', '5678', 0, 1);

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

INSERT INTO `itens` (`cod_lote`, `cod_compra`, `quantidade`) VALUES
(1, 1, 10),
(2, 2, 15),
(3, 3, 5),
(4, 4, 8),
(5, 5, 12);

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
(5, 5, 5, 5, 5, 'Ração para cães', 'Ração premium', 20, 15.00000);

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

INSERT INTO `telefone` (`id_dono`, `tipo_tel`, `tipo_dono`, `telefone`) VALUES
(0, 1, 'null', '(62) 44124-3784'),
(0, 1, 'null', '(79) 30307-6901'),
(0, 4, 'null', '(85) 43382-0062'),
(0, 3, 'null', '(21) 10482-0060'),
(0, 2, 'null', '(34) 80083-4239');

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
