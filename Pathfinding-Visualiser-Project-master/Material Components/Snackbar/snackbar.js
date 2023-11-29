/**
 * @author Karan Gandhi
 * @email karangandhi.programming@gmail.com
 */
const SNCAKBAR_TIME_LONG = 6000;
const SNCAKBAR_TIME_MEDIUM = 4000;
const SNACKBAR_TIME_SHORT = 2000;

let elt = document.createElement("link");
elt.className = "snackbar-stylsheet";
elt.href = "./Material components/Snackbar/snackbar.css";
elt.rel = "stylesheet";
window.addEventListener("DOMContentLoaded", () => document.head.append(elt));

let activeSnackbar = [];

/**
 * Snackbar like material component for the web
 *
 * @class Snackbar
 */
class Snackbar {
    /**
     * Creates an instance of Snackbar.
     *
     * @param {String} title
     * @param {StringArray} actionBtnText
     * @param {FunctionArray} actionBtnCallbacks
     * @param {Number} time
     * @memberof Snackbar
     */
    constructor(title, actionBtnText, actionBtnCallbacks, time) {
        this.id = "";
        this.root = null;
        this.active = false;
        this.title = title;
        this.actionBtnText = actionBtnText;
        this.actionBtnCallbacks = actionBtnCallbacks;
        this.time = time;
    }

    /**
     * Builds the snackbar (Makes it ready to be appended to the body).
     *
     * @returns {Snackbar}
     * @memberof Snackbar
     */
    build() {
        this.root = document.createElement("div");
        this.id = window.btoa(Math.random());
        this.root.className = "snackbar-surface";
        this.root.id = this.id;
        let text = `<div class="snackbar-title">${this.title}</div>`;
        for (let actionBtnText of this.actionBtnText) text += `<div class="snackbar-action-btn ${window.btoa(Math.random())}">${actionBtnText}</div>`;
        this.root.innerHTML = text;

        let abs = this.root.getElementsByClassName("snackbar-action-btn");
        console.log(abs);
        if (abs.length !== 0) {
            for (let i in abs) {
                abs[i].addEventListener("click", () => this.actionBtnCallbacks[i]());
            }
        }

        return this;
    }

    /**
     * Appends the sncakbar to the body of the documant and shifts the other snackbars if there are any.
     *
     * @returns {Snackbar}
     * @memberof Snackbar
     */
    show() {
        this.root.style.opacity = 0;
        document.body.append(this.root);
        activeSnackbar.unshift(this);
        this.active = true;

        for (let index in activeSnackbar) {
            let dy = 60 * index;
            let snackbar = activeSnackbar[index].root;
            snackbar.style.transform = `translate(0, -${dy}px)`;
        }

        setTimeout(() => {
            this.root.style.opacity = 1;
            setTimeout(() => {
                this.remove();
            }, this.time);
        }, 200);
        return this;
    }

    /**
     * Removes the snackbar with a animation.
     *
     * @returns {Snackbar}
     * @memberof Snackbar
     */
    remove() {
        this.root.style.opacity = 0;
        setTimeout(() => {
            this.root.remove();
            this.active = false;
            activeSnackbar.splice(activeSnackbar.indexOf(this.root), 1);
        }, 400);
        return this;
    }

    /**
     * Returns a copy of the snackbar.
     *
     * @returns {Snackbar}
     * @memberof Snackbar
     */
    clone() {
        return new Snackbar(this.title, this.actionBtnText, this.actionBtnCallbacks);
    }

    /**
     * Returns a copy of the snackbar.
     *
     * @static
     * @param {Snackbar} snackbar
     * @returns {Snackbar}
     * @memberof Snackbar
     */
    static clone(snackbar) {
        return new Snackbar(snackbar.title, snackbar.actionBtnText, snackbar.actionBtnCallbacks);
    }
}
