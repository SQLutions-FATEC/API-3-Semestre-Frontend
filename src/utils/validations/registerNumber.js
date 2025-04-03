export const validateRN = (number) => {
  const rawValue = number.replace(/\D/g, '');

  if (!rawValue) return 'Número de registro é obrigatório';
  if (rawValue.length !== 11) return 'Número de registro deve ter 11 dígitos';

  return '';
};
