import express from 'express';
import appointmentsRouter from './routes/appointments.routes';

const app = express();

app.use(express.json());

app.use('/appointments', appointmentsRouter);

app.listen(3333, () => {
  console.log('Server started');
});
