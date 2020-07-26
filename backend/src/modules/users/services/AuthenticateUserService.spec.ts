import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {

  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvier = new FakeHashProvider();
    
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvier);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvier);
  
    const user = await createUser.execute({
      name: 'John Doe',
      email:  'johndoe@example.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email:  'johndoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate non-existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvier = new FakeHashProvider();
    
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvier);

    await expect(authenticateUser.execute({
      email: 'nosuchuser@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvier = new FakeHashProvider();
    
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvier);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvier);
  
    await createUser.execute({
      name: 'John Doe',
      email:  'johndoe@example.com',
      password: '123456'
    })

    await expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });
});
