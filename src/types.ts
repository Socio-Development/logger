const colors = [
  'black',
  'blue',
  'cyan',
  'green',
  'magenta',
  'red',
  'reset',
  'socio',
  'white',
  'yellow',
] as const

export const logEntryElements = [
  'indent',
  'message',
  'prefix',
  'timestamp',
] as const

export const logEntryTypes = ['default', 'error', 'info', 'warn'] as const

export type Color = (typeof colors)[number]
type ColorComponent = `color:${Color}`
type LogEntryElement = (typeof logEntryElements)[number]
export type LogEntryComponent = ColorComponent | LogEntryElement

export type LogEntryData = {
  indent: number
  raw: string
  timestamp: string
  type: LogEntryType
}

export type LogEntryType = (typeof logEntryTypes)[number]

export type LoggerComposition = {
  [key in LogEntryType]: LogEntryComponent[]
}

export type LoggerConfig = {
  composition: LoggerComposition
  indentSize: number
  prefix?: string
  separator: string
  timestampFormat: string
}

export interface LoggerData extends LoggerConfig {
  entries: LogEntryData[]
}

export type LoggerOptions = {
  composition?: Partial<LoggerComposition>
  indentSize?: number
  prefix?: string
  separator?: string
  timestampFormat?: string
}
