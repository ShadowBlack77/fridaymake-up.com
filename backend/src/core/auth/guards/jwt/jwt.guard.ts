import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { IS_PUBLIC_KEY } from 'src/libs/decorators/public.decorator';
import { User } from 'src/libs/schemas';
import * as argon from 'argon2';

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @InjectModel(User.name) private readonly UserModel: Model<User>
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });
      const user = await this.UserModel.findOne({ _id: payload.sub });

      const isTokenMached = await argon.verify(user!.storedAccessToken, token);

      if (!isTokenMached) {
        throw new UnauthorizedException();
      }

      request['user'] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const token = request.cookies['fridaymake-up-at'] ?? undefined;

    return token;
  }
}
