import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  })

  it('should be able list all providers', async () => {

    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '321321'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jose das Couves',
      email: 'josedascouves@example.com',
      password: 'sdk#v93Dx2'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

    expect(providers).toStrictEqual([
      user1,
      user2
    ])

    expect(providers.find(user => user.id === loggedUser.id)).toBeFalsy;

  });
});
