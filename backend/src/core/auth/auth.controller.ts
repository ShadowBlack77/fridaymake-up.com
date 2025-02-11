import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Public } from 'src/libs/decorators';
import { RefreshTokenGuard } from './guards/refresh-token/refresh-token.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  public signUp(@Res() res: Response, @Body() signUpRequest: any) {
    return this.authService.signUp(res, signUpRequest);
  }

  @Public()
  @Post('/sign-in')
  public signIn(@Res() res: Response, @Body() signInRequest: any) {
    return this.authService.signIn(res, signInRequest);
  }

  @Post('/sign-out')
  public signOut(@Req() req: Request, @Res() res: Response) {
    return this.authService.signOut(req, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  public refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }
}
