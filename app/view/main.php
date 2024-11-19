<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QuickMart </title>
    <script src="/quickmart/assets/js/Carousel.js"></script>
    <link rel="stylesheet" href="/quickmart/assets/css/main.css">
    <link rel="stylesheet" href="/quickmart/assets/css/main_header.css">
</head>
<body class="flex flex-col h-screen">
    <header 
        class="
            sticky top-0
            z-50
            text-white  
            bg-primary
            shadow-lg
        ">
        <div class="bg-primary pt-6">
            <div class="w-desktop mx-auto">
                <div class="flex gap-10 items-center">
                    <img src="/quickmart/assets/images/QuickMart.png">
                    <div class="flex-1 flex flex-col justify-center">
                        <form 
                            action="" 
                            method="get"
                            class="
                                flex w-full h-9
                                text-black
                                bg-white
                                rounded-sm
                                overflow-hidden
                                border-b-2
                                border-transparent
                                focus-within:border-secondary
                            ">
    
                            <input 
                                type="search" 
                                placeholder="Hmm... hoje eu quero..."
                                name="" 
                                id=""
                                class="
                                    flex-1 h-full 
                                    px-2 py-1
                                    outline-none
                                ">
                            <svg 
                                class="h-full p-1 pb-0.5 pr-1.5" 
                                role="button" 
                                viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                            </svg>
                        </form>
                    </div>
                    <div class="flex gap-4 justify-center border-l-2 pl-6">
                        <button type="button" class="btn-w-bg-image">
                            <img src="/quickmart/assets/images/shopping-cart.png" class="image">
                        </button>
                        <button type="button" class="btn-w-bg-image">
                            <img src="/quickmart/assets/images/user.png" class="image">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-primary-dark border-b-2 border-secondary">
            <div class="w-desktop mx-auto">
                <nav class="flex gap-4 h-10 mt-4">
                    <div
                        type="button" 
                        role="menu" 
                        class="group flex items-center pl-4 pr-8 hover:bg-white rounded-t-md cursor-pointer">
                        <div class="hidden group-hover:block relative h-0 w-0">
                        <div 
                            class="
                                absolute top-5 -left-4 
                                text-black-pure 
                                h-fit w-fit px-4 py-3 
                                bg-white
                                border-b-[6px] border-primary
                                shadow-lg
                            ">
                            <ul>
                                <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                                <li>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</li>
                                <li>ccccccccccccccccccccccccccccccccc</li>
                            </ul>
                        </div>
                        </div>
    
                        <svg 
                            viewBox="0 0 24 24"
                            class="
                                h-full mt-0.5 
                                scale-[.6]
                                fill-white group-hover:fill-black
                            "><path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"></path></svg>
                        <span class="ml-1 whitespace-nowrap group-hover:text-black">
                            Todas as categorias
                        </span>
                    </div>
                    <ul class="flex-1 flex gap-2 *:flex-1 hover:*:*:bg-white hover:*:*:text-black">
                        <li>
                            <a href="" class="menubar-item">
                                Categoria X
                            </a>
                        </li>
                        <li>
                            <a href="" class="menubar-item">
                                Categoria X
                            </a>
                        </li>
                        <li>
                            <a href="" class="menubar-item">
                                Categoria X
                            </a>
                        </li>
                        <li>
                            <a href="" class="menubar-item">
                                Categoria X
                            </a>
                        </li>
                        <li>
                            <a href="" class="menubar-item">
                                Categoria X
                            </a>
                        </li>
                        <li>
                            <a href="" class="menubar-item">
                                Categoria X
                            </a>
                        </li>
                        <li>
                            <a href="" class="menubar-item">
                                Categoria X
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <main class="flex flex-col gap-20 flex-1 w-desktop mx-auto py-10">
        <!-- Top section: main ads and carousel -->
        <section>
            <aside class="flex flex-col gap-8 w-full">
                <!-- Carousel -->
                <div class="relative">
                    <div class="flex items-center justify-between w-full h-[300px]">
                        <div class="absolute overflow-hidden rounded-md">
                            <div id="carousel-images-container" class="flex *:h-full *:object-cover transition-transform duration-500">
                                <img src="/quickmart/assets/images/carousel-1.png" alt="">
                                <img src="/quickmart/assets/images/carousel-2.png" alt="">
                                <img src="/quickmart/assets/images/carousel-3.png" alt="">
                            </div>
                        </div>
                        <button id="carousel-left-button" type="button" class="z-10"><svg class="h-12 aspect-square fill-white" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></button>
                        <button id="carousel-right-button" type="button" class="z-10"><svg class="h-12 aspect-square fill-white" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></button>
                    </div>
                </div>

                <!-- Other ads -->
                 <div class="flex gap-4 *:flex-1 *:h-56 *:bg-primary *:rounded-md">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                 </div>
            </aside>
        </section>

        <!-- Other sections -->
        <section class="bg-red-500 h-[512px]">

        </section>

        <section class="bg-red-500 h-[512px]">

        </section>
    </main>

    <footer 
        class="
            text-white 
            py-8 
            bg-primary 
            border-t-[12px] border-primary-dark 
            shadow-lg
        ">
        <div>
            <p class="text-center">
                Made by: rakRandom, caramelPopp and EnzoSouto01 | QuickMart Project © 2024
            </p>
        </div>
    </footer>

    <script>
        let carousel = new Carousel(document.querySelector("#carousel-images-container"));

        carousel.cycle();

        document.querySelector("#carousel-right-button")
        .addEventListener("click", () => {
            carousel.next();
        });

        document.querySelector("#carousel-left-button")
        .addEventListener("click", () => {
            carousel.previous();
        });
    </script>
</body>
</html>
