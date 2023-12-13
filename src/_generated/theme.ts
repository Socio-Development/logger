export const themeNames = ['socio'] as const

export type ThemeName = (typeof themeNames)[number]
