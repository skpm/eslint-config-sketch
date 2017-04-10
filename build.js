const {exec} = require('child-process-promise')
const fs = require('fs')

const now = Date.now()

exec('rm -rf .headers').catch(() => {})
.then(() => {
  console.log('[1/4] Generating Sketch headers')
  return exec('./class-dump -H /Applications/Sketch.app/Contents/MacOS/Sketch -o ./.headers -C "^[a-zA-Z]*$"')
})
.then(() => {
  console.log('[2/4] Generating macOS headers')
  return exec('./class-dump -H --sdk-mac 10.12 -o ./.headers -C "^[a-zA-Z]*$"')
})
.then(() => {
  console.log('[3/4] Reading generating files')
  return new Promise((resolve, reject) => fs.readdir('./.headers', (err, res) => {
    if (err) { return reject(err) }
    resolve(res)
  }))
})
.then((files) => {
  console.log('[4/4] Writing globals')
  const res = files.reduce((prev, f) => {
    prev[f.split('-')[0].replace('.h', '')] = false
    return prev
  }, {})

  return new Promise((resolve, reject) => fs.writeFile('./globals.json', JSON.stringify(res), (err, res) => {
    if (err) { return reject(err) }
    resolve(res)
  }))
})
.then(() => {
  console.log('Done in ' + (Date.now() - now) + 'ms!')
})
