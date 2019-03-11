export default function formatDate(date) {
  if (!(date instanceof Date)) {
    return '';
  }
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
