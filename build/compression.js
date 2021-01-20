const { name, version } = require('../package.json')

const path = require('path')
const JSZIP = require('jszip')
const fs = require('fs')
const zip = new JSZIP()

function pushZip(floder, pPath) {
	const files = fs.readdirSync(pPath, { withFileTypes: true })
	files.forEach((dirent, index) => {
		let filePath = `${pPath}/${dirent.name}`
		if (dirent.isDirectory()) {
			let dir = __dirname.replace('build', '') + 'dist\\' + `${name}_${version}`
			let zipFloder = zip.folder(filePath.replace(`${dir}`, ''))
			pushZip(zipFloder, filePath)
		} else {
			floder.file(dirent.name, fs.readFileSync(filePath))
		}
	})
}

pushZip(zip, path.resolve('./dist', `./${name}_${version}`))

zip.generateAsync({
	type: 'nodebuffer',
	compression: 'DEFLATE',
	compressionOptions: {
		level: 9
	}
}).then(function (content) {
	fs.writeFile(path.resolve('./dist', `./${name}_${version}.zip`), content, err => {
		if (err) throw err
		console.log('打包文件已压缩')
	})
})
