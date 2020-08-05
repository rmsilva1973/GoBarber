import FakeAppointmentsRepository from 
  '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabitliyService from './ListProviderMonthAvailabilityService';
import AppError from '@shared/errors/AppError';

let listProviderMonthAvailability: ListProviderMonthAvailabitliyService;
let fakeAppointmentsRepository: FakeAppointmentsRepository
describe('ListProviderMonthAvailability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new 
      ListProviderMonthAvailabitliyService(fakeAppointmentsRepository);
  })

  it('should be able list availability of a provider on a month', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 4, 8, 0, 0)
    })

     fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 8, 0, 0)
    })
    fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 9, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 10, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 11, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 12, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 13, 0, 0)
    })    
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 14, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 15, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 16, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 17, 0, 0)
    })
      
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 5, 10, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 6, 8, 0, 0)
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 8
    });
  
    // Não é bem isso... O teste deveria ver se tem dias com ALGUM
    // horário disponível.

    expect(availability).toEqual(expect.arrayContaining([
      {day: 4, available: true},
      {day: 5, available: false},
      {day: 6, available: true},
      {day: 22, available: true},
    ]))
  });
});
