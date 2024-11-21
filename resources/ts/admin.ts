// Dropdown menu
document.querySelector("#dropdown-menu-button")
?.addEventListener("click", () => {
    document.querySelector("#dropdown-menu")?.classList.toggle("hidden");
});

// Side bar
const sideBar = document.querySelector("#sidebar") as HTMLDivElement;
const sideContainer = document.querySelector("#side-container") as HTMLDivElement;

sideBar.querySelector("button")
?.addEventListener("click", () => {
    sideBar.querySelector("button > svg")?.classList.toggle("rotate-180");
    sideBar.classList.toggle("-translate-x-full");
    sideContainer.classList.toggle("w-[calc(100%-16rem)]");
    sideContainer.classList.toggle("w-full");
});
