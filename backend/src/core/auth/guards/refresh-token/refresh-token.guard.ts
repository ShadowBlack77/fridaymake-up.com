import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/libs/schemas';
import * as argon from 'argon2';

@Injectable()
export class RefreshTokenGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly UserModel: Model<User>
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = this.extractRefreshTokenFromCookie(request);

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_JWT_SECRET
      });
      const user = await this.UserModel.findOne({ _id: payload.sub });

      const isRefreshTokenMached = await argon.verify(user!.storedRefreshToken, refreshToken);

      if (!isRefreshTokenMached) {
        throw new UnauthorizedException();
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractRefreshTokenFromCookie(request: Request): string | undefined {
    const token = request.cookies['fridaymake-up-rt'] ?? undefined;

    return token;
  }
}
