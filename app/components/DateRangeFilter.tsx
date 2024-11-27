// components/DateRangeFilter.tsx
type DateRange = 'last7Days' | 'last30Days';

interface DateRangeFilterProps {
  onChange: (range: DateRange) => void;
}

const DateRangeFilter = ({ onChange }: DateRangeFilterProps) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as DateRange);
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label
        htmlFor="date-range"
        className="text-sm font-medium text-gray-700"
      >
        Select Date Range:
      </label>
      <select
        id="date-range"
        onChange={handleSelectChange}
        className="w-full max-w-xs rounded-md text-gray-600 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="last7Days">Last 7 Days</option>
        <option value="last30Days">Last 30 Days</option>
      </select>
    </div>
  );
};

export default DateRangeFilter;
