if (import.meta.webpackHot) {
  function whenIdle(cb) {
    if (import.meta.webpackHot.status() === 'idle') {
      cb()
      return
    }

    function statusHandler(status) {
      if (status === 'idle') {
        cb()
        import.meta.webpackHot.removeStatusHandler(statusHandler)
      }
    }

    import.meta.webpackHot.addStatusHandler(statusHandler)
  }

  let lastHash = __webpack_hash__

  new EventSource(
    `http://${location.hostname}:${__resourceQuery.slice(1)}`,
  ).addEventListener('check', event => {
    const newHash = event.data

    if (newHash !== lastHash) {
      whenIdle(() => {
        import.meta.webpackHot
          .check(true)
          .then(() => {
            lastHash = newHash
          })
          .catch(err => {
            location.reload()
            throw err
          })
      })
    }
  })
}
