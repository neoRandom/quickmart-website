<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QuickMart | Login Administrador </title>
    <link rel="icon" type="image/x-icon" href="/quickmart/assets/images/icon_transparente.png">
    <link rel="stylesheet" href="/quickmart/assets/css/main.css">
</head>
<body>
    <div class="flex items-center justify-center w-screen h-screen">
        <header class="absolute top-0 left-0 flex items-center h-12 w-full px-5 py-2 bg-primary shadow-md">
        </header>
        <div class="flex default-border rounded-md shadow-md -translate-y-16 overflow-hidden">
            <form action="" method="POST" class="flex flex-col items-center w-[270px] p-6">
                <div class="text-center">
                    <h2 class="text-2xl font-semibold">
                        Login
                    </h2>
                    <hr class="my-1 border-t-2" />
                    <h3 class="text-xl">
                        Administrador
                    </h3>
                </div>
                <div class="flex-1 flex flex-col gap-4 justify-center w-full">
                    <div class="flex flex-col gap-2">
                        <label for="username" class="text-sm opacity-80 indent-2">Usuário</label>
                        <input 
                            required type="text" name="username" id="username" maxlength="64"
                            class="
                                w-full px-2 py-1 
                                primary-border 
                                focus:border-opacity-100 focus:border-secondary
                                rounded-md transition-colors outline-none
                            ">
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password" class="text-sm opacity-80 indent-2">Senha</label>
                        <input  
                            required type="password" name="password" id="password" 
                            class="
                                w-full px-2 py-1 
                                primary-border f
                                ocus:border-opacity-100 focus:border-secondary
                                rounded-md transition-colors outline-none
                            ">
                    </div>
                </div>
                <button 
                    type="submit"
                    class="product-card-button hover:bg-primary hover:text-white" >
                    Entrar
                </button>
            </form>
            <img src="/quickmart/assets/images/login_banner.png" />
        </div>
        <div class="absolute bottom-0 left-0 w-full px-5 py-2">
            <p class="text-sm text-center hover:*:underline">
                © QuickMart 2024 | Criado por: 
                <a href="https://github.com/neoRandom" target="_blank">Fellipe Leonardo</a>, Bárbara Fernandes e Enzo Souto
            </p>
        </div>
    </div>
    <script>
        const cookies = document.cookie.split("; ");
        const stateCookie = cookies.find(cookie => cookie.startsWith("state="));
        if (stateCookie) {
            const stateValue = stateCookie.split("=")[1];
            switch (stateValue) {
                case "unauthorized":
                    alert("Usuário sem permissão");
                    break;
                case "not-found":
                    alert("Usuário não encontrado");
                    break;
            }
            document.cookie = "state=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
    </script>
</body>
</html>