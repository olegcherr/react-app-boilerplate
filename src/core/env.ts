import { invariant } from './invariant'
import { isBrowser } from './misc'

export function env<T = string>(name: string, isRequired = true): T {
  // @ts-ignore __ENV is created by 'react-env'
  const value = isBrowser ? window.__ENV[name] : process.env[name]

  invariant(!isRequired || value, `ENV variable "${name}" is not defined`)

  return value as unknown as T
}
