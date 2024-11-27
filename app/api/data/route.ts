import { randomData } from '@/lib/utils';

export async function GET() {
  // Generate random data
  const sales = randomData('float', 30, { min: 50, max: 500 });
  const expenses = randomData('float', 30, { min: 20, max: 300 });
  const dates = randomData('date', 30, { start: new Date(2023, 0, 1), end: new Date() });

  const responseData = {
    sales,
    expenses,
    dates,
  };

  return new Response(JSON.stringify(responseData), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
