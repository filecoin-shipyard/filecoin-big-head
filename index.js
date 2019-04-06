#!/usr/bin/env node

require = require("esm")(module/*, options*/)
const importJsx = require('import-jsx')
process.env.FORCE_COLOR = '1'
importJsx('./main')
