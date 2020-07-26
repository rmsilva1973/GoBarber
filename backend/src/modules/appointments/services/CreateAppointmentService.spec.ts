import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@Shared/errors/AppError';

describe('CreateAppointment', () => {

  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const provider_id = '123123123'

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);

  });

  it('should not be able to schedule an appointment for the same date/time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const provider_id = '123123123';
    const date = new Date();

    await createAppointment.execute({
      date,
      provider_id
    })

    expect(createAppointment.execute({
      date,
      provider_id
    })).rejects.toBeInstanceOf(AppError)

  });

});
