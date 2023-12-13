import { ThemeName } from './_generated/theme'
import { LoggerOptions } from './types'

export { default as Logger } from './classes/Logger'

/**
 * Gets the logger options from a theme.
 * @param theme The theme name.
 * @returns The logger options.
 */
export function getTheme(theme: ThemeName): LoggerOptions {
  const options = require(`./themes/${theme}`).default

  if (!options) {
    throw new Error(`Theme "${theme}" does not contain a valid configuration.`)
  }

  return options
}
