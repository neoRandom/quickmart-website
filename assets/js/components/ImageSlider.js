class ImageSlider {
    constructor(container, ltr = true) {
        this.container = container;
        this.positionsList = ["0"];
        this.currentPosition = 0;
        this.cycleFunctionID = null;
        this.timeBetween = 6000;
        this.leftToRight = ltr;
        for (let i = 1; i < container.children.length; i++) {
            this.positionsList.push(`-${100 * i}%`);
        }
    }
    update() {
        this.container.style.transform = `translateX(${this.positionsList[this.currentPosition]})`;
    }
    previous() {
        if (this.currentPosition <= 0) {
            this.currentPosition = this.positionsList.length - 1;
        }
        else {
            this.currentPosition--;
        }
        this.update();
    }
    next() {
        if (this.currentPosition >= this.positionsList.length - 1) {
            this.currentPosition = 0;
        }
        else {
            this.currentPosition++;
        }
        this.update();
    }
    cycle() {
        if (this.cycleFunctionID === null)
            return;
        this.cycleFunctionID = setInterval((this.leftToRight) ? () => { this.next(); } : () => { this.previous(); }, this.timeBetween);
    }
    stop() {
        if (this.cycleFunctionID === null)
            return;
        clearInterval(this.cycleFunctionID);
        this.cycleFunctionID = null;
    }
}
export default ImageSlider;
