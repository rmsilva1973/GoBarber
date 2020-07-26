import IStorageProvider from '@shared/container/providers/StoragesProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StoragesProvider/implementations/DiskStorageProvider';
import {container} from 'tsyringe';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider  
)
