import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { env } from 'process';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_TOKEN_EXPIRES_IN },
    };
  },
};
