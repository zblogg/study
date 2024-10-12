import { createGzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";

const gzip = createGzip();

const inp = createReadStream('hello.txt');
const out = createWriteStream('hello.txt.gz');

// 使用流 read --> zip --> write
inp.pipe(gzip).pipe(out);
