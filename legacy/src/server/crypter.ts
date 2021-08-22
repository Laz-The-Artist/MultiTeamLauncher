export class Crypter {

    private buf: Buffer

    constructor(buffer?: Buffer) {
        this.buf = Buffer.alloc(0)
        if (buffer) this.buf = buffer
    }

    private shiftBytes(buf: Buffer) {
        var len = buf.length
        var newBuf = Buffer.alloc(buf.length)
        for (var i = 0; i < len; i++) {
            newBuf[i] = buf[i] ^ len
        }

        return newBuf
    }
    
    writeString(str: string) {
        var strBuf = this.shiftBytes(Buffer.from(str))
        this.writeInt(strBuf.length)
        this.buf = Buffer.concat([this.buf, strBuf])
    }

    writeInt(num: number) {
        var buffer = Buffer.alloc(4)
        buffer.writeInt32BE(num)
        this.buf = Buffer.concat([this.buf, buffer])
    }

    getBuffer() {
        return this.buf
    }
    
    clearBuffer() {
        this.buf = Buffer.alloc(0)
    }

    readInt() {
        var int = this.buf.readInt32BE()

        this.buf = this.buf.subarray(4)

        return int
    }

    readString(): string {
        var len = this.readInt()
        var strBuf = Buffer.alloc(0)
        for (var i = 0; i < len; i++) {
            strBuf = Buffer.concat([strBuf, this.buf.subarray(0, 1)])
            this.buf = this.buf.subarray(1)
        }
        if (strBuf.length != len) {
            console.error("Error, string buffer size not matching; found " + strBuf.length + " instead of " + len)
            return null
        }
        return this.shiftBytes(strBuf).toString()
    }
}