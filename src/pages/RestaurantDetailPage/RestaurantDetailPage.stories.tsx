import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { BASE_URL } from 'api'
import { rest } from 'msw'

import { restaurants } from '../../stub/restaurants'

import { RestaurantDetailPage } from './RestaurantDetailPage'

export default {
  title: 'Pages/RestaurantDetailPage',
  component: RestaurantDetailPage,
  parameters: {
    layout: 'fullscreen',
    deepLink: {
      path: '/restaurants/:id',
      route: '/restaurants/2',
    },
  },
} as ComponentMeta<typeof RestaurantDetailPage>

const Template: ComponentStory<typeof RestaurantDetailPage> = (args) => (
  <>
    <div id="modal"></div>
    <RestaurantDetailPage {...args} />
  </>
)

export const Success = Template.bind({})

Success.parameters = {
  msw: {
    handlers: [rest.get(BASE_URL, (req, res, ctx) => res(ctx.json(restaurants[0])))],
  },
}

export const WithModalOpen = Template.bind({})
WithModalOpen.parameters = {
  ...Success.parameters,
}

WithModalOpen.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const foodItem = await canvas.findByText(/Cheeseburger/i)
  await userEvent.click(foodItem)
  await expect(canvas.getByTestId('modal')).toBeInTheDocument()
}
