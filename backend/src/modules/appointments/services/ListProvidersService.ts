import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({user_id}: IRequestDTO): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    });
    
    // TODO Remove password from returned list
    // delete users[].password;

    return users;
  }
}

export default ListProvidersService;
