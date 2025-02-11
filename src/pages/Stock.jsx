import { Laptop, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  { Laptop: "MSI", products : 186 },
  { Laptop: "Dell", products: 305 },
  { Laptop: "Asus", products: 237 },
  { Laptop: "Macbook", products: 73 },
  { Laptop: "Lenovo", products: 209 },
  { Laptop: "Samsung", products: 214 },
];

const chartConfig = {
  desktop: {
    label: "products",
    color: "hsl(var(--chart-1))",
  },
};

export function Stock() {
  return (
    <div className="mx-auto w-[500px]">
            <Card>
      <CardHeader>
        <CardTitle>Stock Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="Laptop"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Set the fill color to blue */}
            <Bar dataKey="desktop" fill="#007bff" radius={5} /> {/* Bootstrap blue */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
    </div>
  );
}