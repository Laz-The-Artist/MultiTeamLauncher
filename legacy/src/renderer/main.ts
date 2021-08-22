import {ipcRenderer, IpcRendererEvent} from 'electron'
import { GameTab } from './main/games'
import { Tab } from './main/main'
import { ModsTab } from './main/mods'
import { AccountSettingsTab, GeneralSettingsTab, SettingsSubTab, SettingsTab } from './main/settings'
import { FriendsTab, GroupsTab, SocialSubTab, SocialTab } from './main/social'

export class MainWindow {
    private tabs: Tab[]
    private socialTabs: SocialSubTab[]
    private settingsTabs: SettingsSubTab[]

    private currentTab: number
    private currentSocialTab: number = 0
    private currentSettingsTab: number = 0

    private accountManage = false

    private clientSettings: any = {}

    constructor() {
        this.on("client-settings", (even, data) => {
            this.clientSettings = JSON.parse(data["settings"])
            if (!this.currentTab) this.setTab(this.clientSettings["defaultStartTab"])
        })
        this.send("client-settings", {})

        this.on("get-username", (even, data) => {
            this.getElement("account-preview-username").innerHTML = data["username"]
            this.getElement("account-preview-status").innerHTML = data["status"]
        })

        this.send("get-username", {})


        this.tabs = [new GameTab(this), new ModsTab(this), new SocialTab(this), new SettingsTab(this)]
        this.socialTabs = [new FriendsTab(this), new GroupsTab(this)]
        this.settingsTabs = [new GeneralSettingsTab(this), new AccountSettingsTab(this)]

        for (let i = 0; i < this.tabs.length; i++) {
            this.getElement("header-" + this.tabs[i].getName()).onclick = () => this.setTab(i)
        }

        for (let i = 0; i < this.socialTabs.length; i++) {
            this.getElement("sub-header-" + this.socialTabs[i].getName()).onclick = () => this.setSocialTab(i)
        }

        for (let i = 0; i < this.settingsTabs.length; i++) {
            this.getElement("sub-header-" + this.settingsTabs[i].getName()).onclick = () => this.setSettingsTab(i)
        }

        this.getElement("account-manage").onclick = () => {
            this.getElement("account-preview-dropdown").setAttribute("class", "account-preview-dropdown_showed")
            this.accountManage = true
        }

        document.addEventListener("click", (mEvent) => {
            var target = mEvent.target || mEvent.srcElement || mEvent.currentTarget;

            var yes = !this.getElement("account-preview-dropdown").contains((<Node>target))
            && !this.getElement("account-manage").contains((<Node>target))

            if (this.accountManage && yes) {
                this.accountManage = false
                document.getElementById("account-preview-dropdown").setAttribute("class", "account-preview-dropdown")
            }
        })
    }

    getClientSettings() {
        return this.clientSettings
    }

    setClientSettingsField(field: string, value: any) {
        this.clientSettings[field] = value

        this.send("client-settings-update", {settings: JSON.stringify(this.clientSettings)})
    }

    getTabArray(): Tab[] {
        return this.tabs
    }

    getCurrentSocialTab() {
        return this.currentSocialTab
    }

    getCurrentSettingsTab() {
        return this.currentSettingsTab
    }

    getCurrentTab() {
        return this.currentTab
    }

    setTab(tabIndex: number) {
        if (tabIndex == undefined || tabIndex == null) {
            tabIndex = 0
            this.setClientSettingsField("defaultStartTab", 0)
        }
        
        for (let i = 0; i < this.tabs.length; i++) {
            this.getElement("header-" + this.tabs[i].getName()).setAttribute("class", "header_tab")
        }

        this.getElement("header-" + this.tabs[tabIndex].getName()).setAttribute("class", "header_tab_selected")
        this.currentTab = tabIndex
        this.loadTab(tabIndex)
    }

    setSocialTab(tabIndex: number) {
        for (let i = 0; i < this.socialTabs.length; i++) {
            this.getElement("sub-header-" + this.socialTabs[i].getName()).setAttribute("class", "header_tab_sub")
        }

        this.getElement("sub-header-" + this.socialTabs[tabIndex].getName()).setAttribute("class", "header_tab_sub_selected")
        this.currentSocialTab = tabIndex
        this.loadSocialTab(tabIndex)
    }

    setSettingsTab(tabIndex: number) {
        for (let i = 0; i < this.settingsTabs.length; i++) {
            this.getElement("sub-header-" + this.settingsTabs[i].getName()).setAttribute("class", "header_tab_sub")
        }

        this.getElement("sub-header-" + this.settingsTabs[tabIndex].getName()).setAttribute("class", "header_tab_sub_selected")
        this.currentSettingsTab = tabIndex
        this.loadSettingsTab(tabIndex)
    }

    loadSocialTab(index: number) {
        this.getElement("tab-content").innerHTML = null

        this.socialTabs[index].load()
    }

    loadSettingsTab(index: number) {
        this.getElement("tab-content").innerHTML = null

        this.settingsTabs[index].init()
        this.settingsTabs[index].load()
    }

    loadTab(index: number) {
        this.emptySidebar()
        this.getElement("tab-content").innerHTML = null

        this.tabs[index].init()

        this.tabs[index].load()
    }

    getElement(id: string) {
        return document.getElementById(id)
    }

    emptySidebar() {
        while (this.getElement("game-list").hasChildNodes()) {
            this.getElement("game-list").removeChild(this.getElement("game-list").childNodes[0])
        }
    }

    send(id: string, data: any) {
        ipcRenderer.send(id, data)
    }

    on(id: string, func: (event: IpcRendererEvent, ...args: any[]) => void) {
        ipcRenderer.on(id, func)
    }
}

class Header {
    private name: string

    constructor(name: string) {
        this.name = name
    }

    getName() {
        return this.name
    }
}

export const mainWindow = new MainWindow()