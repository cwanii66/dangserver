import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

class BaseController {
  static verifyToken(token: string) {
    const decoded = jwt.verify(token, 'cwanii') as JwtPayload
    return decoded.data
  }
}

export const { verifyToken } = BaseController
