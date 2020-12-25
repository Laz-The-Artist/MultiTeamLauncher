import {ipcRenderer} from 'electron'
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
    }

    getCurrentSocialTab() {
        return this.currentSocialTab
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

        if (index == 2) {
            this.getElement("game-list").setAttribute("class", "sidebar_hidden")
        
            this.getElement("sub-header-friends").style.display = "inline-block"
            this.getElement("sub-header-groups").style.display = "inline-block"
            this.getElement("add-friend").style.display = "inline-block"
        } else {
            this.getElement("game-list").setAttribute("class", "sidebar")
        
            this.getElement("sub-header-friends").style.display = "none"
            this.getElement("sub-header-groups").style.display = "none"
            this.getElement("add-friend").style.display = "none"
        }
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