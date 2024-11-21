"use strict";
var _a, _b;
(_a = document.querySelector("#dropdown-menu-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a;
    (_a = document.querySelector("#dropdown-menu")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
});
const sideBar = document.querySelector("#sidebar");
const sideContainer = document.querySelector("#side-container");
(_b = sideBar.querySelector("button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    var _a;
    (_a = sideBar.querySelector("button > svg")) === null || _a === void 0 ? void 0 : _a.classList.toggle("rotate-180");
    sideBar.classList.toggle("-translate-x-full");
    sideContainer.classList.toggle("w-[calc(100%-16rem)]");
    sideContainer.classList.toggle("w-full");
});
