import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    // const userIsAdmin = user.role.some((role) => role.name === 'admin');
    // const userIsUser = user.role.some((role) => role.name === 'user');
    // const userIsVendor = user.role.some((role) => role.name === 'vendor');

    // if (userIsAdmin) {
    //   UserRole.admin;
    // } else if (userIsVendor) {
    //   UserRole.vendor;
    // } else if (userIsUser) {
    //   UserRole.user;
    // }
    return {
      id: user.id,
      username: user.name,
      role: user.role,
    };
  }
}
