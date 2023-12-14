<p align="center">
<a href="https://github.com/Socio-Development/logger">
  <img src="https://raw.githubusercontent.com/Socio-Development/generator/66b1ed38bb1f886c5250e69edf8885b3c4656971/docs/assets/socio-full.svg" alt="Socio logo" width="400px">
</a>
</p>
<br />
<p align="center">
  <a href="https://github.com/Socio-Development/logger/actions/workflows/build-status.yml"><img src="https://github.com/Socio-Development/logger/actions/workflows/build-status.yml/badge.svg?branch=main" alt="build status"></a>
  <a href="https://github.com/Socio-Development/logger/actions/workflows/test-status.yml"><img src="https://github.com/Socio-Development/logger/actions/workflows/test-status.yml/badge.svg?branch=main" alt="test status"></a>
  <a href="https://github.com/Socio-Development/logger/actions/workflows/coverage-status.yml"><img src="https://github.com/Socio-Development/logger/actions/workflows/coverage-status.yml/badge.svg?branch=main" alt="test coverage status"></a>
</p>
<br />

# Logger

This repository contains the Logger class, a utility for managing and displaying logs in a structured manner. The Logger class provides static methods for adding logs with varying levels of indentation, representing nested processes.

## Getting started

Run `npm i -D @socio-development/logger`

### Example

```ts
import { Logger } from '@socio-development/logger'

const log = new Logger()

log.group('Process: START')
log.add('This is my default log')
log.info('This is my info log')
log.add('This is my default log')
log.warn('This is my warn log')
log.add('This is my default log')
log.error('This is my error log')
log.groupEnd('Process: END')

log.print()
```

<img width="420" alt="logger-output" src="https://github.com/Socio-Development/logger/assets/74550679/b54a1756-df17-425c-9c27-68d7bc584c4a">


The `Logger` class is a custom logging utility that provides methods for logging messages with different severity levels and grouping them for better readability.

The script begins by creating a new instance of the `Logger` class:

```ts
const log = new Logger()
```

Next, it uses the `group` method to start a new group of log entries:

```ts
log.group('Process: START')
```

The `group` method logs the provided message and increases the current indentation level. This means that all log entries added after this point will be indented until the group is ended.

The script then uses the `add`, `info`, `warn`, and `error` methods to log messages with different severity levels:

```ts
log.add('This is my default log')
log.info('This is my info log')
log.warn('This is my warn log')
log.error('This is my error log')
```

Each of these methods creates a new `LogEntry` with the provided message, the current indentation level, and the appropriate severity level, and adds it to the list of log entries.

Finally, the script uses the `groupEnd` method to end the current group of log entries and the `print` method to print all log entries to the console:

```ts
log.groupEnd('Process: END')
log.print()
```

The `groupEnd` method decreases the current indentation level and logs the provided message, if any. The `print` method formats all log entries according to the logger's configuration and prints them to the console, separated by newline characters.

# Options

You can change the logger output by providing options to the logger.

```ts
import { Logger } from '@socio-development/logger'

const log = new Logger({
  // Add your options here
})
```

## Composition

**Name** `.composition`

**Default**
```ts
LoggerOptions.composition.default = [
  'timestamp',
  'prefix',
  'indent',
  'message'
]

LoggerOptions.composition.error = [
  'color:red',
  'timestamp',
  'prefix',
  'indent',
  'message',
  'color:reset',
]

LoggerOptions.composition.info = [
  'color:blue',
  'timestamp',
  'prefix',
  'indent',
  'message',
  'color:reset',
]

LoggerOptions.composition.warn = [
  'color:yellow',
  'timestamp',
  'prefix',
  'indent',
  'message',
  'color:reset',
]
```

The composition option allows you to modify the logger output for each severity level.

## Indent size

**Name** `.indentSize`

**Default** `2`

## Prefix

**Name** `.prefix`

**Default** `undefined`

## Separator

**Name** `.separator`

**Default** `' '`

## Timestamp format

**Name** `.timestampFormat`

**Default** `'HH:mm:ss'`
