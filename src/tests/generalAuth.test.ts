import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "@controllers/authController";
import * as userService from "@services/authService";
import { Request, Response } from "express";
import { HttpStatusCodes, messages } from "@utils/messages";

jest.mock("@services/authService");

describe("User Controller", () => {
  const mockRequest = (body = {}, user = null) =>
    ({
      body,
      user,
      cookies: {},
    } as unknown as Request);

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn();
    return res;
  };

  describe("registerUser", () => {
    it("should register a user successfully", async () => {
      const req = mockRequest({
        email: "test@example.com",
        password: "123456",
      });
      const res = mockResponse();
      jest
        .spyOn(userService, "registerUser")
        .mockResolvedValue(messages.userRegistered);

      await registerUser(req, res);

      expect(userService.registerUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.CREATED);
      expect(res.send).toHaveBeenCalledWith(messages.userRegistered);
    });

    it("should handle errors during registration", async () => {
      const req = mockRequest({
        email: "test@example.com",
        password: "123456",
      });
      const res = mockResponse();
      jest
        .spyOn(userService, "registerUser")
        .mockRejectedValue(new Error(messages.userAlreadyRegistered));

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.BAD_REQUEST);
      expect(res.send).toHaveBeenCalledWith(messages.userAlreadyRegistered);
    });
  });

  describe("loginUser", () => {
    it("should log in a user and set a cookie", async () => {
      const req = mockRequest({
        email: "test@example.com",
        password: "123456",
      });
      const res = mockResponse();
      const mockUser = {
        _id: "1",
        email: "test@example.com",
        comparePassword: jest.fn().mockResolvedValue(true),
      } as any; 

      const mockToken = "mockJwtToken";

      jest.spyOn(userService, "loginUser").mockResolvedValue(mockUser);
      jest.spyOn(userService, "generateToken").mockReturnValue(mockToken);

      await loginUser(req, res);

      expect(userService.loginUser).toHaveBeenCalledWith(
        "test@example.com",
        "123456"
      );
      expect(userService.generateToken).toHaveBeenCalledWith(mockUser);
      expect(res.cookie).toHaveBeenCalledWith("jwt", mockToken, {
        httpOnly: true,
        secure: false,
      });
      expect(res.json).toHaveBeenCalledWith({ message: messages.loginSuccess });
    });

    it("should handle login errors", async () => {
      const req = mockRequest({
        email: "test@example.com",
        password: "wrongPassword",
      });
      const res = mockResponse();

      jest
        .spyOn(userService, "loginUser")
        .mockRejectedValue(new Error(messages.invalidEmailOrPassword));

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.UNAUTHORIZED);
      expect(res.send).toHaveBeenCalledWith(messages.invalidEmailOrPassword);
    });
  });

  describe("getCurrentUser", () => {
    it("should return current user data", async () => {
      const mockUser = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: 30,
        role: "user",
        _id: "123",
        toObject: jest.fn().mockReturnValue({
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          age: 30,
          role: "user",
        }),
      } as any;

      const req = mockRequest({}, mockUser);
      const res = mockResponse();

      jest.spyOn(userService, "getUserData").mockReturnValue({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: 30,
        role: "user",
      });

      await getCurrentUser(req, res);

      expect(userService.getUserData).toHaveBeenCalledWith(mockUser);
      expect(res.json).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: 30,
        role: "user",
      });
    });

    it("should handle missing authenticated user", async () => {
      const req = mockRequest({}, null);
      const res = mockResponse();

      await getCurrentUser(req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.UNAUTHORIZED);
      expect(res.send).toHaveBeenCalledWith(messages.noUserAuthenticated);
    });
  });
});
