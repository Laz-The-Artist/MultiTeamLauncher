import * as fs from 'fs'
import * as path from 'path'
import { Crypter } from './crypter';

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

    private gameLibraryLoc: string
    private autoUpdateGames: boolean = true
    private autoUpdateLauncher: boolean = true
    private limitBandwidth: boolean = true
    private limitBandwidthNumber: number = 10

    private languageCode: string = "en_us"
    private defaultStartTab: number = 0
    private runAtStartUp: boolean = true

    constructor() {}

    parse(buf: Crypter) {
        var jsonString = buf.readString()
        var json = JSON.parse(jsonString)
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

    setLanguageCode(code: string) {
        this.languageCode = code
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
}