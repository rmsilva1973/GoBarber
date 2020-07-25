import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentCotnroller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id: provider,
      date: parsedDate,
    });
    return response.json(appointment);
  }
}
