import { invariant } from './invariant'
import { isBrowser } from './misc'

export function env(name: string) {
  // @ts-ignore __ENV is created by 'react-env'
  const value = isBrowser ? window.__ENV[name] : process.env[name]

  invariant(value, `ENV variable "${name}" is not defined`)

  return value
}
