<?php 

function generateHeader(string $username, array $access) {
    ?> 
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
                        <?php echo $username ?>
                    </span>
                </p>
                <p class="pl-4">
                    <?php echo $access["name"] ?>
                </p>
            </div>
            <div class="relative">
                <button 
                    id="header-dropdown-menu-button"
                    type="button" 
                    class="block h-10 aspect-square"
                    >
                    <img src="/quickmart/assets/images/icon.png" alt="user" width="100%" height="100%">
                </button>

                <div 
                    id="header-dropdown-menu" 
                    class="
                        hidden absolute top-16 right-0 
                        h-fit w-fit p-2 bg-white 
                        border border-black-pure border-opacity-10 
                        rounded-md shadow-md
                    ">
                    <ul class="flex flex-col gap-2 *:w-full *:*:w-full">
                        <li>
                            <button type="button" id="header-dropdown-menu-help-button">
                                <div class="
                                        flex items-center gap-4
                                        px-4 py-2
                                        rounded-md transition-colors
                                        hover:bg-neutral-200
                                    ">
                                    <div class="w-4 aspect-square">
                                        <img src="/quickmart/assets/images/logout.png" alt="" width="100%" height="100%">
                                    </div>
                                    <p>
                                        Ajuda
                                    </p>
                                </div>
                            </button>
                        </li>
                        <li>
                            <a href="/quickmart/public/admin/logout">
                                <div class="
                                        flex items-center gap-4
                                        px-4 py-2
                                        rounded-md transition-colors
                                        hover:bg-neutral-200
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
    <?php
}

?>