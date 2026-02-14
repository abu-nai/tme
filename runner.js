// Will hold code to implement all file collection, but will also call functions that deal with environment set up and file execution.

const fs = require('fs');
const path = require('path');

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath);

        for (let file of files) {
            // convert simple file name to full absolute path/name of file.
            const filepath = path.join(targetPath, file);

            const stats = await fs.promises.lstat(filepath);

            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({ name: filepath })
            } else if (stats.isDirectory()) {
                const childFiles = await fs.promises.readdir(filepath);
                
                // since childFiles is also an array, we don't want to push it as is. Use ... syntax to pull out whatever is INSIDE the childFiles array and push those to files array.
                // path.join(file, f) to make sure that we are pushing the entire path to the array and not just the simple titles returned to us from fs.readdir
                files.push(...childFiles.map(f => path.join(file, f)));
            }
        }
    }
}

module.exports = Runner;