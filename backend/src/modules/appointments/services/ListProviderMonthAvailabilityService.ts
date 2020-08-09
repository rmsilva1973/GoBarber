import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

type IResponseDTO = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({provider_id, year, month}: IRequestDTO): Promise<IResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {provider_id, year, month}
    )
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray =  Array.from(
      {length: numberOfDaysInMonth},
      (_, index) => index + 1);

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const AppointmentsInDay = appointments.filter(appoinment => {
        return getDate(appoinment.date) === day;
      })

      return {
        day,
        available: isAfter(compareDate, new Date()) && AppointmentsInDay.length < 10
      }
    })

    // console.log(appointments);
    return availability;

  }
}

export default ListProviderMonthAvailabilityService;
