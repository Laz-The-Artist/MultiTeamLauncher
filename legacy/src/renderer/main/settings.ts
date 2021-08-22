import { MainWindow } from "../main";
import { Tab } from "./main";

export class SettingsTab extends Tab {

    constructor(main: MainWindow) {
        super(main)
    }

    load() {
        this.getMain().setSettingsTab(this.getMain().getCurrentSettingsTab())
    }

    init() {
        this.getElement("tab-content").setAttribute("class", "content_settings")
        this.getElement("game-list").setAttribute("class", "sidebar_hidden")

        this.getElement("sub-header-friends").style.display = "none"
        this.getElement("sub-header-groups").style.display = "none"
        this.getElement("add-friend").style.display = "none"
        
        this.getElement("sub-header-general").style.display = "inline-block"
        this.getElement("sub-header-account").style.display = "inline-block"

       /* EXAMPLE 
       var newDiv = this.HTMLElement("div")
            .set("class", "clas")
            .set("id", "this_is_an_id")

        var newDiv1 = this.HTMLElement("div")
            .set("class", "clas")
            .set("id", "this_is_an_id")
            .child(newDiv.build())

        newDiv1.build()
        */
        
    }

    getName() {
        return "settings"
    }
}

export abstract class SettingsSubTab extends Tab {
    
    constructor(main: MainWindow) {
        super(main)
    }

    init() {
        this.initSubTab()
    }
    
    load() {
        this.loadSubTab()
    }

    emptyContent() {
        this.getElement("tab-content").innerHTML = null
    }

    isTabSelected(index: number) {
        return this.getMain().getCurrentTab() == 3 && this.getMain().getCurrentSettingsTab() == index
    }

    abstract loadSubTab(): void

    abstract initSubTab(): void
}

export class GeneralSettingsTab extends SettingsSubTab {

    constructor(main: MainWindow) {
        super(main)

        this.getMain().on("chose-path", (ev, data) => {
            if (this.isTabSelected(0)) {
                this.loadSubTab()
            }
        })
    }
    
    loadSubTab(): void {
        let clientSettings = this.getMain().getClientSettings()

        this.getElement("game-lib-loc-input").setAttribute("value", clientSettings["gameLibraryLoc"] ? clientSettings["gameLibraryLoc"] : "unset");
        this.getElement("game-lib-loc-input").oninput = (ev) => {
            this.getMain().setClientSettingsField("gameLibraryLoc", (<any>this.getElement("game-lib-loc-input")).value)
        };

        (<any>this.getElement("checkbox-auto-update-game"))["checked"] = clientSettings["autoUpdateGames"];
        this.getElement("checkbox-auto-update-game").onchange = (ev) => {
            this.getMain().setClientSettingsField("autoUpdateGames", (<any>this.getElement("checkbox-auto-update-game"))["checked"])
        }
        (<any>this.getElement("checkbox-auto-update-launcher"))["checked"] = clientSettings["autoUpdateLauncher"];
        this.getElement("checkbox-auto-update-launcher").onchange = (ev) => {
            this.getMain().setClientSettingsField("autoUpdateLauncher", (<any>this.getElement("checkbox-auto-update-launcher"))["checked"])
        }
        (<any>this.getElement("checkbox-limit-bandwidth"))["checked"] = clientSettings["limitBandwidth"];
        this.getElement("checkbox-limit-bandwidth").onchange = (ev) => {
            this.getMain().setClientSettingsField("limitBandwidth", (<any>this.getElement("checkbox-limit-bandwidth"))["checked"])
        }
        
        this.getElement("bandwidth-limit-input").setAttribute("value", clientSettings["limitBandwidthNumber"] + " mb/s");
        this.getElement("bandwidth-limit-input").oninput = (ev) => {
            this.getMain().setClientSettingsField("limitBandwidthNumber", Number.parseInt((<any>this.getElement("bandwidth-limit-input")).value.replace(" mb/s", "")))
        };

        (<any>this.getElement("interface-language-selector"))["selectedIndex"] = clientSettings["languageCode"];
        this.getElement("interface-language-selector").onchange = (ev) => {
            this.getMain().setClientSettingsField("languageCode", (<any>this.getElement("interface-language-selector"))["selectedIndex"])
        };
        (<any>this.getElement("interface-start-selector"))["selectedIndex"] = clientSettings["defaultStartTab"];
        this.getElement("interface-start-selector").onchange = (ev) => {
            const selectedTab = (<any>this.getElement("interface-start-selector"))["selectedIndex"];
            this.getMain().setClientSettingsField("defaultStartTab", selectedTab);
        };
        (<any>this.getElement("checkbox-auto-start"))["checked"] = clientSettings["runAtStartUp"];
        this.getElement("checkbox-auto-start").onchange = (ev) => {
            this.getMain().setClientSettingsField("runAtStartUp", (<any>this.getElement("checkbox-auto-start"))["checked"])
        }

        this.getElement("chose-path").onclick = () => {
            this.getMain().send("chose-path", {path: (<any>this.getElement("game-lib-loc-input")).value})
        }
    }
    
