/** @format */

const { override, useBabelRc } = require('customize-cra')
// eslint-disable-next-line no-unused-vars
const path = require('path')

module.exports = override(
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useBabelRc()
)
