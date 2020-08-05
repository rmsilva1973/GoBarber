import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StoragesProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  })
  it('should be able to update an user\'s Avatar', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(updatedUser.avatar).toBe('avatar.jpg');
  });

  
  it('should not be able to update a nonexistent user Avatar', async () => {
    await expect(() => updateUserAvatar.execute({
      user_id: 'non-existing-user-id',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should delete previous existent avatar from user', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar1.jpg'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');
    expect(user.avatar).toBe('avatar2.jpg');

  });

});
