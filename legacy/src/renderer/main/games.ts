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
            var gameIcon = this.HTMLElement("img")
                .set("src", this.testGameInfo[i].iconURL)
                .set("class", "sidebar_item_icon")
                .set("alt", "sidebar_item_icon")
                .set("draggable", "false")
    
            var downStatus = this.HTMLElement("i")
                .set("class", badgeDownload)
                .set("id", "sidebar_item_badge")
                .setStyle("color", badgeDownloadColor)
    
            var gameDiv = this.HTMLElement("div")
                .set("class", "sidebar_item")
                .setStyle("background-color", this.testGameInfo[i].color)
                .child(gameIcon.build())
                .child(downStatus.build())
                .event("click", () => {
                    this.selectGame(Number.parseInt(i))
                })
    
            this.getElement("game-list").appendChild(gameDiv.build())
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

        this.getElement("sub-header-general").style.display = "none"
        this.getElement("sub-header-account").style.display = "none"

        // <div><img src="" alt="game-icon" id="game-icon"></div>
        var iconImg = this.HTMLElement("img")
            .set("src", "")
            .set("alt", "game-icon")
            .set("id", "game-icon-img")
            .set("draggable", "false")

        var iconDiv = this.HTMLElement("div")
            .set("id", "game-icon")
            .child(iconImg.build())
    
        // <h1 id="game-title"></h1>
        var nameH1 = this.HTMLElement("h1")
            .set("id", "game-title")
    
        // <h2 id="game-version"></h2>
        var versionH2 = this.HTMLElement("h2")
            .set("id", "game-version")
    
        // <input type="submit" value="Play/Update" id="play-update" class="button_regular">
        var button = this.HTMLElement("input")
            .set("type", "submit")
            .set("value", "Play/Update")
            .set("id", "play-update")
            .set("class", "button_regular")
    
        // <div id="game-preview" style="backgroud-image: ">
        // ...
        // </div>
        var gamePreviewDiv = this.HTMLElement("div")
            .setStyle("backgroundImage", "")
            .set("id", "game-preview")
    
            .child(iconDiv.build())
            .child(nameH1.build())
            .child(versionH2.build())
            .child(button.build())
    
    
        this.getElement("tab-content").appendChild(gamePreviewDiv.build())
    
        // <h1 id="game-description-title"></h1>
        var descTitle = this.HTMLElement("h1")
            .set("id", "game-description-title")
    
        // <h4 id="game-description"></h4>
        var desc = this.HTMLElement("h4")
            .set("id", "game-description")
    
        // <div>
        // ...
        // </div>
        var descDiv = this.HTMLElement("div")
    
        descDiv.child(descTitle.build())
        descDiv.child(desc.build())
    
        this.getElement("tab-content").appendChild(descDiv.build())
    }

    getName() {
        return "games"
    }
}