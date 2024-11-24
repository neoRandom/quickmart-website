<?php

function generateSidebar(array $access) {
    ?> 
    <style>
        .selected-item > button > div > svg > * {
            stroke: var(--primary-dark);
        }
        .selected-item > button > p {
            opacity: 1;
        }
    </style>
    <div id="sidebar" class="z-40 absolute top-0 left-0 w-56 h-full bg-white shadow-md transition-transform duration-700">
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
                    flex-1 flex flex-col gap-1 divide-y divide-neutral-200
                    px-4 py-2 overflow-auto 
                    *:w-full *:pt-1
                    *:*:flex *:*:items-center *:*:gap-4
                    *:*:w-full *:*:p-2 *:*:rounded-md *:*:transition-colors
                    hover:*:*:bg-neutral-200
                ">
                <?php foreach (database\Connection::getTables() as $name) { ?>
                <li>
                    <button type="button">
                        <div class="w-6 aspect-square">
                            <svg class="*:stroke-neutral-500" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 9H21V18C21 18.9428 21 19.4142 20.7071 19.7071C20.4142 20 19.9428 20 19 20H15V9Z" stroke-width="2" stroke-linecap="round"/>
                                <path d="M3 9H9V20H5C4.05719 20 3.58579 20 3.29289 19.7071C3 19.4142 3 18.9428 3 18V9Z" stroke-width="2" stroke-linecap="round"/>
                                <rect x="9" y="9" width="6" height="11" stroke-width="2" stroke-linecap="round"/>
                                <path d="M3 6C3 5.05719 3 4.58579 3.29289 4.29289C3.58579 4 4.05719 4 5 4H19C19.9428 4 20.4142 4 20.7071 4.29289C21 4.58579 21 5.05719 21 6V9H3V6Z" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <p class="opacity-75"> 
                            <?php echo substr($name, strpos($name, "\\") + 1) ?> 
                        </p>
                    </button>
                </li>
                <?php } ?>
            </ul>
            <div class="text-white text-sm h-fit p-3 bg-primary">
                <div>
                    <span class="opacity-80">Nível de acesso:</span> 
                    <span> 
                        <?php echo $access["name"] ?> 
                    </span>
                </div>
                <hr class="my-2 opacity-50">
                <div>
                    <span class="opacity-80">Permissões:</span>
                    <span> 
                        <?php echo join(", ", $access["permissions"]) ?> 
                    </span>
                </div>
            </div>
        </div>
    </div>
    <?php
}
    