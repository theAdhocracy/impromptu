import { customProperties } from '../shared/global'

const useGetCssProperty = (token: string) => {
  // Add colon to ensure only full matches are considered
  token = `${token}:`

  // Standardise initial dashes
  if (!token.match(/^--/)) {
    token = `--${token}`
  }

  // Standardise CSS properties object to array
  const cssString = customProperties.join(' ')
  const cssTokens = cssString
    .replace(/\n\n/g, '\n')
    .replace(/\/\* [a-zA-Z0-9 ]*\*\//g, '')
    .replace(/: /g, ':')
    .replace(/\s/g, '')
    .split(';')

  // Search global CSS properties for match
  const propertyLocation = cssTokens.findIndex((property) => (property as string).includes(token))
  let property = cssTokens[propertyLocation] as string

  // Check for reference properties and recursively locate actual value
  while (property && property.match(/var\(--/)) {
    property = property.replace(/^.*:var\(/, '').replace(')', ':')
    property = cssTokens[
      cssTokens.findIndex((property2) => (property2 as string).includes(property))
    ] as string
  }

  // Extract value of CSS property
  const value = property?.replace(/^.*:/, '')

  return value
}

export default useGetCssProperty
