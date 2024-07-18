import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default function RevenueChart({
  revenue,
}: {
  revenue: Revenue[];
}) {

  const chartSetting = {
    yAxis: [
      {
        label: 'gp (M)',
      },
    ],
    width: 1500,
    height: 500,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-13px, 0)',
      },
      padding: '5px'
    },
  };

  const valueFormatter = (value: number | null) => `${value}M`;

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="rounded-xl bg-gray-50 p-10">
        <BarChart
          dataset={revenue}
          xAxis={[{
            scaleType: 'band', 
            dataKey: 'month',
            tickLabelStyle: {
              angle: -15,
              textAnchor: 'end',
              fontSize: 10,
          },
          }]}
          series={[{dataKey: 'revenue', label: 'earned', valueFormatter}]}
          {...chartSetting}
        />
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Today</h3>
        </div>
      </div>
    </div>
  );
}
