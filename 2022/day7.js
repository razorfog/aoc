const fs = require('fs');

class Dir {
  constructor(name, parent) {
    this.name = name;
    this.size = 0;
    this.files = [];
    this.dirs = [];
    this.parent = parent;
  }

  getDir(name) {
    return this.dirs.find(d => d.name == name);
  }

  addFile(name, size) {
    this.size += size;
    this.files.push({name, size});
  }

  addDir(name) {
    this.dirs.push(new Dir(name, this));
  }

  getTotalSize() {
    let tsize = 0;
    for (const dd of this.dirs) {
      const xs = dd.getTotalSize();
      tsize += xs;
    }
    return this.size + tsize;
  }
}

function getDirsWithSize(xdir, size) {
  const allSizes = new Map();
  let result = 0; // part 1.
  function gdws(d) {
    const tsize = d.getTotalSize();
    allSizes.set(d, tsize);
    if (tsize <= size)
      result += tsize;
    for (const xd of d.dirs) {
      gdws(xd);
    }
  }

  gdws(xdir);
  console.log("Part1: ", result);
  return allSizes;
}

function run(input_file = 'day7.txt') {
  const lines = fs.readFileSync(input_file, 'utf8').split('\n').filter(Boolean);
  let cwd = null;
  let topDir = null;
  for (let i = 0; i < lines.length; i++) {
    const x = lines[i];
    if (x.startsWith('$')) {
      const [, cmd, arg] = x.split(' ');
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
      } else if (cmd == "ls") {
        let j;
        for (j = i + 1; j < lines.length; j++) {
          const y = lines[j];
          if (y.startsWith('$')) {
            break;
          }
          const [kind, name] = y.split(' ');
          if (kind != "dir") {
            cwd.addFile(name, Number(kind));
          } else cwd.addDir(name);
        }
        i = j - 1;
      }
    }
  }
  //traverse(topDir);
  const allSizes = getDirsWithSize(topDir, 100000);
  // part 2.
  const totalSpace = 70000000;
  const needFreeSpace = 30000000;
  const unusedSpace = totalSpace - topDir.getTotalSize();
  const needSpace = needFreeSpace - unusedSpace;
  const best = Math.min(...[...allSizes.values()].filter(sz => sz >= needSpace));
  console.log("Part 2. best = %d", best);
}

 run('day7.txt');
module.exports = {
  test: () => run('day7_test.txt'),
  run,
};
