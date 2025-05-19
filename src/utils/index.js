import dayjs from 'dayjs';

const formatDateTime = (dateString) => {
  return dayjs(dateString).format('DD/MM/YYYY HH:mm');
};

const formatDate = (dateString) => {
  return dayjs(dateString).format('DD/MM/YYYY');
};

const generateRandomColors = (count) => {
  const colors = [];
  for (let index = 0; index < count; index++) {
    const hue = Math.floor((360 / count) * index);
    const saturation = 70 + Math.random() * 30;
    const lightness = 50 + Math.random() * 10;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};

const registerNumberMask = (text) => {
  const masked = text.replace(/^(\d{3})(\d{5})(\d{2})(\d{1})$/, '$1.$2.$3-$4');
  return masked;
};

export { formatDate, formatDateTime, generateRandomColors, registerNumberMask };
