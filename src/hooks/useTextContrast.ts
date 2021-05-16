import { color as themeColour } from '../shared/styles'
import useGetCssProperty from './useGetCssProperty'

export const useContrastRatio = (colourOne: string, colourTwo: string) => {
  /* Returns the contrast ratio of two colours
   *
   * Official WCAG specs derive contrast ratio using:
   * (L1 + 0.05) / (L2 + 0.05)
   * where L1 and L2 are the luminosity values of the lighter and darker colours respectively
   *
   * With thanks to Lea Verou for the original implementation https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/contrast-ratio.js
   */

  // Convert each RGB channel to respective luminance value
  const luminance = (red: number, green: number, blue: number) => {
    const colourArray = [red, green, blue].map((colourValue) => {
      colourValue /= 255
      return colourValue <= 0.03928
        ? colourValue / 12.92
        : Math.pow((colourValue + 0.055) / 1.055, 2.4)
    })

    return colourArray[0] * 0.2126 + colourArray[1] * 0.7152 + colourArray[2] * 0.0722
  }

  // Convert hexcode to valid RGB array
  const hexToRgb = (colour: string) => {
    // Confirm hexcode is valid and split into colour array
    const validateHexcode = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour)

    // Returns array of RGB colour values
    return validateHexcode
      ? [
          parseInt(validateHexcode[1], 16),
          parseInt(validateHexcode[2], 16),
          parseInt(validateHexcode[3], 16)
        ]
      : null
  }

  // Convert to RGB values
  const rgbOne = hexToRgb(colourOne)
  const rgbTwo = hexToRgb(colourTwo)
  if (rgbOne === null || rgbTwo === null) return 0

  // Determine luminosity
  const lumOne = luminance(rgbOne[0], rgbOne[1], rgbOne[2])
  const lumTwo = luminance(rgbTwo[0], rgbTwo[1], rgbTwo[2])

  // Sort values based on brightness
  const brightest = Math.max(lumOne, lumTwo)
  const darkest = Math.min(lumOne, lumTwo)

  // Return contrast ratio to 2 decimal points
  const ratio = (brightest + 0.05) / (darkest + 0.05)
  return parseFloat(ratio.toFixed(2))
}

const useTextContrast = (colour: string) => {
  // Convert CSS property to design token
  const cssVarRegEx = /^var\(--[a-zA-Z-]*\)$/
  if (cssVarRegEx.test(colour)) {
    // Strip out unwanted chars & convert
    const token = colour.replace('var(', '').replace(')', '')
    colour = useGetCssProperty(token)
  }

  // Determines whether dark or light text works best on the given colour
  const contrastLightText = useContrastRatio(colour, themeColour.lightest)
  const contrastDarkText = useContrastRatio(colour, themeColour.darkest)
  return contrastLightText > contrastDarkText
    ? 'var(--colour-text-light)'
    : 'var(--colour-text-dark)'
}

export default useTextContrast
