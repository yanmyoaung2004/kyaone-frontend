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

  return <></>;
}
