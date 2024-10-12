import { pipeline } from "node:stream/promises";
import fs from 'node:fs';
import zlib from 'node:zlib';

// pipeline的promise控制
async function run() {
    try {
        await pipeline(fs.createReadStream('hello.txt'), zlib.createGzip(), fs.createWriteStream())
    } catch(err) {
        console.error('Pipeline failed!', err);
    }
}