import myFetch from 'utils/fetch';

const formatDateForAPI = date => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date');
  }
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

async function fetchVisitors(startDate, endDate) {
  const visitorData = await myFetch(
    `/api/checkins?start_time=${formatDateForAPI(startDate)}&end_time=${formatDateForAPI(endDate)}`,
  );
  return visitorData;
}

export default fetchVisitors;
