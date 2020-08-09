import { startOfHour, isBefore, getHours, format } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,    
  ) {}

  
  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can\'t create an appointment on a pasta date');
    }

    // TODO Verificar se o conflito não deveria levar em consideração o horário
    // E o provider para dizer que há uma colisão de agendamento
    const collidingAppointment = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id
    );

    if (user_id === provider_id) {
      throw new AppError('User and provider cannot be the same')
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointment between 8am and 5pm');
    }
    
    if (collidingAppointment) {
      throw new AppError('Appointment already booked');
    }

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    await this.notificationsRepository.create({
        recipient_id: provider_id,
        content: `Novo agendamento para ${dateFormatted}.`
      }
    )

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`)
    return appointment;
  }
}

export default CreateAppointmentService;
