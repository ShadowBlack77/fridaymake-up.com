import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { GetCurrentUserId, Public } from 'src/libs/decorators';
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
  public signOut( @Res() res: Response) {
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
}
