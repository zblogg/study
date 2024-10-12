import { Readable } from "node:stream";

const myReadableStream = new Readable({
    objectMode: true,
    read(size) {
        this.push({message: 'Hello, world!'});
        // 标记流结束
        this.push(null);
    }
});
myReadableStream.on('data', chunk => {
    console.log(chunk);
});