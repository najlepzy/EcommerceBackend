import { Request, Response } from "express";
import compression from "compression";
import zlib from "zlib";

const shouldCompress = (req: Request, res: Response) => {
  if (req.headers["x-no-compression"]) {
    return false;
  }
  return compression.filter(req, res);
};

const compressionOptions = {
  filter: shouldCompress,
  threshold: 0,
  level: 9,
  brotli: {
    enabled: true,
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    },
  },
  zlib: {
    enabled: true,
    params: {
      level: zlib.constants.Z_DEFAULT_COMPRESSION,
    },
  },
};

export const compressionMiddleware = compression(compressionOptions);
