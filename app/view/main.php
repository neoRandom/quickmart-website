<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QuickMart | Muita rapidez para o seu dia a dia </title>
    <link rel="icon" type="image/x-icon" href="/quickmart/assets/images/icon_transparente.png">
    <link rel="stylesheet" href="/quickmart/assets/css/main.css">
    <link rel="stylesheet" href="/quickmart/assets/css/main_header.css">
</head>
<body style="display: none;" class="flex-col h-screen">
    <?php include "components/header.php" ?>

    <main class="flex flex-col gap-20 flex-1 w-desktop mx-auto py-10">
        <!-- Top section: main ads and carousel -->
        <section>
            <aside class="flex flex-col gap-8 w-full">
                <!-- Carousel -->
                <div class="relative">
                    <div class="flex items-center justify-between w-full h-[300px]">
                        <div class="absolute overflow-hidden rounded-md">
                            <div id="image-slider-container" class="flex *:h-full *:object-cover transition-transform duration-500">
                                <img src="/quickmart/assets/images/carousel-1.png" alt="">
                                <img src="/quickmart/assets/images/carousel-2.png" alt="">
                                <img src="/quickmart/assets/images/carousel-3.png" alt="">
                            </div>
                        </div>
                        <button id="image-slider-left-button" type="button" class="z-10"><svg class="h-12 aspect-square fill-white" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></button>
                        <button id="image-slider-right-button" type="button" class="z-10"><svg class="h-12 aspect-square fill-white" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></button>
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
        
    </main>

    <?php include "components/footer.php" ?>

    <script type="module" src="/quickmart/assets/js/main/main.js"></script>
</body>
</html>
