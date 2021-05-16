/**
 * Converts the provided colour value to the relevant CSS token
 * Includes full custom property syntax
 *
 * Example: "primary-dark" becomes "var(--colour-primary-dark)"
 */

const useColourToken = (colour: string) => {
  // Regex that checks provided value for existing formatting
  const cssVarRegEx = /^var\(--[a-zA-Z-]*\)$/

  // Test colour against Regex
  if (!cssVarRegEx.test(colour)) {
    // First ensure 'colour' prefix
    if (!/^colo[ur]*.*$/.test(colour)) {
      colour = `colour-${colour}`
    }

    // Then convert to CSS var syntax
    colour = `var(--${colour})`
  }

  return colour
}

export default useColourToken
