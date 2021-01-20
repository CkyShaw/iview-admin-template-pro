'use strict'

const { series, src, dest } = require('gulp')
const { name, version } = require('../package.json')

function copyChangelog() {
	return src('../CHANGELOG.md').pipe(dest(`../dist/${name}_${version}`))
}

exports.build = series(copyChangelog)
