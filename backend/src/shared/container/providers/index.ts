import {container} from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StoragesProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StoragesProvider/implementations/DiskStorageProvider';

import IMailProvier from '@shared/container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProviders'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider  
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvier>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)

