<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QuickMart | Painel de Administrador </title>
    <link rel="stylesheet" href="/quickmart/assets/css/admin.css">
</head>
<body>
    <div class="container">
        <!-- Menu lateral -->
        <div class="sidebar" id="sidebar">
            <div class="menu-toggle-container">
                <span class="menu-text">Tabelas</span>
            </div>
            <hr class="separator">
            <ul class="menu-list">
                <li class="menu-item" id="produto">
                    <span class="menu-icon"></span>
                    <span class="menu-text">Produto</span>
                </li>
                <li class="menu-item" id="categoria">
                    <span class="menu-icon"></span>
                    <span class="menu-text">Categoria</span>
                </li>
                <li class="menu-item" id="cliente">
                    <span class="menu-icon"></span>
                    <span class="menu-text">Cliente</span>
                </li>
                <li class="menu-item" id="fabricante">
                    <span class="menu-icon"></span>
                    <span class="menu-text">Fabricante</span>
                </li>
                <li class="menu-item" id="credenciais">
                    <span class="menu-icon"></span>
                    <span class="menu-text">Credenciais</span>
                </li>
                <li class="menu-item" id="funcionario">
                    <span class="menu-icon"></span>
                    <span class="menu-text">Funcionário</span>
                </li>
            </ul>

            <!-- Nível de acesso e permissões -->
            <div class="access-info">
                <p class="access-title">Nível de acesso: Admin</p>
                <p class="permissions-title">Permissões: Inserir, Alterar, Excluir</p>
            </div>
        </div>

        <!-- Cabeçalho -->
        <header class="header" id="header">
            <div class="header-left">
                <span class="project-title">QuickMart</span>
            </div>
            <div class="header-right">
                <button class="logout-button">Log Out</button>
                <span class="user-greeting">Olá, Enzo</span>
                <span class="user-icon">👤</span>
            </div>
        </header>

        <!-- Seção Central -->
        <div class="main-content">
            <!-- Retângulo com Tabela: Produto e botão Novo Registro -->
            <div class="table-header">
                <span>Tabela: Produto</span>
                <button class="new-record-btn">Novo Registro</button>
            </div>

            <!-- Parte do HTML para a pesquisa -->
<div class="search-box">
    <div class="search-content">
        <input class="search-input" type="text"> 
        <button class="search-btn">Pesquisar</button> 
    </div>
</div>

        </div>

        <!-- Seta de expansão/contração fora do menu lateral -->
        <button class="expand-btn" id="expand-btn">&#x2192;</button>
    </div>

    <script>
        const menuToggleBtn = document.getElementById('expand-btn');
        const sidebar = document.getElementById('sidebar');
        const header = document.getElementById('header');
        const menuItems = document.querySelectorAll('.menu-item');

        menuToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            header.classList.toggle('expanded');
            menuToggleBtn.innerHTML = sidebar.classList.contains('collapsed') ? "&#x2190;" : "&#x2192;"; // muda a seta
        });

        // Adicionando evento para destacar item de menu
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(i => i.classList.remove('active')); // Remove a seleção de outros itens
                item.classList.add('active'); // Marca o item clicado como ativo
            });
        });
    </script>
</body>
</html>
