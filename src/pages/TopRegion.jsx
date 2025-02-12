"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
    color: "hsl(210, 100%, 50%)", // This is a vibrant blue color
  },
};

export function TopRegion({ chartData }) {
  const currentMonth = chartData[chartData.length - 1];
  const previousMonth = chartData[chartData.length - 2];
  const percentageChange =
    ((currentMonth.orders - previousMonth.orders) / previousMonth.orders) * 100;

  return (
    <div>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Top Selling Regions</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="location"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="orders" fill="var(--color-orders)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
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
            Showing top selling regions for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
