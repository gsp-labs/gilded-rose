module.exports = {
  roots: ['<rootDir>'],
  testRegex: '(.*\\.test\\.tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: [],
  collectCoverage: false,
  resetMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
  ],
};