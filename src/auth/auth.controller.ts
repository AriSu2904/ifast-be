import { Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
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
  
  @Post('locals')
  async localSign(@Req() request) {
    Logger.debug('[CONTROLLER] Incoming Local Sign with email');

    const user = await this.authService.signWithLocals(request.body);

    return commonResponse('Successfully Registered', user);
  }

  @Post('additional-info')
  @UseGuards(AuthGuard('jwt'))
  async fillAdditionalInfo(@Req() request) {
    Logger.debug('[CONTROLLER] Incoming Additional info request');

    const { body } = request;

    const result = await this.authService.requiredAdditionals(body);

    return commonResponse('Successfully fill additional info', result);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() req) {
    const user = await this.authService.userProfile(req.user);

    return commonResponse('Successfully retrieve user profile', user);
  }
}
