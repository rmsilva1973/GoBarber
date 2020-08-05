import FakeAppointmentsRepository from 
  '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabitliyService from './ListProviderDayAvailabilityService';
import AppError from '@shared/errors/AppError';

let listProviderDayAvailability: ListProviderDayAvailabitliyService;
let fakeAppointmentsRepository: FakeAppointmentsRepository
describe('ListProviderDayAvailability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new 
      ListProviderDayAvailabitliyService(fakeAppointmentsRepository);
  })

  it('should be able list availability of a provider on a specific day', async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 4, 14, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 4, 16, 0, 0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 4, 11).getTime();
    })

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
      day:4
    });
  
    expect(availability).toEqual(expect.arrayContaining([
      {hour: 8, available: false},
      {hour: 9, available: false},
      {hour: 10, available: false},
      {hour: 11, available: false},
      {hour: 12, available: true},
      {hour: 14, available: false},
      {hour: 15, available: true},
      {hour: 16, available: false},
    ]))
  });

  
});
