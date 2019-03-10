const fs = require('fs');

const readFile = (path, opts = 'utf8') =>
    new Promise((resolve, reject) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    })

const writeFile = (path, data, opts = 'utf8') =>
    new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), opts, (err) => {
            if (err) reject(err);
            else resolve(data);
        })
    })

module.exports = {
    readFile,
    writeFile
}