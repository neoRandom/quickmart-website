<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QuickMart | Login Administrador </title>
    <link rel="stylesheet" href="/quickmart/assets/css/main.css">
</head>
<body>
    <div class="flex items-center justify-center w-screen h-screen bg-gray-100">
        <div class="absolute top-0 left-0 w-full px-5 py-2 bg-primary">
            <img src="/quickmart/assets/images/QuickMart.png" alt="">
        </div>
        <div class="bg-white border border-black-pute border-opacity-10 rounded-md shadow-md -translate-y-16">
            <div class="text-center bg-primary px-8 pb-2 pt-4 rounded-t-md">
                <h1 class="text-secondary text-4xl font-semibold">
                    QuickMart
                </h1>
                <p class="text-white opacity-80 mt-1">
                    Login Administrador
                </p>
            </div>
            <form action="" method="POST" class="px-8 pb-6 pt-2">
                <div class="my-2">
                    <label for="username" class="text-sm opacity-80 ml-2 mb-1">Usuário:</label>
                    <input 
                        required type="text" name="username" id="username" maxlength="64"
                        class="
                            w-full px-2 py-1 
                            border border-primary-dark border-opacity-25 
                            focus:border-opacity-100 focus:border-secondary
                            rounded-md transition-colors outline-none
                        ">
                </div>
                <div class="my-2">
                    <label for="password" class="text-sm opacity-80 ml-2 mb-1">Senha:</label>
                    <input  
                        required type="password" name="password" id="password" 
                        class="
                            w-full px-2 py-1 
                            border border-primary-dark border-opacity-25 f
                            ocus:border-opacity-100 focus:border-secondary
                            rounded-md transition-colors outline-none
                        ">
                </div>
                <div class="mt-6">
                    <button 
                        type="submit"
                        class="
                            text-white w-full p-2
                            bg-primary hover:shadow-md
                            rounded-md transition-all" >
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>