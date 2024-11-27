type Config = {
  length?: number; // For string generation
  min?: number; // For number generation
  max?: number; // For number generation
  start?: Date; // For date generation
  end?: Date; // For date generation
};

export function randomData(
  type: 'string' | 'integer' | 'float' | 'date',
  size: number,
  config?: Config
): (string | number | Date)[] {
  if (size <= 0) {
    throw new Error('Size must be greater than 0.');
  }

  const data: (string | number | Date)[] = [];

  const generateString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length })
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');
  };

  const generateNumber = (min: number, max: number): number => {
    if (min > max) {
      throw new Error('Min value cannot be greater than max value.');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateDate = (start: Date, end: Date): Date => {
    if (start.getTime() > end.getTime()) {
      throw new Error('Start date cannot be later than end date.');
    }
    const diff = end.getTime() - start.getTime();
    const randomTime = Math.floor(Math.random() * diff) + start.getTime();
    return new Date(randomTime);
  };

  for (let i = 0; i < size; i++) {
    switch (type) {
      case 'string':
        data.push(generateString(config?.length || 5));
        break;

      case 'integer':
        data.push(generateNumber(config?.min || 0, config?.max || 1000));
        break;

      case 'float':
        const randomFloat =
          Math.random() * ((config?.max || 1) - (config?.min || 0)) +
          (config?.min || 0);
        data.push(parseFloat(randomFloat.toFixed(2)));
        break;

      case 'date':
        data.push(
          generateDate(
            config?.start || new Date(2020, 0, 1),
            config?.end || new Date()
          )
        );
        break;

      default:
        throw new Error('Invalid type specified. Supported types: string, integer, float, date.');
    }
  }

  return data;
}
