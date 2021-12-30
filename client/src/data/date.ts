import dayjs from 'dayjs';

export default {
  format: (date: Date) => dayjs(date).format('MMM D'),
}