    getName() {
        return "general"
    }

    initSubTab() {

        //TEXT - Panel Title
        var storagePanelTitle = this.HTMLElement("h1")
            .set("class","setting_panel_title")
            .setInner("Storage Settings")

        //TEXT FIELD - Game Library Location
        var gameLibLocText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id", "game-lib-loc-text")
            .setInner("Game Library Location")
        
        var gameLibLocInput = this.HTMLElement("input")
            .set("type","text")
            .set("id","game-lib-loc-input")
            .set("class","inputfield")
            .set("placeholder","This is where games are installed.")
            .set("name","Game Library location")

        var gameLibLocButton = this.HTMLElement("input")
            .set("type", "submit")
            .set("value", "Chose")
            .set("id", "chose-path")
            .set("class", "button_regular")
            

        var settingGameLibLoc = this.HTMLElement("div")
            .set("id", "game-lib-loc")
            .child(gameLibLocText.build())
            .child(gameLibLocInput.build())
            .child(gameLibLocButton.build())


        //CHECKBOX - AutoUpdate Games
        var checkboxAutoUpdateGame_ = this.HTMLElement("i")
            .set("class","fas fa-check-circle")
            .set("id","checkmark-icon")

        var checkboxAutoUpdateGame = this.HTMLElement("input")
            .set("type","checkbox")
            .set("class","input_checkbox")
            .set("id","checkbox-auto-update-game")

        var autoUpdateGameText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id","checkbox-text-auto-update-game")
            .setInner("Auto-Update Games")

        var settingAutoUpdateGame = this.HTMLElement("div")
            .set("id","setting-auto-update-game")
            .child(autoUpdateGameText.build())
            .child(checkboxAutoUpdateGame.build())
            .child(checkboxAutoUpdateGame_.build())

        //CHECKBOX - AutoUpdate Launcher
        var checkboxAutoUpdateLauncher = this.HTMLElement("input")
            .set("type","checkbox")
            .set("class","input_checkbox")
            .set("id","checkbox-auto-update-launcher")
        var checkboxAutoUpdateLauncher_ = this.HTMLElement("i")
            .set("class","fas fa-check-circle")
            .set("id","checkmark-icon")
        
        var autoUpdateLauncherText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id","checkbox-text-auto-update-launcher")
            .setInner("Auto-Update the Launcher")

        var settingAutoUpdateLauncher = this.HTMLElement("div")
            .set("id","setting-auto-update-game")
            .child(autoUpdateLauncherText.build())
            .child(checkboxAutoUpdateLauncher.build())
            .child(checkboxAutoUpdateLauncher_.build())
        
        //CHECKBOX & INPUTFIELD - limit bandwidth
        var checkboxLimitBandwidth = this.HTMLElement("input")
            .set("type","checkbox")
            .set("class","input_checkbox")
            .set("id","checkbox-limit-bandwidth")

        var checkboxLimitBandwidth_ = this.HTMLElement("i")
            .set("class","fas fa-check-circle")
            .set("id","checkmark-icon")
        
        var limitBandwidthText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id","checkbox-text-limit-bandwidth")
            .setInner("Limit Bandwidth")
        
        var limitBandwidthInput = this.HTMLElement("input")
            .set("type","text")
            .set("id","bandwidth-limit-input")
            .set("class","inputfield")
            .set("placeholder","500 Mbit/s for example")
            .set("name","Bandwidth Limitation Amount")

        var settingLimitBandwidth = this.HTMLElement("div")
            .set("id","setting-limit-bandwidth")
            .child(limitBandwidthText.build()) 
            .child(checkboxLimitBandwidth.build())
            .child(checkboxLimitBandwidth_.build())
            .child(limitBandwidthInput.build()) 

        //SETTING PANEL - STORAGE
        var settingPanelStorage = this.HTMLElement("div")
            .set("class", "setting_panel")
            .set("id", "settings-panel-storage")
            .child(storagePanelTitle.build())
            .child(settingGameLibLoc.build())
            .child(settingAutoUpdateGame.build())
            .child(settingAutoUpdateLauncher.build())
            .child(settingLimitBandwidth.build())

        // Set the tab-content
        this.getElement("tab-content").appendChild(settingPanelStorage.build())

        //TEXT - Panel Title
        var interfacePanelTitle = this.HTMLElement("h1")
            .set("class","setting_panel_title")
            .setInner("Interface Settings")
        
        //SELECTOR - Language
        var languageText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id", "interface-language-text")
            .setInner("Language")
        
        var languageSelector = this.HTMLElement("select")
            .set("class","input_selector")
            .set("name", "language")
            .set("id", "interface-language-selector")
            .child(
                this.HTMLElement("option")
                .set("selected", "true")
                .setInner("en_us").build()
            )

        var languageDiv = this.HTMLElement("div")
            .set("id", "interface-language")
            .child(languageText.build())
            .child(languageSelector.build())

        
        var startTabText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id", "interface-start-text")
            .setInner("Default start tab")
        
        var startTabSelector = this.HTMLElement("select")
            .set("class","input_selector")
            .set("name", "start-tab")
            .set("id", "interface-start-selector")
        
        for (let i in this.getMain().getTabArray()) {
            let tabOption = this.HTMLElement("option")
            tabOption.setInner(this.getMain().getTabArray()[i].getName().toUpperCase())

            startTabSelector.child(tabOption.build())
        }

        var startTabDiv = this.HTMLElement("div")
            .set("id", "interface-start")
            .child(startTabText.build())
            .child(startTabSelector.build())
        
            
        //CHECKBOX - AutoStart
        var checkboxAutoStart = this.HTMLElement("input")
            .set("type","checkbox")
            .set("class","input_checkbox")
            .set("id","checkbox-auto-start")

        var checkboxAutoStart_ = this.HTMLElement("i")
            .set("class","fas fa-check-circle")
            .set("id","checkmark-icon")
        
        var autoStartText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id","checkbox-text-auto-start")
            .setInner("Run at System-Startup")

        var settingAutoStartLauncher = this.HTMLElement("div")
            .set("id","setting-auto-start")
            .child(autoStartText.build())
            .child(checkboxAutoStart.build())
            .child(checkboxAutoStart_.build())

        //SETTING PANEL - Interface
        var settingsPanelInterface = this.HTMLElement("div")
            .set("class", "setting_panel")
            .set("id", "settings-panel-interface")
            .child(interfacePanelTitle.build())
            .child(languageDiv.build())
            .child(startTabDiv.build())
            .child(settingAutoStartLauncher.build())

        /* DROPDOWN EXAMPLE
        <div class="account-preview-dropdown" id="account-preview-dropdown">
            <a class="settings-dropdown-entry" id="user-drpd-entry-1">Online</a>
            <hr class="decor_line" style="border: 1px solid #E1E1E1;">
            <a class="settings-dropdown-entry" id="user-drpd-entry-4">Profile...</a>
        </div>
        */
        
        this.getElement("tab-content").appendChild(settingsPanelInterface.build())
    }
}

export class AccountSettingsTab extends SettingsSubTab {

    constructor(main: MainWindow) {
        super(main)
    }
    
    loadSubTab(): void {

    }
    
    getName() {
        return "account"
    }

    initSubTab() {

        //TEXT - Panel Title
        var storagePanelTitle = this.HTMLElement("h1")
            .set("class","setting_panel_title")
            .setInner("Profile Settings")

        
        this.getElement("tab-content").appendChild(storagePanelTitle.build())

    }
}