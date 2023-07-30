import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];
    if (requiredRoles && requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const hasRole = () =>
      user.UserRole.permission
        .split(',')
        .some((role) => requiredRoles.find((i) => i === role));
    //   return hasRole();
    return user && user.UserRole.permission && hasRole();
  }
}
