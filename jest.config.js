module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  covaregeDirectory: 'coverage',
  testEnvironment: 'node',
  trasnform: {
    '.+\\.ts$': 'ts-jest'
  }
}
