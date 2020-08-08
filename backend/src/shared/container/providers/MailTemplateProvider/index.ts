import {container} from 'tsyringe';

import IMailTemplateProvier from './models/IMailTemplateProvider';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProviders';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
}

container.registerSingleton<IMailTemplateProvier>(
  'MailTemplateProvider',
  providers.handlebars
);
