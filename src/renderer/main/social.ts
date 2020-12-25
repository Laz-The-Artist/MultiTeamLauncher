import { Tab } from "./main";

export abstract class SocialSubTab extends Tab {
    // constructor(parameters) {
        
    // }

    load() {
        this.loadSubTab()
    }

    abstract loadSubTab(): void;
}