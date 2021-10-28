import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { TOKEN_KEY } from '../../token_key';

interface IPayload {
  sub: string;
}

export function ensureAutheticate(request: Request, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(401).end();
  }

  const token = authorization.split(" ")[1];

  try {

    const { sub } = verify(token, TOKEN_KEY) as IPayload;
    request.user_id = sub;

    return next();

  } catch (err) {
    return response.status(401).json({ error: "Unauthorized" });
  }

}