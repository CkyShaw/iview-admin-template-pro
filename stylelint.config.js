module.exports = {
	extends: ['stylelint-plugin-stylus/standard', 'stylelint-config-prettier'],
	rules: {
		'at-rule-name-space-after': null,
		'stylus/no-eol-whitespace': null,
		'stylus/property-no-unknown': null,
		'stylus/selector-type-no-unknown': null,
		'stylus/declaration-colon': 'always',
		'stylus/indentation': 'tab',
		'stylus/media-feature-colon': 'always',
		'stylus/pythonic': 'never',
		'stylus/selector-list-comma': 'always',
		'stylus/semicolon': 'always',
		'unit-case': null
	}
}
