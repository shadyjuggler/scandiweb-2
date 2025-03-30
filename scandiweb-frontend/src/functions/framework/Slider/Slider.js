// Class implements slider functionality based on prepared DOM structure
// # additional file with necessary css rules makes slider work as well
// * located in same directory Slider.scss
// * default slider el. outlook suppose to be overridden by more specified selectors

// # Requerments to DOM
// * parent el. must to have '.slider' class
// * nav el. must to have '.slider__btn-prev' & '.slider__btn-next' classes
// * pagination el. must to have '.slider__pagination' class, anyway pagination is optional feature

class Slider {
    currentIndex = 0;
    allSlides = [];

    constructor(
        parentEl,
        navNextEl,
        navPrevEl,
        paginationEl = null, // optional
        options = { pagImg: null }
    ) {
        this.parent = parentEl;
        this.navN = navNextEl;
        this.navP = navPrevEl;
        this.pagination = paginationEl;
        this.options = options;

        // naming config of slider DOM structure
        this.wrapperSel = ".slider__main";
        this.sliderSel = ".slider__slide";

        // Init
        this.init();
    }

    init() {
        this.prepareDOM();
        this.listenerSub();
    }

    // Getting ready with inline-css and class fields before make slider work
    prepareDOM() {
        this.wrapper = this.parent.querySelector(this.wrapperSel);
        this.allSlides = this.wrapper.querySelectorAll(this.sliderSel);

        // Save actual width of parent el
        this.parentWidth = this.parent.offsetWidth;

        // Makes the slide wrapper wider than parent by as many times as slides provided
        this.wrapper.style.width = `${this.parentWidth * this.allSlides.length}px`;

        // Specify strict width for each slide
        this.allSlides.forEach(slide => { slide.style.width = `${this.parentWidth}px` });

        // Optional features
        if (!this.pagination) return;
        this.pagCallback = this.createPagination();
    }

    // Subscription for listeners
    listenerSub() {
        this.navN.addEventListener("click", () => this.changeIndex(1));
        this.navP.addEventListener("click", () => this.changeIndex(-1));

        // Optional features
        if (!this.pagination) return;
        this.pagination.addEventListener("click", (e) => this.paginationClick(e.target));
    }

    changeIndex(index) {
        this.currentIndex += index;

        if (this.currentIndex < 0) {
            this.currentIndex = this.allSlides.length - 1;
        }
        if (this.currentIndex >= this.allSlides.length) {
            this.currentIndex = 0;
        }

        this.moveSlider(this.currentIndex);
    }

    moveSlider(index) {
        // this line sync this.currentIndex with actual index, if moveSlider() was fired from pagination
        this.currentIndex = index;

        // Move slides wrapper through: transfrom: translateX(); css property
        this.wrapper.style.transform = "translateX(" + (-this.parentWidth) * index + "px)";

        // Optional: hangle pagination activiness class
        if (!this.pagination) return;
        this.pagCallback(this.currentIndex);
    }

    createPagination() {
        const pagDots = [];

        // Optional
        const { pagImgs } = this.options;

        for (let i = 0; i < this.allSlides.length; i++) {
            const pagDot = document.createElement("span");

            pagDot.classList.add("dot");
            if (i == 0) pagDot.classList.add("dot_active");

            // Add image background to pagination dot
            if (pagImgs) pagDot.style.backgroundImage = `url(${pagImgs[i]})`;

            pagDot.dataset.index = i;

            pagDots.push(pagDot);
            this.pagination.appendChild(pagDot);
        }

        // Return callback for handleing dot activiness class
        return (index) => {
            pagDots.forEach(dot => dot.classList.remove("dot_active"));
            pagDots[index].classList.add("dot_active");
        }
    }

    paginationClick(target) {
        if (target.classList.contains("dot")) {
            this.moveSlider(+target.dataset.index);
        }
    }
}

export default Slider;