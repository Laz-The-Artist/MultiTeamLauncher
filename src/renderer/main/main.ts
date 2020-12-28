import { MainWindow } from "../main";

export abstract class Tab {

    private main: MainWindow

    constructor(main: MainWindow) {
        this.main = main
    }

    getMain() {
        return this.main
    }

    getElement(key: string) {
        return this.main.getElement(key)
    }

    HTMLElement(key: string): ElementBuilder {
        return new ElementBuilder(key)
    }

    abstract getName(): string

    abstract load(): void;

    abstract init(): void
}

export class ElementBuilder {

    private htmlKey: string

    private attributes: any = {}

    private childs: HTMLElement[] = []
    
    private inner: string = ""

    private style: any = {}

    private events: any = {}

    constructor(htmlKey: string) {
        this.htmlKey = htmlKey
    }

    set(key: string, value: string): ElementBuilder {
        this.attributes[key] = value
        return this
    }

    build(): HTMLElement {
        const element = document.createElement(this.htmlKey)

        for (let i in this.attributes) {
            element.setAttribute(i, this.attributes[i])
        }

        if (this.inner) element.innerHTML = this.inner

        for (let j = 0; j < this.childs.length; j++) {
            element.appendChild(this.childs[j])
        }

        for (let k in this.style) {
            element.style.setProperty(k, this.style[k])
        }

        for (let l in this.events) {
            element.addEventListener(l, this.events[l])
        }

        return element;
    }

    child(child: HTMLElement): ElementBuilder {
        this.childs.push(child)
        return this;
    }

    setInner(inner: string) {
        this.inner = inner
        return this;
    }

    setStyle(key: string, value: string) {
        this.style[key] = value
        return this;
    }

    event<K extends keyof HTMLElementEventMap>(name: K, func: any) {
        this.events[name] = func
        return this
    }
}