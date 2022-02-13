const { spawn } = require('child_process')

module.exports = class ServerStartPlugin {
  constructor() {
    this.server = null
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, () => {
      if (this.server) {
        process.kill(this.server.pid)
      }

      this.server = spawn('node', ['.'], { stdio: 'inherit' })
    })
  }
}
