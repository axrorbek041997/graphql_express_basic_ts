import { AuthService } from "../../modules/auth/service.js";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, _: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (token) {  
    req.user = await AuthService.getUserFromToken(token);
  }
  next();
};
