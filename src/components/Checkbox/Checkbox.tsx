import React from 'react'
import useColourToken from 'src/hooks/useColourToken'
import { useMiniUid } from 'src/hooks/useCreateUuid'
import styled from 'styled-components'

interface CheckboxWrapperProps {
  colour: CheckboxTypes['colour']
}

const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
  --checkbox-colour: ${({ colour }) => colour};
  display: inline-block;
  input[type='checkbox'] {
    background: none;
    position: absolute;
    opacity: 0;
  }
  label {
    display: inline-flex;
    place-items: center;
  }
  label::before {
    content: '';
    display: inline-block;
    box-sizing: content-box;
    margin: 0 var(--space-content-xs) 0 0;
    width: 1em;
    height: 1em;
    border-radius: 4px;
    border: 2px solid var(--colour-border);
    background-color: var(--colour-surface);
  }
  input[type='checkbox']:checked + label::before {
    background: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 14 11'><path d='M5 10.42L0 5.42L1.41 4.01L5 7.59L12.59 0L14 1.42L5 10.42Z'/></svg>")
      no-repeat center center; // checkmark
    background-color: var(--checkbox-colour);
    background-size: 82%;
    border: 2px solid var(--checkbox-colour);
  }
  /* Checkbox hover/focus states when not checked */
  input[type='checkbox']:not(:checked) + label:hover::before,
  input[type='checkbox']:not(:checked):focus + label::before {
    background-color: var(--colour-surface-base);
    border-color: var(--colour-surface-dark);
  }
  input[type='checkbox']:not(:checked):focus-visible + label:hover::before {
    background-color: var(--colour-surface-base);
    border-color: var(--colour-surface-dark);
  }
  /* Checkbox hover/focus states when checked */
  input[type='checkbox']:checked + label:hover::before,
  input[type='checkbox']:checked:focus + label::before {
    opacity: 0.5;
  }
  /* Removing focus states for mouse users that support focus-visible; :not(:hover) used to preserve hover states */
  input[type='checkbox']:checked:focus:not(:focus-visible) + label:not(:hover)::before {
    opacity: 1;
  }
  input[type='checkbox']:not(:checked):focus:not(:focus-visible) + label:not(:hover)::before {
    background-color: var(--colour-surface);
    border-color: var(--colour-border);
  }
  /* Disabled */
  input[type='checkbox']:disabled {
    & + label {
      color: var(--colour-disabled);
      cursor: not-allowed;
    }
    & + label::before {
      border-color: var(--colour-disabled);
    }
    &:checked + label::before {
      background-color: var(--colour-disabled);
    }
    & + label:hover::before {
      background-color: var(--colour-surface);
      border-color: var(--colour-disabled);
    }
  }
`

/**
 * Checkboxes are a common element in forms and other interactive website sections. They allow a user to effectively toggle an option on or off.
 *
 * They are most often used individually for a specific user input that exists with a "yes/no" (or boolean) answer. However, they can be grouped to provide a list of related options, allowing the user to select one, many, or none of the provided options.
 *
 * There are many similarities between a single Checkbox and a Switch; which one is best to use will largely come down to the UI preference.
 *
 * If the user has multiple options, but should only be allowed to pick one, then a Radio would be a better fit.
 */

export const Checkbox = ({
  label,
  colour = 'primary-dark',
  isDisabled = false,
  isChecked = false,
  hasLabel = true,
  onChange
}: CheckboxTypes) => {
  // Set state for option selection
  const [checked, setChecked] = React.useState(isChecked)

  // Create a valid UID for the checkbox
  const uid = React.useMemo(() => useMiniUid(), [])

  // Standardise provided colour
  colour = useColourToken(colour)

  // Pass state to hook
  React.useEffect(() => {
    onChange && onChange(checked)
  }, [checked])

  return (
    <CheckboxWrapper colour={colour}>
      <input
        id={uid}
        type="checkbox"
        name={label}
        disabled={isDisabled}
        defaultChecked={isChecked}
        onChange={() => {
          setChecked(!checked)
        }}
      />
      {/* Label displayed by default; if hidden, still added to DOM so that screenreaders and voice users can access it */}
      <label htmlFor={uid}>{hasLabel ? label : <span className="sr-only">{label}</span>}</label>
      <p>Test</p>
    </CheckboxWrapper>
  )
}

export type CheckboxTypes = {
  /** Sets the label text */
  label: string
  /** The colour of the checkbox when selected */
  colour?: string
  /** Disables all options and user interactivity */
  isDisabled?: boolean
  /** Checks the checkbox by default */
  isChecked?: boolean
  /** Determines if the label is visible or not; a label is always required for accessibility reasons */
  hasLabel?: boolean
  /** An optional hook that captures the current state */
  onChange?: React.Dispatch<React.SetStateAction<boolean>>
}
