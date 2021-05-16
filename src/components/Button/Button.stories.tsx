import React from 'react'
import { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button, ButtonTypes } from './Button'

export default {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    componentSubtitle: 'An interactive element for triggering basic user functionality'
  },
  args: {
    label: 'Label',
    onButtonPress: action('Button pressed'),
    palette: 'primary',
    shade: 'light'
  },
  argTypes: {
    label: {},
    onButtonPress: {
      table: {
        disable: true
      }
    },
    colour: {
      table: {
        disable: true
      }
    },
    fillAmount: {
      control: {
        type: 'inline-radio'
      }
    },
    size: {
      control: {
        type: 'inline-radio'
      }
    },
    palette: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'positive', 'warning', 'negative']
      }
    },
    shade: {
      control: {
        type: 'select',
        options: ['darkest', 'darker', 'dark', 'base', 'light', 'lighter', 'lightest']
      }
    },
    icon: {},
    iconAlignment: {
      control: {
        type: 'inline-radio'
      }
    }
  }
}

interface ButtonStoryTypes extends ButtonTypes {
  palette: string
  shade: string
}

// eslint-disable-next-line react/prop-types
const Template: Story<ButtonStoryTypes> = ({ palette, shade, ...args }) => {
  // Allows control of colour prop to be split into more manageable drop downs
  const colour = `${palette}-${shade}`
  return <Button {...args} colour={colour} />
}

// The default Button setup
export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription: 'The default configuration'
  }
}
Default.argTypes = {
  onButtonPress: {
    table: {
      disable: false
    },
    control: false
  },
  colour: {
    table: {
      disable: false
    },
    control: false
  },
  palette: {
    table: {
      disable: true
    }
  },
  shade: {
    table: {
      disable: true
    }
  }
}

// A button with only coloured outline
export const Outline = Template.bind({})
Outline.args = { fillAmount: 'partial' }
Outline.parameters = {
  docs: {
    storyDescription: 'Button with outline style'
  }
}

// A large button
export const Large = Template.bind({})
Large.args = { size: 'large' }
Large.parameters = {
  docs: {
    storyDescription: 'A large Button'
  }
}

// Icon button
export const WithIcon = Template.bind({})
// WithIcon.args = { icon: { icon: 'plus', label: '', decorative: true } }
WithIcon.parameters = {
  docs: {
    storyDescription:
      'A Button with an icon. The icon can be switched to either the start or the end of the label based on the "iconAlignment" prop.'
  }
}

// Link button
export const LinkButton = Template.bind({})
LinkButton.args = { isLink: true, onButtonPress: 'https://www.stech.com' }
LinkButton.parameters = {
  docs: {
    storyDescription:
      'A standard Button, but outputs as a link element (`<a>`) rather than a `<button>`.<br/> <span style="font-family: var(--font-emoji); font-size: 1em;">⚠</span> The link URL is set with the `onButtonPress` prop e.g. `onButtonPress={"https://www.stech.com"}`.'
  }
}

// Disabled button
export const Disabled = Template.bind({})
Disabled.args = { isDisabled: true }
Disabled.parameters = {
  docs: {
    storyDescription:
      'A Button that cannot be interacted with.<br/> <span style="font-family: var(--font-emoji); font-size: 1em;">⚠</span> Does not effect links, so if `isLink` is set to `true` this prop will not have any effect.'
  }
}
