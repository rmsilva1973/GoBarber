import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { uuid } from 'uuidv4';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUserTokensRepository implements IUserTokensRepository {

  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign({
      id: uuid(),
      token: uuid(),
      user_id,
    })

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken (token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(findToken => findToken.token === token)

    return userToken
  }
}

export default FakeUserTokensRepository;