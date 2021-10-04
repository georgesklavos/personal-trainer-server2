import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { roles } from 'src/seeds/roles.seed';

@Injectable()
export class IsOwnerOrIsTrainer implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      request.user.role != roles.Owner ||
      request.user.role != roles.Trainer
    ) {
      return false;
    }
    return true;
  }
}
