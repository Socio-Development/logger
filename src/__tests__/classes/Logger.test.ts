import Logger from '../../classes/Logger'

describe('Logger', () => {
  const mockDate = new Date('2022-02-17T16:46:28.000Z')
  const OriginalDate = Date

  describe('constructor', () => {
    it('should create a new logger', () => {
      const logger = new Logger()

      expect(logger).toBeInstanceOf(Logger)
    })

    it('should create a new logger with a theme', () => {
      const logger = new Logger('socio')

      expect(logger).toBeInstanceOf(Logger)
    })
  })

  describe('.entries', () => {
    it('should return an empty array by default', () => {
      const logger = new Logger()

      expect(logger.entries).toEqual([])
    })
  })

  describe('.formattedEntries', () => {
    it('should return an empty array by default', () => {
      const logger = new Logger()

      expect(logger.formattedEntries).toEqual([])
    })

    it('should return the formatted entries', () => {
      global.Date = jest.fn(() => mockDate) as any

      const logger = new Logger()

      logger.add('test')

      expect(logger.formattedEntries).toEqual(['17:46:28 test'])

      global.Date = OriginalDate
    })
  })

  describe('._formatEntry()', () => {
    beforeAll(() => {
      global.Date = jest.fn(() => mockDate) as any
    })

    afterAll(() => {
      global.Date = OriginalDate
    })

    it('should be able to format a default entry', () => {
      const logger = new Logger()

      logger.add('test')

      expect(logger['_formatEntry'](logger.entries[0])).toEqual('17:46:28 test')
    })

    it('should correctly apply indentation', () => {
      const logger = new Logger()

      logger.group('test')
      logger.add('test')
      logger.groupEnd('test')

      expect(logger['_formatEntry'](logger.entries[0])).toEqual('17:46:28 test')
      expect(logger['_formatEntry'](logger.entries[1])).toEqual(
        '17:46:28   test',
      )
      expect(logger['_formatEntry'](logger.entries[2])).toEqual('17:46:28 test')
    })

    it('should be able to handle a prefix', () => {
      const logger = new Logger({ prefix: '[TEST]' })

      logger.add('test')

      expect(logger['_formatEntry'](logger.entries[0])).toEqual(
        '17:46:28 [TEST] test',
      )
    })

    it('should be able to format an info entry', () => {
      const logger = new Logger()

      logger.info('test')

      expect(logger['_formatEntry'](logger.entries[0])).toEqual(
        '\x1b[34m17:46:28 test\x1b[0m',
      )
    })
  })

  describe('.add()', () => {
    it('should add a new entry', () => {
      const logger = new Logger()
      const data = 'test'

      logger.add(data)

      expect(logger.entries).toHaveLength(1)
      expect(logger.entries[0].raw).toBe(data)
    })
  })

  describe('.clear()', () => {
    it('should clear all entries', () => {
      const logger = new Logger()

      logger.add('test')

      expect(logger.entries).toHaveLength(1)

      logger.clear()

      expect(logger.entries).toHaveLength(0)
    })
  })

  describe('.error()', () => {
    it('should add a new error entry', () => {
      const logger = new Logger()

      logger.error('test')

      expect(logger.entries).toHaveLength(1)
      expect(logger.entries[0].type).toBe('error')
    })
  })

  describe('.group()', () => {
    it('should add a new group entry', () => {
      const logger = new Logger()

      logger.group('test')
      logger.add('test')
      logger.groupEnd()

      expect(logger.entries).toHaveLength(2)
      expect(logger.entries[0].indent).toBe(0)
      expect(logger.entries[1].indent).toBe(1)
    })
  })

  describe('.groupEnd()', () => {
    it('should add a new group end entry', () => {
      const logger = new Logger()

      logger.group('test')
      logger.add('test')
      logger.groupEnd('test')

      expect(logger.entries).toHaveLength(3)
      expect(logger.entries[0].indent).toBe(0)
      expect(logger.entries[1].indent).toBe(1)
      expect(logger.entries[2].indent).toBe(0)
    })

    it('should throw an error if the indent is already 0', () => {
      const logger = new Logger()

      expect(() => {
        logger.groupEnd()
      }).toThrow('Cannot end a group that has not started.')
    })
  })

  describe('.info()', () => {
    it('should add a new info entry', () => {
      const logger = new Logger()

      logger.info('test')

      expect(logger.entries).toHaveLength(1)
      expect(logger.entries[0].type).toBe('info')
    })
  })

  describe('.print()', () => {
    it('should log all entries to the console', () => {
      global.Date = jest.fn(() => mockDate) as any

      const logger = new Logger()

      logger.add('test')

      const spy = jest.spyOn(console, 'log')

      logger.print()

      expect(spy).toHaveBeenCalledWith('17:46:28 test')

      global.Date = OriginalDate
    })
  })

  describe('.toJSON()', () => {
    it('should return a JSON representation of the logger', () => {
      const logger = new Logger()

      logger.add('test')

      expect(logger.toJSON()).toEqual({
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
        entries: [
          {
            indent: 0,
            raw: 'test',
            timestamp: expect.any(String),
            type: 'default',
          },
        ],
        indentSize: 2,
        prefix: undefined,
        separator: ' ',
        timestampFormat: 'HH:mm:ss',
      })
    })
  })

  describe('.warn()', () => {
    it('should add a new warn entry', () => {
      const logger = new Logger()

      logger.warn('test')

      expect(logger.entries).toHaveLength(1)
      expect(logger.entries[0].type).toBe('warn')
    })
  })
})
