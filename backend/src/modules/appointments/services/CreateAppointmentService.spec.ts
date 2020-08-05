import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment:CreateAppointmentService;

describe('CreateAppointment', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  })

  it('should be able to create a new appointment', async () => {

    const provider_id = '123123123'
    const user_id = '123123'

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4,  10, 13),
      user_id,
      provider_id
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);

  });

  it('should not be able to schedule an appointment for the same date/time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 13);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123123',
        provider_id: '123123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: 'user-id',
        provider_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  
  it('should not be able to create an appointment before 8am or after 5pm', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 5),
        user_id: '123123',
        provider_id: '123123123'
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 19),
        user_id: '123123',
        provider_id: '123123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  })
});
