import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

//🔹 Income Instead? → Change data[month][day].expenses to data[month][day].income
//🔹 Total (Income - Expenses)? → Use data[month][day].income - data[month][day].expenses

export default function SpendingChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    console.log("No data available");
    return <div>No data available</div>;
  }

  // Get all months available in the data
  const months = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));
  console.log(months);

  // Determine latest month and previous month
  const latestMonth = months[0]; // Most recent month
  const prevMonth = months[1]; // Previous month

  // Process data
  const data2 = Object.keys(data[latestMonth]).map((day) => ({
    name: `${day} ${latestMonth}`,
    // currentMonth:
    //   data[latestMonth][day].income - data[latestMonth][day].expenses,
    // prevMonth: prevMonth
    //   ? data[prevMonth][day]?.income - data[prevMonth][day]?.expenses
    //   : 0,
    currentMonth: data[latestMonth][day].expenses,
    prevMonth: prevMonth ? data[prevMonth][day]?.income || 0 : 0,
  }));

  console.log("Processed Data:", data2);

  // X-axis labels: First day of prevMonth, middle of latestMonth, last day of latestMonth
  const xAxisTicks = [
    `1 ${latestMonth}`,
    `15 ${latestMonth}`,
    `${Object.keys(data[latestMonth]).pop()} ${latestMonth}`,
  ].filter(Boolean); // Remove null values

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
          ticks={xAxisTicks} // Dynamically generated ticks
        />
        <Line
          dataKey="prevMonth"
          stroke="#e8e8e8"
          strokeWidth={3}
          dot={(props) =>
            props.payload.name === xAxisTicks[0] ? (
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
            props.payload.name === xAxisTicks[xAxisTicks.length - 1] &&
            props.payload.currentMonth !== 0 ? (
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
