/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@dao/(.*)$": "<rootDir>/src/dao/$1",
    "^@dto/(.*)$": "<rootDir>/src/dto/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^@middleware/(.*)$": "<rootDir>/src/middleware/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@views/(.*)$": "<rootDir>/src/views/$1",
  },
  modulePaths: ["<rootDir>/src"],
};
