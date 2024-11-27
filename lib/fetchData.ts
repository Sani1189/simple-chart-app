type DataRange = 'last7Days' | 'last30Days';

// Simulating fetching random data based on the selected date range
export const fetchDataByRange = async (range: DataRange) => {
  // Simulate generating data for the selected range
  const data = generateRandomData(range);  // This is the data we get from the helper function
  return data;
};

// Helper function to generate random data based on the date range
const generateRandomData = (range: DataRange) => {
  const now = new Date();
  let startDate;

  // Determine the start date based on the selected range
  if (range === 'last7Days') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
  } else if (range === 'last30Days') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 30);
  } else {
    // 'custom' range can be handled here (you can extend it as needed)
    startDate = new Date(now);
  }

  // Generate random data for sales and expenses
  const randomData: { date: string; sales: number; expenses: number }[] = [];
  const labels = generateDateLabels(startDate, now);  // Generate labels for the range

  labels.forEach((label) => {
    randomData.push({
      date: label,
      sales: Math.floor(Math.random() * 1000) + 100, // Random sales between 100 and 1000
      expenses: Math.floor(Math.random() * 500) + 50, // Random expenses between 50 and 500
    });
  });

  return { randomData }; // Returning labels and the newly named randomData
};

// Generate date labels (e.g., daily labels for the last 7 days)
const generateDateLabels = (startDate: Date, endDate: Date) => {
  const labels = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    labels.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
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
