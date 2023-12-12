import {
  LoggerComposition,
  LoggerConfig,
  LoggerData,
  LoggerOptions,
} from 'src/types'
import LogEntry from './LogEntry'

const defaultOptions: LoggerConfig = {
  composition: {
    default: ['timestamp', 'prefix', 'indent', 'message'],
    error: [
      'color:red',
      'timestamp',
      'prefix',
      'indent',
      'message',
      'color:reset',
    ],
    info: [
      'color:blue',
      'timestamp',
      'prefix',
      'indent',
      'message',
      'color:reset',
    ],
    warn: [
      'color:yellow',
      'timestamp',
      'prefix',
      'indent',
      'message',
      'color:reset',
    ],
  },
  indentSize: 2,
  separator: ' ',
  timestampFormat: 'HH:mm:ss',
}

export default class Logger {
  private _composition: LoggerComposition
  private _currentIndent: number
  private _entries: LogEntry[]
  private _indentSize: number
  private _prefix?: string
  private _separator: string
  private _timestampFormat: string

  constructor(options: Partial<LoggerOptions> = {}) {
    if (options.indentSize && options.indentSize < 1) {
      throw new Error('Indent size must be greater than 0')
    }

    this._currentIndent = 0
    this._indentSize = options.indentSize || defaultOptions.indentSize
    this._entries = []
    this._prefix = options.prefix
    this._separator = options.separator || defaultOptions.separator
    this._timestampFormat =
      options.timestampFormat || defaultOptions.timestampFormat

    if (options.composition) {
      this._composition = {
        ...defaultOptions.composition,
        ...options.composition,
      }
    } else {
      this._composition = defaultOptions.composition
    }
  }

  /**
   * The logger entries with formatting applied.
   */
  public get formattedEntries(): string[] {
    return this._entries.map((entry) => this._formatEntry(entry))
  }

  /**
   * The logger entries.
   */
  public get entries(): LogEntry[] {
    return this._entries
  }

  /**
   * Apply formatting to a log entry before printing.
   * @param entry The log entry to format.
   * @returns The formatted log entry as a string.
   */
  private _formatEntry(entry: LogEntry): string {
    let currentIndex = 0
    let result = ''

    const addSeparator = () => {
      if (result.length > 0 && currentIndex > 0) {
        result += this._separator
      }
    }

    this._composition[entry.type].forEach((component) => {
      switch (component) {
        case 'color:black':
          result += '\x1b[30m'
          break
        case 'color:blue':
          result += '\x1b[34m'
          break
        case 'color:cyan':
          result += '\x1b[36m'
          break
        case 'color:green':
          result += '\x1b[32m'
          break
        case 'color:magenta':
          result += '\x1b[35m'
          break
        case 'color:red':
          result += '\x1b[31m'
          break
        case 'color:reset':
          result += '\x1b[0m'
          break
        case 'color:socio':
          result += '\x1b[38;5;111m'
          break
        case 'color:white':
          result += '\x1b[37m'
          break
        case 'color:yellow':
          result += '\x1b[33m'
          break

        case 'indent':
          if (entry.indent > 0) {
            result += ' '.repeat(this._indentSize * entry.indent)
            currentIndex++
          }
          break

        case 'message':
          addSeparator()
          result += entry.raw
          currentIndex++
          break

        case 'prefix':
          if (this._prefix) {
            addSeparator()
            result += this._prefix
            currentIndex++
          }
          break

        case 'timestamp':
          const formattedTimestamp = entry.timestamp.format(
            this._timestampFormat,
          )
          addSeparator()
          result += formattedTimestamp
          currentIndex++
          break
      }
    })

    return result
  }

  /**
   * Add a new entry to the logger.
   * @param data The data to add to the logger.
   * @param type The type of log entry.
   */
  public add(data: string): void {
    const newEntry = new LogEntry(data, this._currentIndent, 'default')
    this._entries.push(newEntry)
  }

  /**
   * Clear all entries from the logger.
   */
  public clear(): void {
    this._entries = []
  }

  /**
   * Add a new error entry to the logger.
   * @param data The data to add to the logger.
   */
  public error(data: string): void {
    const newEntry = new LogEntry(data, this._currentIndent, 'error')
    this._entries.push(newEntry)
  }

  /**
   * Add a new entry to the logger and increase the indent.
   * @param data The data to add to the logger.
   */
  public group(data: string): void {
    this.add(data)
    this._currentIndent++
  }

  /**
   * Add a new entry to the logger and decrease the indent.
   * @param data The data to add to the logger.
   * @throws An error if the indent is already 0.
   */
  public groupEnd(data?: string): void {
    if (this._currentIndent === 0) {
      throw new Error('Cannot end a group that has not started.')
    }
    this._currentIndent--
    if (data) {
      this.add(data)
    }
  }

  /**
   * Add a new info entry to the logger.
   * @param data The data to add to the logger.
   */
  public info(data: string): void {
    const newEntry = new LogEntry(data, this._currentIndent, 'info')
    this._entries.push(newEntry)
  }

  /**
   * Print the logger entries to the console.
   */
  public print(): void {
    console.log(this.formattedEntries.join('\n'))
  }

  /**
   * Return a JSON representation of the logger.
   */
  public toJSON(): LoggerData {
    return {
      composition: this._composition,
      entries: this._entries.map((entry) => entry.toJSON()),
      indentSize: this._indentSize,
      prefix: this._prefix,
      separator: this._separator,
      timestampFormat: this._timestampFormat,
    }
  }

  /**
   * Add a new warning entry to the logger.
   * @param data The data to add to the logger.
   */
  public warn(data: string): void {
    const newEntry = new LogEntry(data, this._currentIndent, 'warn')
    this._entries.push(newEntry)
  }
}
