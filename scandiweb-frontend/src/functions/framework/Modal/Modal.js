// Class implements modal basic functionality

// # css Modal.scss is obligatory to import where modal instantiated
// * located in same directory Modal.scss
// * basic styling required for openning and closing the modal and manage overlay if needed

// # specification
// * @params parent element with class .modal
// * @params selector of element which suppose to be modal open button
// * @params options { overlay: "overlay": 'overlay-selector'}
// * always creates modal close button, becuase overlay is optional feature
// * overlay by default has class 'modal-overlay'
// * clicking on overlay will close modal

class Modal {
    constructor(
        parentEl,
        openSel,
        options,
        isOpened
    ) {
        this.parentEl = parentEl;
        this.openEl = document.querySelector(openSel);
        this.options = options;
        this.body = document.querySelector("body");

        this.isOpened = isOpened;

        this.init();
    }

    init() {
        this.prepareDOM();
    }

    prepareDOM() {
        this.createCloseBtn();
        if (this.options.overlay) this.createOverlay();
    }

    toggleModalState() {
        const stateModifier = "_opened";
        this.parentEl.classList.toggle(`modal${stateModifier}`);
        if (this.options.overlay) {
            this.overlayEl.classList.toggle(`modal-overlay${stateModifier}`);
            this.body.classList.toggle("overflowHidden");
            window.scrollTo(0, 0);
        }
    }

    createOverlay() {
        if (document.querySelector(`#${this.options.overlay}`)) return; // prevent overlay dublicate creation (during development happened)

        const overlayEl = document.createElement("div");
        overlayEl.classList.add("modal-overlay");
        overlayEl.id = this.options.overlay;
        overlayEl.setAttribute("data-testid", "cart-overlay")
        this.body.appendChild(overlayEl);
        this.overlayEl = overlayEl;
    }

    createCloseBtn() {
        const closeBtnEl = document.createElement("button");
        closeBtnEl.classList.add("modal__close-btn");
        this.parentEl.appendChild(closeBtnEl);
        this.closeEl = closeBtnEl;
    }
}

export default Modal;