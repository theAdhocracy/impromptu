import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

const props = {
  label: 'Button Label',
  onButtonPress: jest.fn()
}

describe('Button', () => {
  let button: HTMLElement

  beforeEach(() => {
    render(<Button {...props} />)
    button = screen.getByRole('button')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Renders label correctly', () => {
    expect(button).toHaveTextContent(props.label)
  })

  test('Fires event when pressed', () => {
    expect(props.onButtonPress).toHaveBeenCalledTimes(0)
    userEvent.click(button)
    expect(props.onButtonPress).toHaveBeenCalledTimes(1)
  })
})

describe('Button: Disabled', () => {
  let button: HTMLElement

  beforeEach(() => {
    render(<Button {...props} isDisabled={true} />)
    button = screen.getByRole('button')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Doesn't fire event when clicked", () => {
    expect(props.onButtonPress).toHaveBeenCalledTimes(0)
    userEvent.click(button)
    expect(props.onButtonPress).toHaveBeenCalledTimes(0)
  })
})
