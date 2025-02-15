import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { GetCurrentUserId, Public } from 'src/libs/decorators';
import { RefreshTokenGuard } from './guards/refresh-token/refresh-token.guard';
import { SignUpRequest } from 'src/libs/models/sign-up';
import { SignInRequest } from 'src/libs/models/sign-in';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('/sign-up')
  public signUp(@Res() res: Response, @Body() signUpRequest: SignUpRequest) {
    return this.authService.signUp(res, signUpRequest);
  }

  @Public()
  @Post('/sign-in')
  public signIn(@Res() res: Response, @Body() signInRequest: SignInRequest) {
    return this.authService.signIn(res, signInRequest);
  }

  @Post('/sign-out')
  public signOut(@Res() res: Response) {
    return this.authService.signOut(res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  public refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Get('/check-validation')
  public checkValidation(@Res() res: Response) {
    return this.authService.checkValidation(res);
  }

  @Get('/user')
  public getUser(@Res() res: Response, @GetCurrentUserId() userId: string) {
    return this.authService.getUser(res, userId);
  }

  @Post('/send-email-verification')
  public sendEmailVerification(@Req() req: Request, @Res() res: Response) {
    return this.authService.sendEmailVerification(req, res);
  }

  @Public()
  @Get('/email-verify')
  public emailVerification(@Res() res: Response, @Query('token') token: string, @Query('email') email: string) {
    this.authService.emailVerification(res, token, email);
  }

  @Public()
  @Post('/send-email-reset-password')
  public sendEmailResetPassword(@Res() res: Response, @Body() sendEmailRequest: { email: string }) {
    return this.authService.sendEmailResetPassword(res, sendEmailRequest);
  }

  @Public()
  @Get('/check-session-validation/:sessionId')
  public checkSessionValidation(@Res() res: Response, @Param('sessionId') sessionId: string) {
    return this.authService.checkSessionValidation(res, sessionId);
  }

  @Public()
  @Post('/change-user-password/:sessionId') 
  public changeUserPassword(@Res() res: Response, @Param('sessionId') sessionId: string, @Body() changeUserPasswordRequest: { newPassword: string }) {
    return this.authService.changeUserPassword(res, sessionId, changeUserPasswordRequest);
  }
}
