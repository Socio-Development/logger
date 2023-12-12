export default class Timestamp {
  private _date: Date

  constructor() {
    this._date = new Date()
  }

  get date(): Date {
    return this._date
  }

  format(format: string): string {
    const date = this._date
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const millisecond = date.getMilliseconds()

    const hour12 = hour % 12 || 12
    const ampm = hour < 12 ? 'AM' : 'PM'

    const pad = (num: number): string => {
      return num.toString().padStart(2, '0')
    }

    return format
      .replace(/YYYY/g, year.toString())
      .replace(/YY/g, year.toString().slice(-2))
      .replace(/MM/g, pad(month))
      .replace(/M/g, month.toString())
      .replace(/DD/g, pad(day))
      .replace(/D/g, day.toString())
      .replace(/HH/g, pad(hour))
      .replace(/H/g, hour.toString())
      .replace(/hh/g, pad(hour12))
      .replace(/h/g, hour12.toString())
      .replace(/mm/g, pad(minute))
      .replace(/m/g, minute.toString())
      .replace(/ss/g, pad(second))
      .replace(/s/g, second.toString())
      .replace(/SSS/g, millisecond.toString())
      .replace(/SS/g, millisecond.toString().slice(0, 2))
      .replace(/S/g, millisecond.toString().slice(0, 1))
      .replace(/A/g, ampm)
      .replace(/a/g, ampm.toLowerCase())
  }

  public static getDay(timestamp: Timestamp): number {
    return timestamp.date.getDate()
  }

  public static getMonth(timestamp: Timestamp): number {
    return timestamp.date.getMonth() + 1
  }

  public static getYear(timestamp: Timestamp): number {
    return timestamp.date.getFullYear()
  }
}
