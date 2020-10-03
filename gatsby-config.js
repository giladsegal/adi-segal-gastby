require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

require("ts-node").register()

module.exports = require('./gatsby-config.ts');