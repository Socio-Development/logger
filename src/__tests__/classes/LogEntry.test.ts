import LogEntry from '../../classes/LogEntry'
import Timestamp from '../../classes/Timestamp'

describe('LogEntry', () => {
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
    it('should create a new log item', () => {
      const entry = new LogEntry('This is my message')

      expect(entry).toBeInstanceOf(LogEntry)
    })
    it('should throw an error if indent size is less than 1', () => {
      expect(() => {
        new LogEntry('This is my message', -1)
      }).toThrow('Indent size must be greater than 0')
    })
  })

  describe('.indent', () => {
    it('should return the indent size', () => {
      const entry = new LogEntry('This is my message', 1)
      expect(entry.indent).toBe(1)
    })
  })

  describe('.raw', () => {
    it('should return the raw string', () => {
      const entry = new LogEntry('This is my message')
      expect(entry.raw).toBe('This is my message')
    })
  })

  describe('.timeStamp', () => {
    it('should return the timestamp', () => {
      const entry = new LogEntry('This is my message')
      expect(entry.timestamp).toBeInstanceOf(Timestamp)
    })
  })

  describe('.type', () => {
    it('should return the type', () => {
      const entry = new LogEntry('This is my message')
      expect(entry.type).toBe('default')
    })
  })

  describe('.toJSON()', () => {
    it('should return the data', () => {
      const entry = new LogEntry('This is my message')

      expect(entry.toJSON()).toEqual({
        indent: 0,
        raw: 'This is my message',
        timestamp: '2022-02-17T16:46:28.000Z',
        type: 'default',
      })
    })
  })
})
