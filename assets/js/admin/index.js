var _a;
import loadTable from "./loadTable.js";
const sideMenu = document.querySelector("#sidebar");
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li");
const crudContainer = document.querySelector("#side-container");
window.addEventListener('load', function () {
    document.body.style.display = "block";
    loadTable(0);
}, false);
const headerDropdownMenuButton = document.querySelector("#header-dropdown-menu-button");
const headerDropdownMenu = document.querySelector("#header-dropdown-menu");
headerDropdownMenuButton.addEventListener("click", () => {
    headerDropdownMenu.classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
    const target = e.target;
    if (headerDropdownMenuButton.contains(target) ||
        headerDropdownMenu.contains(target)) {
        return;
    }
    headerDropdownMenu.classList.add("hidden");
});
(_a = sideMenu.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a;
    (_a = sideMenu.querySelector("button > svg")) === null || _a === void 0 ? void 0 : _a.classList.toggle("rotate-180");
    sideMenu.classList.toggle("-translate-x-full");
    crudContainer.classList.toggle("w-full");
});
sideMenuItens.forEach((e, i) => {
    e.addEventListener("click", () => {
        loadTable(i);
    });
});
