import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", profit: 186 },
  { month: "February", profit: 305 },
  { month: "March", profit: 237 },
  { month: "April", profit: 73 },
  { month: "May", profit: 209 },
  { month: "June", profit: 214 },
];

const chartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(210, 100%, 50%)", // Bright blue
  },
};

export function Profit() {
  const currentMonth = chartData[chartData.length - 1];
  const previousMonth = chartData[chartData.length - 2];
  const percentageChange =
    ((currentMonth.profit - previousMonth.profit) / previousMonth.profit) * 100;

  return (
    <div>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-black">Profit/Revenue</CardTitle>
          <CardDescription className="text-gray-700">
            January - June 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="#000000" // Black color for X-axis labels
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="profit"
                type="natural"
                stroke="hsl(210, 100%, 50%)" // Bright blue
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {percentageChange > 0 ? "Trending up " : "Trending down "}
            {Math.abs(percentageChange).toFixed(1)}% this month{" "}
            <TrendingUp
              className={`h-4 w-4 ${
                percentageChange > 0 ? "text-green-500" : "text-red-500"
              }`}
            />
          </div>
          <div className="leading-none text-gray-600">
            Showing total profit for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
