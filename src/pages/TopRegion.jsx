import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
{ month: "Dagon", desktop: 186 },
  { month: "Pazundaung", desktop: 305 },
  { month: "Tamwe", desktop: 237 },
  { month: "Thingangyun", desktop: 73 },
  { month: "Yankin ", desktop: 209 },
  { month: "Seikkan", desktop: 214 },
]



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(210, 100%, 50%)", // This is a vibrant blue color
  },
}



export function TopRegion() {
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
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing top selling regions for the last 6 months</div>
      </CardFooter>
      </Card>
    </div>
  )
}

