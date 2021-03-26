import * as fs from 'fs'
import * as path from 'path'
import { Crypter } from './crypter'
import * as xdg from '@folder/xdg';

export class DataStorage {
    private dataFolder: string;

    constructor(dataFolder: string) {
        this.dataFolder = dataFolder
    }

    async writeFile(filePath: string, content: any) {
        var buf: Buffer = Buffer.alloc(0)
        if (content instanceof Buffer) buf = content
        else buf = Buffer.from(content)
        await fs.writeFileSync(path.join(this.dataFolder, filePath), this.shiftBytes(buf))
    }

    private shiftBytes(buf: Buffer) {
        var len = buf.length
        var newBuf = Buffer.alloc(buf.length)
        for (var i = 0; i < len; i++) {
            newBuf[i] = buf[i] ^ len
        }

        return newBuf
    }

    async readFile(filePath: string) {
        return this.shiftBytes(await fs.readFileSync(path.join(this.dataFolder, filePath)))
    }

    async fileExist(filePath: string) {
        return await fs.existsSync(path.join(this.dataFolder, filePath))
    }
}

export class ClientSettings {

    private gameLibraryLoc: string = ClientSettings.getDefaultGameLibraryPath();
    private autoUpdateGames: boolean = true
    private autoUpdateLauncher: boolean = true
    private limitBandwidth: boolean = true
    private limitBandwidthNumber: number = 10

    private languageCode: number = 0
    private defaultStartTab: number = 0
    private runAtStartUp: boolean = true

    constructor() {}

    read(buf: Crypter) {
        var jsonString = buf.readString()
        var json = JSON.parse(jsonString)
        this.fromJson(json)
    }

    fromJson(json: any) {
        this.gameLibraryLoc = json["gameLibraryLoc"]
        this.autoUpdateGames = json["autoUpdateGames"]
        this.autoUpdateLauncher = json["autoUpdateLauncher"]
        this.limitBandwidth = json["limitBandwidth"]
        this.limitBandwidthNumber = json["limitBandwidthNumber"]
        
        this.languageCode = json["languageCode"]
        this.defaultStartTab = json["defaultStartTab"]
        this.runAtStartUp = json["runAtStartUp"]
    }

    write(buf: Crypter): Crypter {
        buf.writeString(JSON.stringify(this))

        return buf
    }

    getGameLibraryLoc() {
        return this.gameLibraryLoc
    }

    setGameLibraryLoc(loc: string) {
        this.gameLibraryLoc = loc
        return this
    }

    isAutoUpdatingGames() {
        return this.autoUpdateGames
    }

    setAutoUpdateGames(bol: boolean) {
        this.autoUpdateGames = bol
        return this
    }

    isAutoUpdatingLauncher() {
        return this.autoUpdateLauncher
    }

    setAutoUpdateLauncher(bol: boolean) {
        this.autoUpdateLauncher = bol
        return this
    }

    isLimitBandwidth() {
        return this.limitBandwidth
    }

    setLimitBandwidth(bol: boolean) {
        this.limitBandwidth = bol
        return this
    }

    getLimitBandwidthAmount() {
        return this.limitBandwidthNumber
    }

    setLimitBandwidthAmount(amount: number) {
        this.limitBandwidthNumber = amount
        return this
    }

    getLanguageCode() {
        return this.languageCode
    }

    setLanguageCode(codeIndex: number) {
        this.languageCode = codeIndex
        return this
    }

    getDefaultTab() {
        return this.defaultStartTab
    }

    setDefaultTab(index: number) {
        this.defaultStartTab = index
        return this
    }

    isRunningAtStartup() {
        return this.runAtStartUp
    }

    setRunAtStartup(bool: boolean) {
        this.runAtStartUp = bool
        return this
    }

    static getDefaultGameLibraryPath(): string {
        const user_dirs = xdg.userdirs.expand();
        const dirs = user_dirs.dirs();
        const home_dir = xdg.userdirs.home();

        return process.platform == "linux" ? path.join(home_dir, ".multiteam") : path.join(dirs["XDG_DOCUMENTS_DIR"], "MultiTeam")
    }
}