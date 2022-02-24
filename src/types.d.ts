declare module '*.css' {
  const css: { [key: string]: string }
  export = css
}

declare module '*.scss' {
  const css: { [key: string]: string }
  export = css
}

declare module '*.sass' {
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

//

declare module '*.woff' {
  const url: string
  export default url
}

declare module '*.woff2' {
  const url: string
  export default url
}

declare module '*.eot' {
  const url: string
  export default url
}

declare module '*.ttf' {
  const url: string
  export default url
}

declare module '*.otf' {
  const url: string
  export default url
}

//

// https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
declare module '*.svg' {
  const svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default svg
}
