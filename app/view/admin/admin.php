<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QuickMart | Painel de Administrador </title>
    <link rel="stylesheet" href="/quickmart/assets/css/main.css">
    <link rel="stylesheet" href="/quickmart/assets/css/admin.css">
</head>
<body class="bg-[#f3f3f3]">
    <div class="flex flex-col w-screen h-screen overflow-hidden">
        <header 
            class="
                z-50 flex justify-between items-center 
                w-full px-5 py-2 
                bg-primary shadow-md
                *:flex *:items-center
            ">
            <div>
                <img src="/quickmart/assets/images/QuickMart.png" alt="QuickMart">
            </div>
            <div>
                <div class="flex text-white text-lg pr-6">
                    <p class="pr-4 border-r-2">
                        <span>
                            Olá, 
                        </span>
                        <span class="font-bold">
                            <?php echo "Neo" ?>
                        </span>
                    </p>
                    <p class="pl-4">
                        <?php echo "Admin" ?>
                    </p>
                </div>
                <div class="relative">
                    <button 
                        id="dropdown-menu-button"
                        type="button" 
                        class="block h-10 aspect-square"
                        >
                        <img src="/quickmart/assets/images/icon.png" alt="user" width="100%" height="100%">
                    </button>

                    <div id="dropdown-menu" class="hidden absolute top-16 right-0 h-fit w-fit p-2 rounded-md shadow-md">
                        <ul class="flex flex-col gap-2 mt-2">
                            <li>
                                <a href="/quickmart/public/admin/logout">
                                    <div class="
                                            flex items-center gap-4
                                            px-4 py-2
                                            rounded-md hover:bg-neutral-200
                                        ">
                                        <div class="w-4 aspect-square">
                                            <img src="/quickmart/assets/images/logout.png" alt="" width="100%" height="100%">
                                        </div>
                                        <p>
                                            Logout
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

        <main class="relative flex-1">
            <!-- Side Bar -->
            <div id="sidebar" class="z-40 absolute top-0 left-0 w-64 h-full bg-white shadow-md transition-transform duration-700">
                <button
                    type="button" 
                    class="absolute top-2 left-full p-0.5 pl-0 bg-primary rounded-r-md">
                    <svg 
                        viewBox="0 0 24 24" 
                        class="
                            h-6 aspect-square fill-white
                            transition-transform duration-500
                        "><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                </button>
                <div class="flex flex-col h-full w-full *:w-full">
                    <div class="text-center text-lg w-full border-b-2 px-4 py-2">
                        Tabelas
                    </div>
                    <ul 
                        class="
                            flex-1 flex flex-col gap-2 
                            px-4 py-2 overflow-auto 
                            *:w-full
                            *:*:flex *:*:items-center *:*:gap-4
                            *:*:w-full *:*:p-2 *:*:rounded-md
                            hover:*:*:bg-neutral-200
                        ">
                        <?php for ($i = 0; $i < 18; $i++) { ?>
                        <li>
                            <a href="?t=<?php echo $i?>">
                                <div class="w-6 aspect-square <?php echo ($_GET["t"] == $i) ? "bg-primary" : "bg-neutral-200" ?>"></div>
                                <p> Tabela X </p>
                            </a>
                        </li>
                        <?php } ?>
                    </ul>
                    <div class="text-white text-sm h-fit px-2 py-4 bg-primary">
                        <div>
                            <span class="opacity-80">Nível de acesso:</span> 
                            <span>Admin </span>
                        </div>
                        <hr class="my-2 opacity-50">
                        <div>
                            <span class="opacity-80">Permissões:</span>
                            <span>Inserir, Alterar, Excluir</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Table and stuff -->
            <div id="side-container" class="absolute top-0 right-0 w-[calc(100%-16rem)] h-full p-8">
                <div class="flex flex-col gap-4 w-full h-full *:w-full *:bg-white *:rounded-md *:shadow-sm">
                    <!-- Header -->
                    <header class="flex justify-between items-center px-4 py-2">
                        <div class="text-lg">
                            <span class="opacity-80 mr-2">Tabela: </span>
                            <span>Produto</span>
                        </div>
                        <button type="button" class="text-white font-bold px-8 py-2 rounded-md bg-primary hover:bg-primary-dark">
                            Novo Registro
                        </button>
                    </header>
                    
                    <!-- Search bar and Table -->
                    <div class="flex-1 flex flex-col p-4 *:w-full">
                        <!-- Search bar -->
                        <div>
                            <form action="" class="flex gap-4 w-full">
                                <label 
                                    for="search-input" 
                                    class="hidden"></label>
                                <input 
                                    required
                                    type="search" 
                                    name="search-input" 
                                    id="search-input" 
                                    placeholder="Pesquise pelo nome" 
                                    class="
                                        flex-1 px-4 py-1 bg-[#f3f3f3] 
                                        border-2 border-transparent 
                                        rounded-md outline-none focus:border-secondary
                                    ">
                                <button 
                                    type="submit" 
                                    class="
                                        text-white font-bold 
                                        px-4 py-1 
                                        rounded-md 
                                        bg-primary hover:bg-primary-dark
                                    ">
                                    Pesquisar
                                </button>
                            </form>
                        </div>

                        <hr class="border-t-2 my-4">
                        
                        <!-- Table -->
                        <div class="flex-1 bg-red-500">
                            <!--  TODO: all the rest -->
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="/quickmart/assets/js/admin.js"></script>
</body>
</html>
