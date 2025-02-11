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
  { Laptop: "MSI", Stocks: 186 },
  { Laptop: "Dell", Stocks: 305 },
  { Laptop: "Asus", Stocks: 237 },
  { Laptop: "Macbook", Stocks: 73 },
  { Laptop: "Lenovo", Stocks: 209 },
  { Laptop: "Samsung", Stocks: 214 },
];
const chartConfig = {
  desktop: {
    label: "products",
    color: "hsl(var(--chart-1))",
  },
};
export function Stock() {
  return (
    <div className="mx-auto  w-[500px] h-[200px]">
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
              <XAxis type="number" dataKey="Stocks" />
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
              <Bar dataKey="Stocks" fill="#007bff" radius={5} />{" "}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
