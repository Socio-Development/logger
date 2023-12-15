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
      'color:reset',
    ],
    info: [
      'timestamp',
      'color:socio',
      'prefix',
      'color:blue',
      'indent',
      'message',
      'color:reset',
    ],
    warn: [
      'timestamp',
      'color:socio',
      'prefix',
      'color:yellow',
      'indent',
      'message',
      'color:reset',
    ],
  },
  indentSize: 2,
  prefix: '[SOCIO]',
  separator: ' ',
  timestampFormat: 'HH:mm:ss',
} satisfies LoggerConfig
