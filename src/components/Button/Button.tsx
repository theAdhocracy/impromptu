import React from 'react'
import styled, { css } from 'styled-components'
import useColourToken from 'src/hooks/useColourToken'
import useTextContrast from 'src/hooks/useTextContrast'
// import { Icon, IconTypes } from '../Icon/Icon'

interface StyledButtonProps {
  bg: ButtonTypes['colour']
  colour: ButtonTypes['colour']
  text: ButtonTypes['colour']
  fill: ButtonTypes['fillAmount']
  size: ButtonTypes['size']
  align: ButtonTypes['iconAlignment']
}

const StyledButton = styled.button<StyledButtonProps>`
  /* Define theme styles based on props */
  --button-border: ${({ colour }) => colour};
  --button-bg: ${({ bg }) => bg};
  --button-text: ${({ text }) => text};
  /* Default styles */
  display: flex;
  align-items: center;
  height: max-content;
  position: relative;
  min-width: 7em;
  max-width: max-content;
  padding: var(--space-content-xs) var(--space-content-s);
  background-color: var(--button-bg);
  border: 2px solid var(--button-border);
  border-radius: 2rem;
  color: var(--button-text);
  font-size: var(--type-label-s);
  line-height: var(--type-label-spacing);
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  span {
    flex: 1;
    text-align: center;
  }
  svg:first-child {
    max-height: 1em;
    margin-right: var(--space-content-s);
  }
  span + svg {
    max-height: 1em;
    margin-left: var(--space-content-s);
  }
  &:hover::before,
  &:focus::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: -2px;
    left: -2px;
    background-color: rgba(255, 255, 255, 0.4);
    border: 2px solid transparent;
    border-radius: 2rem;
    outline: none;
    mix-blend-mode: overlay;
  }
  /* Style overrides */
  /* Based on size: large */
  ${({ size }) =>
    size === 'large' &&
    css`
      padding: var(--space-content-s) var(--space-layout-s);
      font-size: var(--type-label-l);
      svg:first-child {
        margin-right: var(--space-layout-s);
      }
      span + svg {
        margin-left: var(--space-layout-s);
      }
    `}
  /* Based on disabled: true */
  &[disabled],
  &[aria-disabled=true] {
    color: var(--colour-text-disabled);
    background-color: var(--colour-disabled);
    border-color: var(--colour-disabled);
    cursor: not-allowed;
  }
`

/**
 * Buttons are interactive elements within the UI, often linked with form submission or page navigation.
 * As key landmarks for users, their design reflects their important function, with a range of possibilities to emphasise (or not) their importance to the current user journey.
 */

export const Button = ({
  label,
  onButtonPress,
  colour = 'primary-base',
  fillAmount = 'full',
  size = 'small',
  isDisabled = false,
  //   icon,
  iconAlignment = 'start',
  isLink = false
}: ButtonTypes) => {
  // Standardise colour to CSS custom property
  colour = useColourToken(colour)

  // Determine background colour based on fillAmount
  let backgroundColour = 'var(--colour-primary)'
  switch (fillAmount) {
    case 'full':
      backgroundColour = colour
      break
    case 'partial':
      backgroundColour = colour.replace(
        /^var\(--colo[ur]*-([a-zA-Z]*).*$/,
        'var(--colour-$1-lightest)'
      )
      break
    case 'none':
      backgroundColour = 'var(--colour-surface)'
      break
    default:
      break
  }

  // Correct font colour based on contrast ratio with background
  const textColour = useTextContrast(backgroundColour)

  // Should element be a link or a button
  if (isLink) {
    return (
      <StyledButton
        colour={colour}
        fill={fillAmount}
        bg={backgroundColour}
        text={textColour}
        size={size}
        align={iconAlignment}
        href={onButtonPress as string}
        as={'a'}
      >
        {/* {icon && iconAlignment === 'start' && <Icon {...icon} />} */}
        <span>{label}</span>
        {/* {icon && iconAlignment === 'end' && <Icon {...icon} />} */}
      </StyledButton>
    )
  } else {
    return (
      <StyledButton
        onClick={onButtonPress as React.MouseEventHandler}
        colour={colour}
        fill={fillAmount}
        bg={backgroundColour}
        text={textColour}
        size={size}
        align={iconAlignment}
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {/* {icon && iconAlignment === 'start' && <Icon {...icon} />} */}
        <span>{label}</span>
        {/* {icon && iconAlignment === 'end' && <Icon {...icon} />} */}
      </StyledButton>
    )
  }
}

export type ButtonTypes = {
  /** The text shown within the button */
  label: string
  /** The function or event to trigger when the button is pressed; if `isLink` is `true` then just pass the url as a string */
  onButtonPress: React.MouseEventHandler | string
  /** The dominant colour for the button */
  colour?: string
  /** Whether the button should be a solid colour, outline, or outline with lighter background */
  fillAmount?: 'full' | 'partial' | 'none'
  /** The size of the button */
  size?: 'small' | 'large'
  /** Whether the button is disabled or not */
  isDisabled?: boolean
  /** Adds an icon to the specified side of the label */
  //   icon?: IconTypes
  /** Which side the icon should appear */
  iconAlignment?: 'start' | 'end'
  /** Whether the output HTML element is a button (`<button>`) or a link (`<a>`) */
  isLink?: boolean
}
