import * as fs from 'fs'
import * as path from 'path'

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