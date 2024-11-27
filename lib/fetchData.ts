type DataRange = 'last7Days' | 'last30Days';

// Simulating fetching random data based on the selected date range
export const fetchDataByRange = async (range: DataRange) => {
  const data = generateRandomData(range); 
  return data;
};

const generateRandomData = (range: DataRange) => {
  const now = new Date();
  let startDate;


  if (range === 'last7Days') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
  } else if (range === 'last30Days') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 30);
  } else {
    startDate = new Date(now);
  }


  const randomData: { date: string; sales: number; expenses: number }[] = [];
  const labels = generateDateLabels(startDate, now); 

  labels.forEach((label) => {
    randomData.push({
      date: label,
      sales: Math.floor(Math.random() * 1000) + 100,
      expenses: Math.floor(Math.random() * 500) + 50,
    });
  });

  return { randomData }; 
};

const generateDateLabels = (startDate: Date, endDate: Date) => {
  const labels = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    labels.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1); 
  }
  return labels;
};

// Format date as YYYY-MM-DD
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
