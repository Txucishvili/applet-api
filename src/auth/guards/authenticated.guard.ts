import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext):  Promise<boolean> {
    const req = await context.switchToHttp().getRequest();

    if(!req.isAuthenticated()) {
      throw new UnauthorizedException()
    }
    
    return true;
  }
}