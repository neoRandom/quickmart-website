<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QuickMart </title>
    <link rel="icon" type="image/x-icon" href="/quickmart/assets/images/icon_transparente.png">
    <script src="/quickmart/assets/js/Carousel.js"></script>
    <link rel="stylesheet" href="/quickmart/assets/css/main.css">
    <link rel="stylesheet" href="/quickmart/assets/css/main_header.css">
    <?php 
        $subitems = [
            [
                "image" => "/quickmart/assets/images/user.png",
                "name" => "Item 1",
                "old_price" => "R$ 20,00",
                "price" => "R$ 10,00",
                "discount" => "50",
                "unity" => "cada"
            ],
            [
                "image" => "/quickmart/assets/images/item-2.png",
                "name" => "Item 2",
                "price" => "R$ 15,00",
                "discount" => "50",
                "unity" => "cada"
            ],
            [
                "image" => "/quickmart/assets/images/item-3.png",
                "name" => "Item 3",
                "old_price" => "R$ 40,00",
                "price" => "R$ 20,00",
                "discount" => "50",
                "unity" => "cada"
            ],
            [
                "image" => "/quickmart/assets/images/item-4.png",
                "name" => "Item 4",
                "old_price" => "R$ 50,00",
                "price" => "R$ 25,00",
                "discount" => "50",
                "unity" => "cada"
            ],
            [
                "image" => "/quickmart/assets/images/item-5.png",
                "name" => "Item 5",
                "old_price" => "R$ 60,00",
                "price" => "R$ 30,00",
                "discount" => "50",
                "unity" => "cada"
            ],
            [
                "image" => "/quickmart/assets/images/item-6.png",
                "name" => "Item 6",
                "old_price" => "R$ 70,00",
                "price" => "R$ 35,00",
                "discount" => "50",
                "unity" => "cada"
            ]
        ];
    ?>
</head>
<body class="flex flex-col h-screen">
    <?php include "components/header.php" ?>

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
                 <div class="flex gap-4 *:flex-1 *:h-52 *:bg-primary *:rounded-md">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                 </div>
            </aside>
        </section>

        <!-- Other sections -->
        <?php foreach(["section-1", "section-2"] as $item) { ?>
        <section class="flex flex-col gap-8 h-[500px]">
            <div class="flex items-center justify-between">
                <h2 class="font-semibold text-xl w-fit transition-transform select-none hover:translate-x-1">
                    Mais vendidos da semana
                </h2>
                <a href="#" class="text-primary font-semibold hover:underline">Ver tudo</a>
            </div>
            <div class="flex-1 flex gap-4 py-2 overflow-x-auto">
                <?php foreach($subitems as $subitem) { ?>
                <div 
                    class="
                        group min-w-64 h-full 
                        default-border rounded-md 
                        shadow-md cursor-pointer
                    ">
                    <div class="flex flex-col w-full h-full p-4">
                        <div class="relative w-full">
                            <p class="absolute font-semibold text-white m-2 px-2 py-1 bg-secondary rounded-md">
                                <?php echo "-" . $subitem["discount"] . "%" ?>
                            </p>
                            <img src="<?php echo $subitem["image"] ?>" alt="" class="w-full aspect-[4/3] border-0">
                        </div>
                        <div class="flex-1 flex flex-col gap-2 my-2">
                            <div class="flex flex-col gap-1 items-center">
                                <?php if(isset($subitem["old_price"])) { ?>
                                <p class="text-sm line-through opacity-50">
                                    <?php echo $subitem["old_price"] ?>
                                </p>
                                <?php } ?>
                                <p class="text-xl text-primary font-bold">
                                    <?php echo $subitem["price"] ?>
                                    <span class="text-base font-normal uppercase">
                                        <?php echo "/ " . $subitem["unity"] ?>
                                    </span>
                                </p>
                            </div>
                            
                            <p class="text-sm font-semibold px-1 truncate">
                                <?php echo $subitem["name"] ?>
                            </p>
                            <p class="text-sm opacity-90 break-words line-clamp-3">
                                Produto mais incrivel e fenomenal que voce jamais viu na sua vida, e esse nome é realmente grande, não tem nenhum parecido com tamanho tamanho
                            </p>
                        </div>
                        <div>
                            <button 
                                type="button" 
                                class="
                                    text-primary-dark
                                    w-full py-1 
                                    border-2 border-primary
                                    rounded-md transition-colors 
                                    group-hover:bg-primary-dark group-hover:text-white
                                ">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
                <?php } ?>
            </div>
        </section>
        <?php } ?>
    </main>

    <?php include "components/footer.php" ?>

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
