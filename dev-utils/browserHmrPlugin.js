const webpack = require('webpack')
const { createServer } = require('http')
const { default: SseStream } = require('ssestream')
const { pipeline } = require('stream')

module.exports = class BrowserHmrPlugin {
  constructor(port = 5058) {
    this.port = port
  }

  apply(compiler) {
    new webpack.HotModuleReplacementPlugin().apply(compiler)

    let latestHash
    const streams = []

    createServer(async (req, res) => {
      const stream = new SseStream(req)

      res.setHeader('Access-Control-Allow-Origin', '*')

      pipeline(stream, res, () => {
        res.end()
        const index = streams.indexOf(stream)
        if (index !== -1) {
          streams.splice(index, 1)
        }
      })

      streams.push(stream)

      if (latestHash) {
        stream.write({ event: 'check', data: latestHash })
      }
    }).listen(this.port)

    compiler.hooks.done.tap(this.constructor.name, stats => {
      latestHash = stats.hash

      streams.forEach(stream => {
        stream.write({ event: 'check', data: latestHash })
      })
    })

    compiler.hooks.entryOption.tap(this.constructor.name, (context, entry) => {
      Object.values(entry).forEach(entryValue => {
        entryValue.import.unshift(
          `./dev-utils/browserHmrClient.js?${this.port}`,
        )
      })
    })
  }
}
