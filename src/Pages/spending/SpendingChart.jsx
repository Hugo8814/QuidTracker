import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

//🔹 Income Instead? → Change data[month][day].expenses to data[month][day].income
//🔹 Total (Income - Expenses)? → Use data[month][day].income - data[month][day].expenses

export default function SpendingChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  const months = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));
  const latestMonth = months[0];
  const prevMonth = months[1];

  // Get the current day
  const today = new Date();
  const currentDay = today.getDate();

  // Helper function to get all days in a month
  const getDaysInMonth = (month) => {
    const date = new Date(2025, new Date().getMonth(), 1); // Using 2025 as your data is in 2025
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Create cumulative data
  const maxDaysInLatestMonth = getDaysInMonth(latestMonth);
  const data2 = Array.from({ length: maxDaysInLatestMonth }, (_, i) => {
    const day = i + 1;

    let currentMonthTotal = 0;
    let prevMonthTotal = 0;

    // For current month, only calculate up to the current day
    if (day <= currentDay) {
      for (let d = 1; d <= day; d++) {
        currentMonthTotal += data[latestMonth][d]?.expenses || 0;
      }
    }

    // For previous month, calculate for all days
    if (prevMonth) {
      for (let d = 1; d <= day; d++) {
        prevMonthTotal += data[prevMonth][d]?.expenses || 0;
      }
    }

    return {
      name: `${day} ${latestMonth}`,
      currentMonth: day <= currentDay ? currentMonthTotal : null, // Stop currentMonth after today
      prevMonth: prevMonthTotal, // Continue prevMonth for all days
    };
  });

  const xAxisTicks = [
    `1 ${latestMonth}`,
    `${Math.floor(maxDaysInLatestMonth / 2)} ${latestMonth}`,
    `${maxDaysInLatestMonth} ${latestMonth}`,
  ];

  console.log(data2);
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data2}
        margin={{ top: 20, right: 50, left: 50, bottom: 20 }}
      >
        <Tooltip
          contentStyle={{
            backgroundColor: "#f4f4f4",
            border: "none",
            borderRadius: "8px",
          }}
          itemStyle={{ color: "black" }}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b6b6b" }}
          ticks={xAxisTicks}
          tickFormatter={(value) => {
            // Extract just the day number from the data point
            const day = value.split(" ")[0];
            return `${day} ${latestMonth}`;
          }}
        />
        <Line
          dataKey="prevMonth"
          stroke="#e8e8e8"
          strokeWidth={3}
          dot={(props) =>
            props.payload.name === `${maxDaysInLatestMonth} ${latestMonth}` ? (
              <circle
                key={props.payload.name}
                cx={props.cx}
                cy={props.cy}
                r={4}
                fill="#e8e8e8"
              />
            ) : null
          }
        />
        <Line
          dataKey="currentMonth"
          stroke="#0055ff"
          strokeWidth={3}
          dot={(props) =>
            props.payload.name === `${currentDay} ${latestMonth}` ? (
              <circle
                key={props.payload.name}
                cx={props.cx}
                cy={props.cy}
                r={4}
                fill="#0055ff"
              />
            ) : null
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
