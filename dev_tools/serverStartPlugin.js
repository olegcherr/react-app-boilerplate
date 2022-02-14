const { spawn } = require('child_process')

module.exports = class ServerStartPlugin {
  constructor() {
    this.server = null
  }

  apply(compiler) {
    let restartTimer

    compiler.hooks.done.tap(this.constructor.name, () => {
      clearTimeout(restartTimer)

      restartTimer = setTimeout(
        () => {
          if (this.server) {
            process.kill(this.server.pid)
          }

          this.server = spawn('node', ['.'], { stdio: 'inherit' })
        },
        // Add a little delay before restarting the server.
        // It needed to allow the client to fetch updated assets.
        this.server ? 1000 : 0,
      )
    })
  }
}
