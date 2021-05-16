module.exports = {
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx'
  },
  moduleDirectories: ['node_modules'],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>']
}
