import { pipeline } from "stream";
import fs from 'node:fs';
import zlib from 'node:zlib';

// 使用pipeline API更容易管道化一系列的流，这些流完成后会通知

pipeline(
    fs.createReadStream('hello.txt'),
    zlib.createGzip(),
    fs.createWriteStream('hello.txt.gz'),
    err => {
        if (err) {
            console.error('Pipeline failed', err);
        } else {
            console.log('Pipeline succeeded')
        }
    }
)