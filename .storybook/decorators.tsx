import React from 'react'
import { BrowserRouter as Router, MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { DecoratorFn } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { Provider as StoreProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme, darkTheme } from '../src/styles/theme'

// Initialize MSW
initialize()

const withRotuer: DecoratorFn = (StoryFn, { parameters: { deepLink } }) => {
  // path: /restaurants/:id
  // route: /restaurants/1

  if (!deepLink) {
    return (
      <Router>
        <StoryFn />
      </Router>
    )
  }

  const { path, route } = deepLink

  return (
    <MemoryRouter initialEntries={[encodeURI(route)]}>
      <Routes>
        <Route path={path} element={<StoryFn />} />
      </Routes>
    </MemoryRouter>
  )
}

const withTheme: DecoratorFn = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme
  const storyTheme = theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={storyTheme}>
      <GlobalStyle />
      <StoryFn />
    </ThemeProvider>
  )
}

const withStore: DecoratorFn = (StoryFn, { parameters }) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: parameters.store?.initialState,
  })

  return (
    <StoreProvider store={store}>
      <StoryFn />
    </StoreProvider>
  )
}

export const globalDecorators = [withTheme, withRotuer, mswDecorator, withStore]
