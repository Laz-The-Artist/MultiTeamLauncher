import { MainWindow } from "../main";
import { Tab } from "./main";

export class ModsTab extends Tab {
    constructor(main: MainWindow) {
        super(main)
    }

    load() {

    }

    init() {
        this.getElement("tab-content").setAttribute("class", "content_mods")

        this.getElement("game-list").setAttribute("class", "sidebar")
        
        this.getElement("sub-header-friends").style.display = "none"
        this.getElement("sub-header-groups").style.display = "none"
        this.getElement("add-friend").style.display = "none"
        
        this.getElement("sub-header-general").style.display = "none"
        this.getElement("sub-header-account").style.display = "none"
    }

    getName() {
        return "mods"
    }
}