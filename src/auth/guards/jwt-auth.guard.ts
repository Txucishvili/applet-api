import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = await context.switchToHttp().getRequest();
    const user = request.user as any;
    if (!user) {
      throw new UnauthorizedException();
    }
    return super.canActivate(context);
  }
}