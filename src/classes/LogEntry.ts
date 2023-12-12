import { LogEntryData, LogEntryType } from '../types'
import Timestamp from './Timestamp'

export default class LogEntry {
  private _indent: number
  private _raw: string
  private _timestamp: Timestamp
  private _type: LogEntryType

  constructor(raw: string, indent: number = 0, type: LogEntryType = 'default') {
    if (indent < 0) {
      throw new Error('Indent size must be greater than 0')
    }

    this._indent = indent
    this._raw = raw
    this._timestamp = new Timestamp()
    this._type = type
  }

  /**
   * Indent level of the log entry.
   * @default 0
   */
  public get indent(): number {
    return this._indent
  }

  /**
   * Raw value of the log entry.
   */
  public get raw(): string {
    return this._raw
  }

  /**
   * Creation time of the log entry.
   */
  public get timestamp(): Timestamp {
    return this._timestamp
  }

  /**
   * The log entry type.
   * @default 'default'
   */
  public get type(): LogEntryType {
    return this._type
  }

  public toJSON(): LogEntryData {
    return {
      indent: this._indent,
      raw: this._raw,
      timestamp: this._timestamp.date.toJSON(),
      type: this._type,
    }
  }
}
