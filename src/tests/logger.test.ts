import logger from "@config/logger";

jest.mock("winston", () => {
  const actualWinston = jest.requireActual("winston");
  return {
    ...actualWinston,
    transports: {
      Console: jest.fn().mockImplementation(() => ({ name: "console" })),
      File: jest.fn().mockImplementation((options) => ({ ...options })),
    },
    createLogger: jest.fn((config) => ({
      ...config,
      log: jest.fn(),
    })),
  };
});

describe("Logger Module", () => {
  it("should create a logger with the correct configuration", () => {
    const mockCreateLogger = require("winston").createLogger;

    expect(mockCreateLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "info",
        format: expect.any(Object),
        transports: expect.any(Array),
      })
    );

    const loggerConfig = mockCreateLogger.mock.calls[0][0];

    expect(loggerConfig.transports).toHaveLength(4);
    expect(loggerConfig.transports[0]).toEqual(
      expect.objectContaining({ name: "console" })
    );
    expect(loggerConfig.transports[1]).toEqual(
      expect.objectContaining({
        filename: "logs/error.log",
        level: "error",
      })
    );
    expect(loggerConfig.transports[2]).toEqual(
      expect.objectContaining({
        filename: "logs/info.log",
        level: "info",
      })
    );
    expect(loggerConfig.transports[3]).toEqual(
      expect.objectContaining({
        filename: "logs/combined.log",
      })
    );
  });

  it("should log messages correctly", () => {
    const message = "Test log message";
    const level = "info";

    logger.log({ level, message });

    const mockCreateLogger = require("winston").createLogger;
    const mockLog = mockCreateLogger.mock.results[0].value.log;

    expect(mockLog).toHaveBeenCalledWith({ level, message });
  });
});
