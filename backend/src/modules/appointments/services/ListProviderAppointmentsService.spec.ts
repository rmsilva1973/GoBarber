import FakeAppointmentsRepository from 
  '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderDayAvailability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new 
      ListProviderAppointmentsService(fakeAppointmentsRepository);
  })

  it('should be able to list provider\'s appointment on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 7, 5, 13, 0, 0)
    })

    console.log(appointment1);

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 7, 5, 15, 0, 0)
    })

    console.log(appointment2);
    
    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 7,
      day:5
    });
  
    expect(appointments).toEqual([appointment1, appointment2])
  });

  
});
