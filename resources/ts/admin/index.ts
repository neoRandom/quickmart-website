import loadTable from "./loadTable.js";


const sideMenu = document.querySelector("#sidebar") as HTMLDivElement;
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li") as NodeListOf<HTMLLIElement>;
const crudContainer = document.querySelector("#side-container") as HTMLDivElement;


// Only shows the page when its fully loaded
window.addEventListener('load', function () {
    document.body.style.display = "block";
    loadTable(0);
}, false);


// Header Dropdown menu
const headerDropdownMenuButton = document.querySelector("#header-dropdown-menu-button") as HTMLButtonElement;
const headerDropdownMenu = document.querySelector("#header-dropdown-menu") as HTMLDivElement;

headerDropdownMenuButton.addEventListener("click", () => {
    headerDropdownMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;

    if (
        headerDropdownMenuButton.contains(target) || 
        headerDropdownMenu.contains(target)
    ) {
        return;
    }

    headerDropdownMenu.classList.add("hidden");
})


// Side bar
sideMenu.querySelector("button")
?.addEventListener("click", () => {
    sideMenu.querySelector("button > svg")?.classList.toggle("rotate-180");
    sideMenu.classList.toggle("-translate-x-full");
    crudContainer.classList.toggle("w-full");
});


// Side bar buttons
sideMenuItens.forEach((e, i) => {
    e.addEventListener("click", () => {
        loadTable(i);
    });
});
