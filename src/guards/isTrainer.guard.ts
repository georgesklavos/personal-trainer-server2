import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { rolesSeed } from 'src/seeds/roles.seed';

@Injectable()
export class IsTrainer implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user.role != 3) {
      return false;
    }
    return true;
  }
}
