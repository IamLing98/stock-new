import { UseGoogleAuth, GoogleAuthResult } from '@nestjs-hybrid-auth/google';
import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: any) {}

  @UseGoogleAuth()
  @Get('auth/google')
  loginWithGoogle() {
    return 'Login with Google';
  }

  @UseGoogleAuth()
  @Get('auth/google-login/callback')
  googleCallback(@Request() req): Partial<GoogleAuthResult> {
    const result: GoogleAuthResult = req.hybridAuthResult;
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      profile: result.profile,
    };
  }
}
