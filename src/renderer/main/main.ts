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

    abstract load(): void;

    abstract init(): void
}