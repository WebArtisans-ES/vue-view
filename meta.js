var exec = require('child_process').exec;
var fs = require('fs');

module.exports = {
	helpers: {
		lowercase: str => str.toLowerCase(),
		capitalize: str => str.charAt(0).toUpperCase() + str.slice(1)
	},
	prompts: {
		"name": {
			"type": "string",
			"required": true,
			"message": "Component name"
		},
		"description": {
			"type": "string",
			"required": false,
			"message": "Component description",
			"default": "A Vue.js component"
		},
		"author": {
			"type": "string",
			"message": "Author"
		},
		"jspreprocesor": {
			"type": "confirm",
			"message": "Do you want some Script PreProcessor?",
			"default": false
		},
		"script": {
			"when": "jspreprocesor",
			"type": "list",
			"required": true,
			"choices": [
				{
					"name": "JS",
					"value": "js",
					"short": "JS"
				},
				{
					"name": "Coffee Script",
					"value": "coffee",
					"short": "Coffe"
				}
			]
		},
		"stylepreprocesor": {
			"type": "confirm",
			"message": "Do you want some Style PreProcessor?",
			"default": false
		},
		"style": {
			"when": "stylepreprocesor",
			"type": "list",
			"required": true,
			"choices": [
				{
					"name": "CSS",
					"value": "css",
					"short": "CSS"
				},
				{
					"name": "LESS",
					"value": "less",
					"short": "LESS"
				},
				{
					"name": "SASS",
					"value": "sass",
					"short": "Sass"
				},
				{
					"name": "STYLUS",
					"value": "styl",
					"short": "Stylus"
				}
			]
		}
	},
	filters: {
		"component.styl": "stylepreprocesor && style === 'styl'",
		"component.sass": "stylepreprocesor && style === 'sass'",
		"component.scss": "stylepreprocesor && style === 'scss'",
		"component.less": "stylepreprocesor && style === 'less'",
		"component.css": "!stylepreprocesor || (stylepreprocesor && style === 'css')",
		"component.js": "!jspreprocesor || (jspreprocesor && script === 'js')",
		"component.coffee": "jspreprocesor && script === 'coffee'"
	},
	complete (data, {logger, chalk, files}) {
		// Convert the name to SnakeCase
		let name = data.name
		let CapitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

		// Default Directory
		let destDirName = `./`

		// Incase a directory is provided change the directory
		if (!data.inPlace) {
			destDirName += data.destDirName
		}


		// Iterate over all the files
		Object.keys(files).forEach((key) => {
			// Search for the files with "component"
			let pos = key.search("component")

			// If the file has component in the name
			if (pos != -1) {
				// Get the extension
				let ext = key.substr(9, (key.length - 1))

				// Unless its ".vue" file rename it to the component name
				fs.rename(`${destDirName}/component${ext}`, `${destDirName}/${CapitalizedName}${ext}`, (err) => {})
			}
		})
	}
}
