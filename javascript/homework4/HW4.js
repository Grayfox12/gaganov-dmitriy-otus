const {EventEmitter} = require('events')
const PATH = require('path')
const fs = require('fs/promises')

function tree(root){
    const EventBus = new EventEmitter();
    let npmArgs = process.argv;
    let entries = {
        files:[],
        folders:[]
    }
    let _pending = 0;
    let doneStep = () => {
        if(--_pending === 0) EventBus.emit('end')
    }
    let walk =(_path)=>{
        _pending++;
        fs.lstat(_path)
            .then(stat=>{
                if(stat.isDirectory()){

                    fs.readdir(_path)
                        .then(files=>{
                            EventBus.emit('dir',_path,stat)
                            files.forEach((subpath)=>{
                                walk(PATH.join(_path, subpath))
                            })
                            doneStep()
                        })
                        .catch(err=>{
                            EventBus.emit('error',err,_path)
                            doneStep()
                        })
                }else if (stat.isFile()) {
                    EventBus.emit('file', _path, stat)
                    doneStep()
                }
                else{
                    EventBus.emit('other', _path, stat)
                    doneStep()
                }
            })
            .catch(err=>{
                EventBus.emit('error',err,_path)
                doneStep()
            })

    }

    return new Promise(resolve => {
        EventBus.on('dir',(path,stat)=>entries.folders.push(path))
        EventBus.on('file',(path,stat)=>entries.files.push(path))
        EventBus.on('end',()=>resolve(entries))
        walk(root)
    })
}

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
const rootPath = process.argv[2];
tree(rootPath)
.then(console.log)
