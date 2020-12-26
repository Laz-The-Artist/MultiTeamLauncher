import {ipcRenderer, IpcRendererEvent} from 'electron'
import { GameTab } from './main/games'
import { Tab } from './main/main'
import { ModsTab } from './main/mods'
import { SettingsTab } from './main/settings'
import { FriendsTab, GroupsTab, SocialSubTab, SocialTab } from './main/social'

export class MainWindow {
    private tabs: Tab[]
    private socialTabs: SocialSubTab[]

    private currentTab: number
    private currentSocialTab: number = 0

    private accountManage = false

    private accountManagePos: any

    constructor() {
        this.tabs = [new GameTab(this), new ModsTab(this), new SocialTab(this), new SettingsTab(this)]
        this.socialTabs = [new FriendsTab(this), new GroupsTab(this)]

        this.setTab(0)

        for (let i = 0; i < Tabs.length; i++) {
            this.getElement("header-" + Tabs[i].getName()).onclick = () => this.setTab(i)
        }

        for (let i = 0; i < SocialTabs.length; i++) {
            this.getElement("sub-header-" + SocialTabs[i].getName()).onclick = () => this.setSocialTab(i)
        }

        this.send("get-username", {})
        this.on("get-username", (even, data) => {
            this.getElement("account-preview-username").innerHTML = data["username"]
            this.getElement("account-preview-status").innerHTML = data["status"]
        })

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

    getCurrentSocialTab() {
        return this.currentSocialTab
    }

    getCurrentTab() {
        return this.currentTab
    }

    setTab(tabIndex: number) {
        for (let i = 0; i < Tabs.length; i++) {
            this.getElement("header-" + Tabs[i].getName()).setAttribute("class", "header_tab")
        }

        this.getElement("header-" + Tabs[tabIndex].getName()).setAttribute("class", "header_tab_selected")
        this.currentTab = tabIndex
        this.loadTab(tabIndex)
    }

    setSocialTab(tabIndex: number) {
        for (let i = 0; i < SocialTabs.length; i++) {
            this.getElement("sub-header-" + SocialTabs[i].getName()).setAttribute("class", "header_tab_sub")
        }

        this.getElement("sub-header-" + SocialTabs[tabIndex].getName()).setAttribute("class", "header_tab_sub_selected")
        this.currentSocialTab = tabIndex
        this.loadSocialTab(tabIndex)
    }

    loadSocialTab(index: number) {
        this.getElement("tab-content").innerHTML = null

        this.socialTabs[index].load()
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

export const Tabs = [
    new Header("games"),
    new Header("mods"),
    new Header("social"),
    new Header("settings")
]

export const SocialTabs = [
    new Header("friends"),
    new Header("groups")
]

export const mainWindow = new MainWindow()