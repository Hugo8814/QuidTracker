import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Dot,
  Scatter,
} from "recharts";
console.disableYellowBox = true;

let febTotal = 0;
let marTotal = 0;

const data = [
  { name: "1 Jan", feb: (febTotal += 0), mar: (marTotal += 5) },
  { name: "2 Jan", feb: (febTotal += 0), mar: (marTotal += 0) },
  { name: "3 Jan", feb: (febTotal += 0), mar: (marTotal += 7) },
  { name: "4 Jan", feb: (febTotal += 0), mar: (marTotal += 0) },
  { name: "5 Jan", feb: (febTotal += 0), mar: (marTotal += 0) },
  { name: "6 Jan", feb: (febTotal += 0), mar: (marTotal += 0) },
  { name: "7 Jan", feb: (febTotal += 0), mar: (marTotal += 8) },
  { name: "8 Jan", feb: (febTotal += 15), mar: (marTotal += 5) },
  { name: "9 Jan", feb: (febTotal += 0), mar: (marTotal += 9) },
  { name: "10 Jan", feb: (febTotal += 25), mar: (marTotal += 0) },
  { name: "11 Jan", feb: (febTotal += 0), mar: (marTotal += 0) },
  { name: "12 Jan", feb: (febTotal += 5), mar: (marTotal += 0) },
  { name: "13 Jan", feb: (febTotal += 0), mar: (marTotal += 7) },
  { name: "14 Jan", feb: (febTotal += 0), mar: (marTotal += 0) },
  { name: "15 Jan", feb: (febTotal += 12), mar: (marTotal += 10) },
  { name: "16 Jan", feb: (febTotal += 5), mar: (marTotal += 7) },
  { name: "17 Jan", feb: (febTotal += 0), mar: (marTotal += 0) },
  { name: "18 Jan", feb: (febTotal += 3), mar: (marTotal += 9) },
  { name: "19 Jan", feb: (febTotal += 7), mar: (marTotal += 0) },
  { name: "20 Jan", feb: (febTotal += 5), mar: (marTotal += 12) },
  { name: "21 Jan", feb: (febTotal += 0), mar: (marTotal += 0) },
  { name: "22 Jan", feb: (febTotal += 0), mar: (marTotal += 30) },
  { name: "23 Jan", feb: (febTotal += 7), mar: (marTotal += 0) },
  { name: "24 Jan", feb: (febTotal += 5) },
  { name: "25 Jan", feb: (febTotal += 0) },
  { name: "26 Jan", feb: (febTotal += 30) },
  { name: "27 Jan", feb: (febTotal += 0) },
  { name: "28 Jan", feb: (febTotal += 0) },
  { name: "29 Jan", feb: (febTotal += 5) },
  { name: "30 Jan", feb: (febTotal += 0) },
  { name: "31 Jan", feb: (febTotal += 10) },
];

export default function SpendingChart() {
  const lastData = data[data.length - 1]; // Get the last data point
  const newestData = [...data]
    .reverse()
    .find((point) => point.mar !== undefined);
  const xAxisTicks = ["1 Jan", "16 Jan", "31 Jan"]; // Only these dates will be shown

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
      >
        <Tooltip
          contentStyle={{
            backgroundColor: "#f4f4f4",
            border: "none",
            borderRadius: "8px",
          }}
          itemStyle={{ color: "black" }}
        />
        {/* // eslint-disable-next-line react/default-props-match-prop-types */}
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b6b6b" }}
          padding={{ left: 0, right: 0 }}
          ticks={xAxisTicks} // Display only selected tick
        />

        <Line
          dataKey="feb"
          stroke="#e8e8e8"
          strokeWidth={3}
          dot={(props, index) =>
            props.payload.name === newestData.name &&
            props.payload.mar !== 0 ? (
              <circle
                key={props.payload.name + index} // Add a unique key prop
                cx={props.cx}
                cy={props.cy}
                r={4}
                fill="#0055ff"
              />
            ) : null
          }
        />
        <Line
          dataKey="mar"
          stroke="#0055ff"
          strokeWidth={3}
          dot={(props, index) =>
            props.payload.name === newestData.name &&
            props.payload.mar !== 0 ? (
              <circle
                key={props.payload.name + index} // Add a unique key prop
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
