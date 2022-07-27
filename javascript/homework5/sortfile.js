const v8 = require('v8')

let logstat = v8.getHeapStatistics()
const ALLOWED_SPACE = logstat.total_available_size * 0.4;
const FOR_BUFFERS = ALLOWED_SPACE/2;

const PATH = require('path')
const FS_PROMISE = require('fs/promises')
const FS = require('fs')
const Stream = require('stream');

const ALLOW_ELEMENTS = Math.trunc((ALLOWED_SPACE/32))
let elemcount = 0

function GENID(){return  "id_" + Math.random().toString(16).slice(2)}

class SortInputArray extends Stream.Transform{
    constructor(options) {
        super(options);
        this.buff = []
        this.lastdigit;
    }
    _transform(chunk, encoding, done){
        let _string = (this.lastdigit && this.lastdigit+chunk.toString() || chunk.toString()).split('\n')
        this.lastdigit = _string.pop()
        this.buff =  this.buff.concat(_string.map(value => Number(value)))
        if(this.buff.length> ALLOW_ELEMENTS) {
            console.log('end sort')
            elemcount += this.buff.length
            this.buff.sort((a,b)=>a-b)
            this.push(this.buff)
            this.buff = []
        }
        done()

    }

    _flush(done){
        if (this.lastdigit) this.buff= this.buff.concat(Number(this.lastdigit))
        this.lastdigit = null
        this.buff.sort((a,b)=>a-b)
        elemcount += this.buff.length
        done(null, this.buff)
    }
}

class OneELementStream extends Stream.Transform{
    constructor(options) {
        super(options);
        this.buff = []
        this.lastdigit;
    }
    _transform(chunk, encoding, done){
        let _string = (this.lastdigit && this.lastdigit+chunk.toString() || chunk.toString()).split('\n')
        this.lastdigit = _string.pop()
        this.buff =  this.buff.concat(_string.map(value => Number(value)))
        while(this.buff.length) this.push(this.buff.shift())
        done()

    }
    _flush(done){
        if (this.lastdigit) this.buff= this.buff.concat(Number(this.lastdigit))
        while(this.buff.length) this.push(this.buff.shift())
        done()
    }
}

function createPresortChunks(){
    let outputchunks = []
    let _handles = 0
    let isfinishRead = false;
    let numbersStream = new SortInputArray({ objectMode: true })
    let readableBigFile = FS.createReadStream(PATH.resolve(__dirname,'temp','largefile'), {encoding:'utf-8'/*,highWaterMark: 8196*/});
    readableBigFile.pipe(numbersStream)
    numbersStream.on('data', (chunk)=>{
        let path = PATH.resolve(__dirname,'temp',`chunk_${GENID()}`)
        outputchunks.push(path)
        _handles ++
        FS_PROMISE.writeFile(path, chunk.join('\n')).then((err)=>{
            _handles--
            if(_handles == 0 && isfinishRead) {
                //TODO: run sort fn
                mergeSort(outputchunks)
            }
        })
    })
    numbersStream.on('close', ()=>{
        isfinishRead = true
        if(_handles == 0) {
            //TODO: run sort fn
            mergeSort(outputchunks)
        }
    })
}

function mergeSort(outputchunks){
    let elems = 0;
    console.log('start sort')
    let sortOutputFile = FS.createWriteStream(PATH.resolve(__dirname,'temp','outputlargefile'),{  mode: 0o777, autoClose: true});
    let outputelemsbuff = []
    let writeToFile = ()=>{
        let _min,_pos;
        if(_numbers.length){
            _min = Math.min(...(_numbers.map(item => item.value)))
            _pos = _numbers.find(_elme => _elme.value === _min)
            _numbers = _numbers.filter(_elme => _elme != _pos)
            outputelemsbuff.push(_min)
        }
        if(outputelemsbuff.length > 10000) {
            sortOutputFile.write(outputelemsbuff.join('\n')+'\n',()=>{
                elems+= outputelemsbuff.length
                console.log(`sort ${elems} of ${elemcount}`)
                outputelemsbuff = []
                if(_pos){
                    semaphores[_pos.index] = false;
                    _streams[_pos.index].resume();
                }
            })
        }
        else{
            if(_pos && semaphores[_pos.index] !== null) {
                semaphores[_pos.index] = false;
                _streams[_pos.index].resume();
            }
            else if(_numbers.length){
                writeToFile()
            }
            else if(outputelemsbuff.length){
                sortOutputFile.end(outputelemsbuff.join('\n'),()=>{
                    elems+= outputelemsbuff.length
                    outputelemsbuff = []
                    console.log(`end sort ${elems} of ${elemcount}`)
                    console.log('end write file')
                    removeChunks(outputchunks)
                })
            }
            else if(!outputelemsbuff.length){
                sortOutputFile.end('',()=>{
                    console.log('end write file')
                    removeChunks(outputchunks)
                })
            }
        }
    }
    let semaphores = new Array(outputchunks.length).fill(false)
    let _numbers = []
    let _streams = new Array(outputchunks.length)
    let buffer_length = FOR_BUFFERS/32;
    outputchunks.forEach((path,index)=>{
        let _rs = FS.createReadStream(PATH.resolve(path),{encoding:'utf8',highWaterMark: 8192});
        let _readLineRs = new OneELementStream({ objectMode: true})
        _rs.pipe(_readLineRs)
        _streams[index] = _readLineRs;
        _readLineRs.on('data', (chunkdata) => {
            semaphores[index] = true;
            _numbers.push({value:Number(chunkdata), index: index});
            _readLineRs.pause()
            if(!(semaphores.filter(flag=>flag!=null)).some(flag=>!flag)) writeToFile()
        });
        _readLineRs.on('end', () => {
            semaphores[index] = null;
            if(!(semaphores.filter(flag=>flag!=null)).some(flag=>!flag)) {
                writeToFile()
            }
        });
    })

}

function removeChunks(chunks){
    for(let chunk of chunks){
        FS_PROMISE.rm(chunk,{force: true, maxRetries: 2, retryDelay: 1000})
            .then((data)=>console.log('chunk delete'))
            .catch(err=>console.log('chunk delete fail'))
    }
}


createPresortChunks()
