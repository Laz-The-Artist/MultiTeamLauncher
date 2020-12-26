import { MainWindow } from "../main";
import { Tab } from "./main";

export class SettingsTab extends Tab {

    constructor(main: MainWindow) {
        super(main)
    }

    load() {
        
    }

    init() {
        this.getElement("tab-content").setAttribute("class", "content_settings")
        this.getElement("game-list").setAttribute("class", "sidebar_hidden")

        this.getElement("sub-header-friends").style.display = "none"
        this.getElement("sub-header-groups").style.display = "none"
        this.getElement("add-friend").style.display = "none"
    }
}