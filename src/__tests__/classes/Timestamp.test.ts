import Timestamp from '../../classes/Timestamp'

describe('Timestamp', () => {
  const mockDate = new Date('2022-02-17T16:46:28.000Z')

  // Save a reference to the original Date class
  const OriginalDate = Date

  beforeAll(() => {
    // Mock the global Date class
    global.Date = jest.fn(() => mockDate) as any
  })

  afterAll(() => {
    // Restore the original Date class
    global.Date = OriginalDate
  })

  describe('constructor', () => {
    it('should create a new timestamp', () => {
      const timestamp = new Timestamp()

      expect(timestamp).toBeInstanceOf(Timestamp)
    })
  })

  describe('.date', () => {
    it('should return the date', () => {
      global.Date = OriginalDate

      const timestamp = new Timestamp()

      expect(timestamp.date).toBeInstanceOf(Date)

      global.Date = jest.fn(() => mockDate) as any
    })
  })

  describe('.format()', () => {
    it('should format the timestamp', () => {
      const timestamp = new Timestamp()

      expect(timestamp.format('YYYY-MM-DD')).toBe('2022-02-17')
      expect(timestamp.format('YYYY-MM-DD HH:mm:ss A')).toBe(
        '2022-02-17 17:46:28 PM',
      )
    })
    it('should apply AM/PM', () => {
      global.Date = jest.fn(
        () => new OriginalDate('2022-02-17T06:46:28.000Z'),
      ) as any

      const timestamp = new Timestamp()

      expect(timestamp.format('YYYY-MM-DD HH:mm:ss A')).toBe(
        '2022-02-17 07:46:28 AM',
      )

      global.Date = jest.fn(() => mockDate) as any
    })
  })

  describe('.getDay()', () => {
    it('should return the day', () => {
      const timestamp = new Timestamp()

      expect(Timestamp.getDay(timestamp)).toBe(17)
    })
  })

  describe('.getMonth()', () => {
    it('should return the month', () => {
      const timestamp = new Timestamp()

      expect(Timestamp.getMonth(timestamp)).toBe(2)
    })
  })

  describe('.getYear()', () => {
    it('should return the year', () => {
      const timestamp = new Timestamp()

      expect(Timestamp.getYear(timestamp)).toBe(2022)
    })
  })
})
