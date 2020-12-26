import { MainWindow } from "../main";
import { Tab } from "./main";

export class GameTab extends Tab {

    testGameInfo = [
        {
            name: "JASG",
            version: {
                name: "WorldGenTest - TechDemo 1",
                versionNumber: "0.0.0"
            },
            iconURL: "./res/img/game_icon_jasg.png",
            previewURL: "./res/img/preview_jasg.png",
            descriptionTitle: "Just a survival game",
            description: "JASG is a fantasy 8-bit Survival game, within a topdown-perspective world.<br><br>This amazing new experience comes with a lot of exploration, advancing through this mysterious world, achieving magic, defeating bosses, crafting equipment and many more! Have i mentioned that its like 70% procedural?",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "Soldiers of The Office",
            version: {
                name: "N/A",
                versionNumber: "0.0.0"
            },
            iconURL: "./res/img/game_icon_soto.png",
            previewURL: "./res/img/placeholder_preview.png",
            descriptionTitle: "Description",
            description: "Soldiers of the office is a story based, 2D platformer-shooter, all about the weird war of humans against an infection that spreads with ultra-modern technology.",
            downloadURL: "",
            color: "#242735"
        },
        {
            name: "Project Freedom",
            version: {
                name: "N/A",
                versionNumber: "0.0.0"
            },
            iconURL: "./res/img/game_icon_pf.png",
            previewURL: "./res/img/placeholder_preview.png",
            descriptionTitle: "Description",
            description: "Project Freedom is a 3D game, but its not what you would expect.<br><br>This game will have a play-mode for every type of game, like minecraft, pubg, cs:go, lol, overwatch, and many more new custom or weird play-modes",
            downloadURL: "",
            color: "#009f00"
        }
    ]

    constructor(main: MainWindow) {
        super(main)
    }

    load() {
        var badgeDownload = "fas fa-arrow-alt-circle-down"
        var badgeDownloadColor = "#4CBE6A"
        var badgeUpdate = "fas fa-arrow-alt-circle-up"
        var badgeUpdateColor = "#E1E1E1"
        var badgeError = "fas fa-exclamation-circle"
        var badgeErrorColor = "#E95F66"


        for (const i in this.testGameInfo) {
            var gameIcon = document.createElement("img")
            gameIcon.setAttribute("src", this.testGameInfo[i].iconURL)
            gameIcon.setAttribute("class", "sidebar_item_icon")
            gameIcon.setAttribute("alt", "sidebar_item_icon")
            gameIcon.setAttribute("draggable", "false")
    
            var downStatus = document.createElement("i")
            downStatus.setAttribute("class", badgeDownload)
            downStatus.setAttribute("id", "sidebar_item_badge")
            downStatus.style.color = badgeDownloadColor
    
            var gameDiv = document.createElement("div")
            gameDiv.setAttribute("class", "sidebar_item")
            gameDiv.style.backgroundColor = this.testGameInfo[i].color
            gameDiv.appendChild(gameIcon)
            gameDiv.appendChild(downStatus)
            gameDiv.onclick = () => {
                this.selectGame(Number.parseInt(i))
            }
    
            this.getElement("game-list").appendChild(gameDiv)
        }

        this.selectGame(0)

    }

    selectGame(id: number) {
        this.getElement("game-preview").style.backgroundImage = "url(" + this.testGameInfo[id].previewURL + ")"
        this.getElement("game-icon-img").setAttribute("src", this.testGameInfo[id].iconURL)
        this.getElement("game-icon").style.backgroundColor = this.testGameInfo[id].color
        this.getElement("game-title").innerHTML = this.testGameInfo[id].name
        this.getElement("game-version").innerHTML = this.testGameInfo[id].version.name
        this.getElement("game-description-title").innerHTML = this.testGameInfo[id].descriptionTitle
        this.getElement("game-description").innerHTML = this.testGameInfo[id].description
    }

    init() {
        this.getElement("tab-content").setAttribute("class", "content_games")

        this.getElement("game-list").setAttribute("class", "sidebar")
        
        this.getElement("sub-header-friends").style.display = "none"
        this.getElement("sub-header-groups").style.display = "none"
        this.getElement("add-friend").style.display = "none"

        // <div><img src="" alt="game-icon" id="game-icon"></div>
        var iconImg = document.createElement("img")
        iconImg.setAttribute("src", "")
        iconImg.setAttribute("alt", "game-icon")
        iconImg.setAttribute("id", "game-icon-img")
        iconImg.setAttribute("draggable", "false")

        var iconDiv = document.createElement("div")
        iconDiv.setAttribute("id", "game-icon")
        iconDiv.appendChild(iconImg)
    
        // <h1 id="game-title"></h1>
        var nameH1 = document.createElement("h1")
        nameH1.innerHTML = ""
        nameH1.setAttribute("id", "game-title")
    
        // <h2 id="game-version"></h2>
        var versionH2 = document.createElement("h2")
        versionH2.innerHTML = ""
        versionH2.setAttribute("id", "game-version")
    
        // <input type="submit" value="Play/Update" id="play-update" class="button_regular">
        var button = document.createElement("input")
        button.setAttribute("type", "submit")
        button.setAttribute("value", "Play/Update")
        button.setAttribute("id", "play-update")
        button.setAttribute("class", "button_regular")
    
        // <div id="game-preview" style="backgroud-image: ">
        // ...
        // </div>
        var gamePreviewDiv = document.createElement("div")
        gamePreviewDiv.style.backgroundImage = ""
        gamePreviewDiv.setAttribute("id", "game-preview")
    
        gamePreviewDiv.appendChild(iconDiv)
        gamePreviewDiv.appendChild(nameH1)
        gamePreviewDiv.appendChild(versionH2)
        gamePreviewDiv.appendChild(button)
    
    
        this.getElement("tab-content").appendChild(gamePreviewDiv)
    
        // <h1 id="game-description-title"></h1>
        var descTitle = document.createElement("h1")
        descTitle.innerHTML = ""
        descTitle.setAttribute("id", "game-description-title")
    
        // <h4 id="game-description"></h4>
        var desc = document.createElement("h4")
        desc.innerHTML = ""
        desc.setAttribute("id", "game-description")
    
        // <div>
        // ...
        // </div>
        var descDiv = document.createElement("div")
    
        descDiv.appendChild(descTitle)
        descDiv.appendChild(desc)
    
        this.getElement("tab-content").appendChild(descDiv)
    }
}