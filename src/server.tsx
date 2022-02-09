import express, { Request, Response } from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'

const app = express()

app.disable('x-powered-by')

app.use(express.static(path.resolve('dist')))
app.use(express.static(path.resolve('public')))

app.get('*', (req: Request, res: Response) => {
  res.set('Content-Type', 'text/html')

  res.send(
    `<!doctype html>${renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title />
          <meta
            name="viewport"
            content="initial-scale=1.0, maximum-scale=1.0"
          />
        </head>
        <body>
          <div id="root" />

          <script src="/__ENV.js" />
          <script src="/app.js" />
        </body>
      </html>,
    )}`,
  )
})

app.listen(3050)
