import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ResponseAuthDto } from '../dto/response-auth.dto';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/signIn')
  async signIn(
    @Body() responseAuthDto: ResponseAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const accessToken = this.authService.signIn(responseAuthDto);

    res.cookie('Authentication', accessToken, {
      domain: 'uxm.mju.ac.kr',
      path: '/',
      httpOnly: true,
      maxAge: 0.5 * 60 * 60 * 1000, //0.5 hour
    });
    return accessToken;
  }
}
