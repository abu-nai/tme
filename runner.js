// Will hold code to implement all file collection, but will also call functions that deal with environment set up and file execution.

const fs = require('fs');
const path = require('path');
const chalk = require('chalk').default;
const render = require('./render');

const forbiddenDirs = ['node_modules'];

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.grey(`----- ${file.shortName} -----`))
            const beforeEaches = [];
            global.render = render;
            global.beforeEach = (fn) => {
                beforeEaches.push(fn);
            };
            global.it = async (desc, fn) => {
                beforeEaches.forEach(func => func());
                try {
                    await fn();
                    console.log(chalk.green(`\tOK - ${desc}`));
                } catch (err) {
                    // sets error message to variable and globally replaces every new line with a new line + two indentation tabs
                    const message = err.message.replace(/\n/g, '\n\t\t')
                    console.log(chalk.red(`\tX - ${desc}`));
                    console.log(chalk.red(`\t`, message));
                }
            };

            // When we call require on 'file.name', which is a path to a test file, Node is going to load up all of the code inside of it and execute it.
            try {
                require(file.name);
            } catch (err) {
                console.log(chalk.green(`\tX - Error Loading File`, file.name));
                console.log(chalk.red(`\t`, err.message));
            }
        }
    }

    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath);

        for (let file of files) {
            // convert simple file name to full absolute path/name of file.
            const filepath = path.join(targetPath, file);

            const stats = await fs.promises.lstat(filepath);

            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({ name: filepath, shortName: file })
            } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
                const childFiles = await fs.promises.readdir(filepath);
                
                // since childFiles is also an array, we don't want to push it as is. Use ... syntax to pull out whatever is INSIDE the childFiles array and push those to files array.
                // path.join(file, f) to make sure that we are pushing the entire path to the array and not just the simple titles returned to us from fs.readdir
                files.push(...childFiles.map(f => path.join(file, f)));
            }
        }
    }
}

module.exports = Runner;