import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { TOKEN_KEY } from "../../token_key";
import { UserRepository } from '../repositories/UserRepository';

interface IPayload {
  sub: string;
}

export async function ensureIsAdmin (request: Request, response: Response, next: NextFunction) {

  const authorization = request.headers.authorization;

  if (!authorization) return response.status(401).end();

  const token = authorization.split(" ")[1];
  const userId = verify(token, TOKEN_KEY) as IPayload;

  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(userId.sub);
  if (!user) return response.status(401).json({ error: "Unauthorized" });

  if (user.isAdmin) {
    return next();
  }

  return response.status(401).json({
    error: "Unauthorized"
  });
}