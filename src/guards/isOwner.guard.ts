import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { rolesSeed } from 'src/seeds/roles.seed';

@Injectable()
export class IsOwner implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user.role != 2) {
      return false;
    }
    return true;
  }
}
