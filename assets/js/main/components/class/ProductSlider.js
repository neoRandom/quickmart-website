class ProductSlider {
    constructor(container, leftButton, rightButton, elementsGap = 0, minimumVisible = 1) {
        this.container = container;
        this.leftButton = leftButton;
        this.rightButton = rightButton;
        this.currentPosition = 0;
        this.elementsGap = elementsGap;
        this.minimumVisible = minimumVisible;
        this.leftButton.addEventListener("click", () => {
            this.previous();
        });
        this.rightButton.addEventListener("click", () => {
            this.next();
        });
        this.update();
    }
    update() {
        let width = this.container.children[0].offsetWidth;
        if (width === undefined)
            return;
        if (this.currentPosition >= this.container.children.length - this.minimumVisible)
            this.rightButton.setAttribute("disabled", "true");
        else
            this.rightButton.removeAttribute("disabled");
        if (this.currentPosition <= 0)
            this.leftButton.setAttribute("disabled", "true");
        else
            this.leftButton.removeAttribute("disabled");
        this.container.style.transform = `translateX(-${this.currentPosition * (width + this.elementsGap)}px)`;
    }
    next() {
        if (this.currentPosition >= this.container.children.length - this.minimumVisible)
            return;
        this.currentPosition++;
        this.update();
    }
    previous() {
        if (this.currentPosition <= 0) {
            return;
        }
        this.currentPosition--;
        this.update();
    }
}
export default ProductSlider;
