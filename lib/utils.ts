// lib/utils.ts
export function randomData(type: string, size: number, config?: any) {
    const data: any[] = [];
    
    const generateString = (length: number) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    };
  
    const generateNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    const generateDate = (start: Date, end: Date) => {
      const diff = end.getTime() - start.getTime();
      const randomTime = Math.floor(Math.random() * diff) + start.getTime();
      return new Date(randomTime);
    };
  
    for (let i = 0; i < size; i++) {
      if (type === 'string') {
        data.push(generateString(config?.length || 5));
      } else if (type === 'integer') {
        data.push(generateNumber(config?.min || 0, config?.max || 1000));
      } else if (type === 'float') {
        data.push((Math.random() * (config?.max - config?.min) + config?.min).toFixed(2));
      } else if (type === 'date') {
        data.push(generateDate(config?.start || new Date(2020, 0, 1), config?.end || new Date()));
      }
    }
    return data;
  }
  