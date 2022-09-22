import React from 'react'
import { ThemeProvider } from 'styled-components'
import { DecoratorFn } from '@storybook/react'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'

const withTheme: DecoratorFn = (StoryFn) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyle />
    <StoryFn />
  </ThemeProvider>
)

export const globalDecorators = [withTheme]
