import { generate } from '@socio-development/generator'
import { existsSync, readdirSync } from 'fs'
import { resolve } from 'path'

const rootPath = resolve('.')
const themesPath = resolve(rootPath, 'src', 'themes')

if (!existsSync(themesPath)) {
  throw new Error(`Themes path does not exist: ${themesPath}`)
}

const themeFiles = readdirSync(themesPath)
const themeNames = themeFiles
  .filter((file) => file.endsWith('.ts'))
  .map((file) => file.replace('.ts', ''))

const code = `
export const themeNames = ['${themeNames.join("', '")}'] as const

export type ThemeName = (typeof themeNames)[number]

`

console.log(code)

generate({
  code,
  file: 'theme.ts',
  path: 'src',
})
