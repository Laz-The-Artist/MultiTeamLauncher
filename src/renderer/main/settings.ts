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
    }
    
    loadSubTab(): void {

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

        var settingGameLibLoc = this.HTMLElement("div")
            .set("id", "game-lib-loc")
            .child(gameLibLocText.build())
            .child(gameLibLocInput.build())

        //CHECKBOX - AutoUpdate Games
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

        //CHECKBOX - AutoUpdate Launcher
        var checkboxAutoUpdateLauncher = this.HTMLElement("input")
            .set("type","checkbox")
            .set("class","input_checkbox")
            .set("id","checkbox-auto-update-launcher")
        
        var autoUpdateLauncherText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id","checkbox-text-auto-update-launcher")
            .setInner("Auto-Update the Launcher")

        var settingAutoUpdateLauncher = this.HTMLElement("div")
            .set("id","setting-auto-update-game")
            .child(autoUpdateLauncherText.build())
            .child(checkboxAutoUpdateLauncher.build())
        
        //CHECKBOX & INPUTFIELD - limit bandwidth
        var checkboxLimitBandwidth = this.HTMLElement("input")
            .set("type","checkbox")
            .set("class","input_checkbox")
            .set("id","checkbox-limit-bandwidth")
        
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
        
        var languageText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id", "interface-language-text")
            .setInner("Language")
        
        var languageSelector = this.HTMLElement("select")
            .set("name", "language")
            .set("id", "interface-language-selector")
            .child(
                this.HTMLElement("option")
                .set("selected", "true")
                .setInner("-").build()
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
            .set("name", "start-tab")
            .set("id", "interface-start-selector")

        var startTabDiv = this.HTMLElement("div")
            .set("id", "interface-start")
            .child(startTabText.build())
            .child(startTabSelector.build())
        
            
        //CHECKBOX - AutoStart
        var checkboxAutoStart = this.HTMLElement("input")
            .set("type","checkbox")
            .set("class","input_checkbox")
            .set("id","checkbox-auto-start")
        
        var autoStartText = this.HTMLElement("a")
            .set("class","settings-entry")
            .set("id","checkbox-text-auto-start")
            .setInner("Run at System-Startup")

        var settingAutoStartLauncher = this.HTMLElement("div")
            .set("id","setting-auto-start")
            .child(autoStartText.build())
            .child(checkboxAutoStart.build())

        //SETTING PANEL - Interface
        var settingsPanelInterface = this.HTMLElement("div")
            .set("class", "settings_panel")
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
        
    }
}