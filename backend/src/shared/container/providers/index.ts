import IStorageProvider from '@shared/container/providers/StoragesProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StoragesProvider/implementations/DiskStorageProvider';

// import IMailProvier from '@shared/container/providers/MailProvider/models/IMailProvider';
// import MailProvider from '@shared/container/providers/MailProvider/implementations/'
import {container} from 'tsyringe';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider  
)
