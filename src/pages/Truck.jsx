"use client";

import { useState, useEffect, useMemo } from "react";
import { TrendingUp, Loader2 } from "lucide-react";
import { Label, Legend, Pie, PieChart } from "recharts";

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

const chartConfig = {
  trucks: {
    label: "Trucks",
  },
  free: {
    label: "Free Trucks",
    color: "hsl(var(--chart-1))",
  },
  ordering: {
    label: "Ordering Trucks",
    color: "hsl(var(--chart-2))",
  },
  completed: {
    label: "Completed Assigned",
    color: "hsl(var(--chart-3))",
  },
};

const chartData = [
  {
    status: "free",
    trucks: 10,
    fill: "hsl(var(--chart-1))",
  },
  {
    status: "ordering",
    trucks: 50,
    fill: "hsl(var(--chart-2))",
  },
  {
    status: "completed",
    trucks: 10,
    fill: "hsl(var(--chart-3))",
  },
];

export function Truck() {
  //   const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const fetchTruckData = async () => {
  //       try {
  //         const response = await fetch("url")
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch truck data")
  //         }
  //         const data = await response.json()

  //         // Transform the data and assign colors
  //         const transformedData = [
  //           { status: "free", trucks: data.freeTrucks },
  //           { status: "ordering", trucks: data.orderingTrucks},
  //           { status: "completed", trucks: data.completedTrucks },
  //         ]

  //         setChartData(transformedData)
  //       } catch (err) {
  //         setError("Error fetching truck data. Please try again later.")
  //       } finally {
  //         setIsLoading(false)
  //       }
  //     }

  //     fetchTruckData()
  //   }, [])

  const totalTrucks = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.trucks, 0);
  }, [chartData]);

  if (isLoading) {
    return (
      <Card className="flex flex-col items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">Loading truck data...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col items-center justify-center h-[400px]">
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Truck Management Overview</CardTitle>
        <CardDescription>Current Status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="trucks"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTrucks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Trucks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
