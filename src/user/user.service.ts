import { AuthService } from 'src/auth/auth.service';
import { ThemesService } from 'src/themes/themes.service';
import { Theme } from 'src/themes/entities/theme.entity';
import { UserDto } from './dto/user.dto';
import { forwardRef, Inject, Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { throwError } from 'rxjs';
import * as bcrypt from 'bcrypt';

export type RemoveField<Type, U> = {
  [Property in keyof Type as Exclude<Property, U>]: Type[Property]
};

@Injectable()
export class UserService {
  private readonly users: any[];

  constructor(
    @InjectRepository(Theme)
    private theme: Repository<Theme>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {

  }

  async registerUser(user: UserDto): Promise<RemoveField<User, 'password'>> {
    const context = this.usersRepository.create(user);

    const defaultTheme = await this.theme.findOneBy({ isDefault: true })

    user.theme = defaultTheme.name;

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    user.password = hash;

    // save and return
    await this.usersRepository.save(user);
    const { password, ...currentUser } = await this.usersRepository.findOneBy({ id: context.id })

    return currentUser;
  }


  async signIn(req: AuthDto): Promise<any> {
    const currentUser = this.usersRepository.findOneBy({ email: req.email });

    if (!currentUser) {
      return Promise.reject(new Error('user not found'))
    }

    return currentUser;
  }

  async findOne(email: string): Promise<any | undefined> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async checkEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email: email });

    if (user && user.email) {
      return {
        status: 400,
        message: 'User already exist by this email'
      }
    }

    return {
      status: 'success'
    };
  }
}
