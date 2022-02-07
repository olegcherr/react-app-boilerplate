if (import.meta.webpackHot) {
  let lastHash = __webpack_hash__

  new EventSource(
    `http://${location.hostname}:${__resourceQuery.slice(1)}`,
  ).addEventListener('check', event => {
    const newHash = event.data

    if (newHash !== lastHash) {
      import.meta.webpackHot
        .check(true)
        .then(() => {
          lastHash = newHash
        })
        .catch(err => {
          location.reload()
          throw err
        })
    }
  })
}
