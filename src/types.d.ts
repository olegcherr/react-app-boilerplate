declare module '*.scss' {
  const css: { [key: string]: string }
  export = css
}

//

declare module '*.png' {
  const url: string
  export default url
}

declare module '*.jpg' {
  const url: string
  export default url
}

declare module '*.jpeg' {
  const url: string
  export default url
}

declare module '*.gif' {
  const url: string
  export default url
}

declare module '*.webp' {
  const url: string
  export default url
}
