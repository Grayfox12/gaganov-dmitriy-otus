const PATH = require('path')
const FS_PROMISE = require('fs/promises')
const FS = require('fs')

function generateFile(){
    FS_PROMISE.mkdir(PATH.resolve(__dirname,'temp'), { recursive: true })
        .then(()=>FS_PROMISE.writeFile(PATH.resolve(__dirname,'temp','largefile'),''))
        .then(()=>{
            let _writeableFS = FS.createWriteStream(PATH.resolve(__dirname,'temp','largefile'),{  mode: 0o777, autoClose: true})
            _writeableFS.on('finish',()=> {
                console.log('finsih file')
            })
            writeUntilSize(_writeableFS,PATH.resolve(__dirname,'temp','largefile'),100000000)
        })

}

function writeUntilSize(stream,filepath,size){
    FS_PROMISE.lstat(filepath)
        .then(data=>{
            if(data.size < size) return writeChunk(stream,10000)
            else return  false;
        })
        .then(data=>{
            if(!data) {
                stream.end(`${getRandomInt(-1000,1000)}`)
                return;
            }
            return writeUntilSize(stream,filepath,size);
        })
}

function writeChunk(fsDescriptor, chunckSize) {
    return new Promise((resolve,reject) => {
        let i = chunckSize;
        write();
        function write() {
            let ok = true;
            do {
                i--;
                if (i === 0) {
                    fsDescriptor.write(`${getRandomInt(-1000,1000)}\n`, (err,data)=>{
                        if(err)reject(err)
                        resolve(true)
                    });
                } else {
                    ok = fsDescriptor.write(`${getRandomInt(-1000,1000)}\n`,);
                }
            } while (i > 0 && ok);
            if (i > 0) {
                fsDescriptor.once('drain', write);
            }
        }
    })

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)+min);
}

generateFile()
