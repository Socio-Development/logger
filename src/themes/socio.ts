import { LoggerConfig } from 'src/types'

export default {
  composition: {
    default: [
      'timestamp',
      'color:socio',
      'prefix',
      'color:reset',
      'indent',
      'message',
    ],
    error: [
      'timestamp',
      'color:socio',
      'prefix',
      'color:red',
      'indent',
      'message',
    ],
    info: [
      'timestamp',
      'color:socio',
      'prefix',
      'color:blue',
      'indent',
      'message',
    ],
    warn: [
      'timestamp',
      'color:socio',
      'prefix',
      'color:yellow',
      'indent',
      'message',
    ],
  },
  indentSize: 2,
  prefix: '[SOCIO]',
  separator: ' ',
  timestampFormat: 'HH:mm:ss',
} satisfies LoggerConfig
