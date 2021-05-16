import React from 'react'
import { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Checkbox, CheckboxTypes } from './Checkbox'

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    componentSubtitle:
      'Allows the user to select or deselect a specific option, either from a list or on a specific UI control.'
  },
  args: {
    palette: 'primary',
    shade: 'dark',
    label: 'Checkbox label',
    onChange: action('Checkbox toggled')
  },
  argTypes: {
    colour: {
      table: {
        disable: true
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
    onChange: {
      table: {
        disable: true
      },
      control: false
    }
  }
}

interface CheckboxStoryTypes extends CheckboxTypes {
  palette: string
  shade: string
}

// eslint-disable-next-line react/prop-types
const Template: Story<CheckboxStoryTypes> = ({ palette, shade, ...args }) => {
  // Allows control of colour prop to be split into more manageable drop downs
  const colour = `${palette}-${shade}`
  return <Checkbox {...args} colour={colour} />
}

// The default Checkbox setup
export const Default = Template.bind({})
Default.argTypes = {
  colour: {
    table: {
      disable: false
    },
    control: false
  },
  onChange: {
    table: {
      disable: false
    }
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

// A group of checkboxes with ideal HTML
export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  hasLabel: false
}
WithoutLabel.parameters = {
  docs: {
    storyDescription:
      'A Checkbox without a visible label. It is rarely advisable to hide the label, but it can be useful for certain edge cases, such as use in table rows.'
  }
}

// A group of checkboxes with ideal HTML
export const Disabled = Template.bind({})
Disabled.args = {
  isDisabled: true
}
Disabled.parameters = {
  docs: {
    storyDescription: 'A disabled Checkbox'
  }
}

// A group of checkboxes with ideal HTML
// eslint-disable-next-line react/prop-types
export const CheckboxGroup: Story<CheckboxStoryTypes> = ({ palette, shade, ...args }) => {
  // Allows control of colour prop to be split into more manageable drop downs
  const colour = `${palette}-${shade}`
  return (
    <fieldset>
      <legend>Which browsers do you use?</legend>
      <Checkbox {...args} colour={colour} label="Firefox" />
      <Checkbox {...args} colour={colour} label="Chrome" />
      <Checkbox {...args} colour={colour} label="Safari" />
      <Checkbox {...args} colour={colour} label="Edge" />
      <Checkbox {...args} colour={colour} label="Opera" />
    </fieldset>
  )
}
CheckboxGroup.parameters = {
  docs: {
    storyDescription:
      'An example group of `Checkbox` elements. The use of a `<fieldset>` and `<legend>` is advised.<br/><br/><span style="font-family: var(--font-emoji)">💡</span> **Tip:** You can use the **Show code** button on the Docs panel to quickly copy/paste the underlying code used in this example.'
  }
}

// An example of how the onChange hook works
// eslint-disable-next-line react/prop-types
export const onChangeHook: Story<CheckboxStoryTypes> = ({ palette, shade, ...args }) => {
  // Allows control of colour prop to be split into more manageable drop downs
  const colour = `${palette}-${shade}`
  const [checkboxState, setCheckboxState] = React.useState(false)

  return (
    <>
      <Checkbox {...args} colour={colour} onChange={setCheckboxState} />
      <p>Returned State: {checkboxState.toString()}</p>
    </>
  )
}
onChangeHook.parameters = {
  docs: {
    storyDescription:
      'An example of returning the value of the current Checkbox state from the component. Can be used to track user interactions with the `Checkbox` UI.<br/><br/><span style="font-family: var(--font-emoji)">⚠</span> **Warning:** The `onChange` hook will only return a value _after_ the user has interacted with the `Checkbox` component directly, so the default state should be set independently. That includes syncing with the `isChecked` prop.'
  }
}
onChangeHook.storyName = 'onChange Hook'
