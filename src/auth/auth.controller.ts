import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { commonResponse } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() request) {
    Logger.debug('[CONTROLLER] Triggering login with google');

    return;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() request) {
    Logger.debug('[CONTROLLER] Redirecting current gmail login request');

    const { user } = request;
    const userData = await this.authService.signWithGoogle(user);

    return commonResponse('Successfully login with gmail!', userData);
  }
  
  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  async test() {
    console.log('[ARI]')
    return {
      message: 'Youre in secure area!'
    }
  }
}
