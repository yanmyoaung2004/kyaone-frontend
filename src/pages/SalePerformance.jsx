import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
};

const reorderMonths = (ordersArray) => {
  const currentMonthIndex = new Date().getMonth();

  return [
    ...ordersArray.slice(currentMonthIndex),
    ...ordersArray.slice(0, currentMonthIndex),
  ];
};

export function SalePerformance({ ordersData }) {
  const chartData = reorderMonths(ordersData);
  const currentMonth = chartData[chartData.length - 1];
  const previousMonth = chartData[chartData.length - 2];

  const percentageChange =
    previousMonth.orders !== 0
      ? ((currentMonth.orders - previousMonth.orders) / previousMonth.orders) *
        100
      : currentMonth.orders > 0
      ? 100
      : 0;

  return (
    <Card className="max-w-3xl w-full mx-auto flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Order Performance</CardTitle>
        <CardDescription>Total Orders: January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
              stroke="hsl(var(--muted-foreground))"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="orders"
              type="monotone"
              stroke="var(--color-orders)"
              strokeWidth={2}
              dot={{ fill: "var(--color-orders)", strokeWidth: 2 }}
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
        <div className="leading-none text-muted-foreground">
          Showing total order count for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
