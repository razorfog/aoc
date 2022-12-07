const fs = require('fs');

class Dir {
    constructor(name, parent) {
        this.name = name;
        this.size = 0;
        this.files = [];
        this.dirs = [];
        this.parent = parent;
    }

    getFullName() {
        return (this.parent == null) ? this.name : this.parent.getFullName() + "/" + this.name;
    }
    getDir(name) {
        return this.dirs.find(d => d.name == name);
    }

    getFile(name) {
        return this.files.find(f => f.name == name);
    }
    addFile(name, size) {
        const exist = this.getFile(name);
        if (exist) {
            throw new Exception("duplicate file");
        }
        this.size += size;
        this.files.push({name, size});
    }
    addDir(name) {
        const exist = this.getDir(name);
        if (exist) {
            throw new Exception(`Duplicate dir ${name}`);
        }
        this.dirs.push(new Dir(name, this));
    }

    getSize() { return this.size; }
    getTotalSize() {
        let tsize = 0;
        for (const dd of this.dirs) {
            const xs = dd.getTotalSize();
            tsize += xs;
        }
        return this.size + tsize;
    }
}

function getDirsWithSize(xdir, size, result) {
    const allSizes = new Map();
    function gdws(d) {
        const tsize = d.getTotalSize();
        allSizes.set(d, tsize);
        if (tsize <= size)
           result.set(d, tsize);
        else {
            console.log("+++ %s overlimit: %d", d.name, tsize);
        }
        for (const xd of d.dirs) {
            gdws(xd);
        }
    }
    gdws(xdir);
    console.log("---- ok DIRS ----");
    let tsize = 0;
    for (const [k,v] of result.entries()) {
        console.log("dir %s => %d", k.name, v);
        tsize += v;
    }
    console.log("Part1: ", tsize);
    return allSizes;
}

function traverse(xdir, level = "- ") {
    console.log("%s%s (dir) size = %d", level, xdir.name, xdir.getTotalSize());
    const nextLevel = "  " + level;
    for (const d of xdir.dirs) {
        traverse(d, " " + nextLevel);
    }
    for (const f of xdir.files) {
        console.log("%s%s (file, size=%d)",nextLevel, f.name, f.size);
    }
}
function run(input_file = 'day7.txt') {
    const lines = fs.readFileSync(input_file, 'utf8').split('\n').filter(Boolean);
    let cwd = null;
    let topDir = null;
    for (let i = 0; i < lines.length; i++) {
        const x = lines[i];
        if (x.startsWith('$')) {
            const [cmd, arg] = x.substring(2).split(' ');
            if (cmd == "cd") {
                if (arg == "/") {
                    if (topDir == null)
                        topDir = new Dir(arg, null);
                    cwd = topDir;
                } else if (arg == "..") {
                    cwd = cwd.parent;
                } else {
                    cwd = cwd.getDir(arg);
                    if (!cwd) {
                        console.error("No such dir %s", arg);
                    }
                }
            }
            else if (cmd == "ls") {
                let j;
                for (j = i+1; j < lines.length; j++) {
                    const y = lines[j];
                    if (y.startsWith('$')) {
                        break;
                    }
                    const [kind, name ] = y.split(' ');
                    if (kind != "dir") {
                        cwd.addFile(name, Number(kind));
                    } else cwd.addDir(name);
                }
                i = j-1;
            }
        }
    }
    //traverse(topDir);
    const result = new Map();
    const allSizes = getDirsWithSize(topDir, 100000, result);
    const totalSpace = 70000000;
    const needFreeSpace = 30000000;
    const unusedSpace = totalSpace - topDir.getTotalSize();
    const needSpace = needFreeSpace - unusedSpace;
    console.log("Need %d", needSpace);
    let closest = totalSpace;
    let bestDir;
    for (const [d, size] of allSizes.entries() ) {
        if (size > needSpace && size < closest) {
            closest = size;
            bestDir = d;
        }
    }
    console.log("best path: %s. Size = %d", bestDir.getFullName(), closest);
}

// run('day7.txt');
module.exports = {
    test: () => run('day7_test.txt'),
    run,
};
