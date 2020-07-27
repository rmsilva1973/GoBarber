import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import { AdvancedConsoleLogger } from 'typeorm';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail',  () => {
  
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository, 
      fakeUserTokensRepository
    );      
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create( {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const {token} = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token,
    })

    console.log(`*** ${JSON.stringify(user)}`)
    const updatedUser = await fakeUsersRepository.findById(user.id); 
    console.log(`*** ${JSON.stringify(updatedUser)}`)
    expect(updatedUser?.password).toBe('123123');

  });

});
