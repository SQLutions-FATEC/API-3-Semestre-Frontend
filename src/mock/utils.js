import { Response } from 'miragejs';

export function APIFailureWrapper({
  content,
  errorMessage = 'Erro genérico',
  specificError = {},
  failureRate = 0,
}) {
  const chance = Math.floor(Math.random() * 100);
  if (failureRate > chance) {
    if (Object.keys(specificError).length) {
      return new Response(
        specificError.status,
        { 'Content-Type': 'application/json' },
        {
          code: specificError.status,
          key: specificError.message,
          context: {
            message: specificError.message,
            additionalInfo: 'Detalhes adicionais do contexto',
          },
        }
      );
    } else {
      return new Response(
        400,
        { 'Content-Type': 'application/json' },
        {
          code: 400,
          key: errorMessage,
          context: {
            message: errorMessage,
            additionalInfo: 'Detalhes adicionais do contexto',
          },
        }
      );
    }
  }
  return content;
}

export function mockFlag(params, state = 'on') {
  if (state === 'on') {
    return params;
  }
  return { method: params.method, url: '', result: params.result };
}
