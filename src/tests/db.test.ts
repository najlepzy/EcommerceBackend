import mongoose from "mongoose";

import logger from "@config/logger";
import { messages } from "@utils/messages";
import connectDB from "@config/db";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

jest.mock("@config/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe("connectDB", () => {
  const mockMongooseConnect = mongoose.connect as jest.Mock;
  const mockLoggerInfo = logger.info as jest.Mock;
  const mockLoggerError = logger.error as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log success message when connection is successful", async () => {
    const mockHost = "mock-host";
    mockMongooseConnect.mockResolvedValue({ connection: { host: mockHost } });

    await connectDB();

    expect(mockMongooseConnect).toHaveBeenCalledWith(expect.any(String));
    expect(mockLoggerInfo).toHaveBeenCalledWith(
      messages.dbConnectionSuccess(mockHost)
    );
    expect(mockLoggerError).not.toHaveBeenCalled();
  });

  it("should log error message and exit process when connection fails", async () => {
    const mockErrorMessage = "Mock connection error";
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });

    mockMongooseConnect.mockRejectedValue(new Error(mockErrorMessage));

    await expect(connectDB()).rejects.toThrow("process.exit called");

    expect(mockMongooseConnect).toHaveBeenCalledWith(expect.any(String));
    expect(mockLoggerError).toHaveBeenCalledWith(`Error: ${mockErrorMessage}`);
    expect(mockLoggerInfo).not.toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should log generic error message and exit process for unknown error type", async () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });

    mockMongooseConnect.mockRejectedValue("Unknown error");

    await expect(connectDB()).rejects.toThrow("process.exit called");

    expect(mockLoggerError).toHaveBeenCalledWith(messages.dbConnectionError);
    expect(mockLoggerInfo).not.toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
