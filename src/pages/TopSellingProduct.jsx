"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const chartData = [
  {
    category: "Extensions",
    product: "Chrome Extension",
    orders: 2750,
    color: "hsl(var(--chart-1))",
  },
  {
    category: "Mobile",
    product: "Redmi",
    orders: 2000,
    color: "hsl(var(--chart-2))",
  },
  {
    category: "Laptop",
    product: "ASUS",
    orders: 1870,
    color: "hsl(var(--chart-3))",
  },
  {
    category: "Extensions",
    product: "Edge Extension",
    orders: 500,
    color: "hsl(var(--chart-4))",
  },
  {
    category: "Others",
    product: "Other",
    orders: 700,
    color: "hsl(var(--chart-5))",
  },
];

const categories = ["All", ...new Set(chartData.map((item) => item.category))];

export function TopSellingProduct() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredData =
    selectedCategory === "All"
      ? chartData
      : chartData.filter((item) => item.category === selectedCategory);
  const topProducts = [...filteredData]
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);
  const totalOrders = topProducts.reduce((sum, item) => sum + item.orders, 0);
  const topProduct = topProducts[0];
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isXsScreen, setIsXsScreen] = useState(false);
  const currentMonth = chartData[chartData.length - 1];
  const lastMonth = chartData[chartData.length - 2];
  const percentageChange =
    ((currentMonth.orders - lastMonth.orders) / lastMonth.orders) * 100;
  // const [chartData, setChartData] = useState([]);

  // const fetchData = async () => {
  //   try{
  //     const res = await axios.get("url");

  //     if(!res.ok) {
  //       console.error("Error fetching data");
  //     };
  //     const data = res.data;
  //     setChartData(data);

  //   } catch(err) {
  //     console.error(err);
  //   }
  // }

  useEffect(() => {
    const screenSize = window.matchMedia("(max-width: 1300px)");
    const mobileScreenSize = window.matchMedia("(max-width: 900px)");
    const XsScreenSize = window.matchMedia("(max-width: 600px)");

    setIsMiddleScreen(screenSize.matches);
    setIsMobile(mobileScreenSize.matches);
    setIsXsScreen(XsScreenSize.matches);

    const handleScreenSizeChange = (event) => {
      setIsMiddleScreen(event.matches);
      setIsMobile(event.matches);
      setIsXsScreen(event.matches);
    };

    screenSize.addEventListener("change", handleScreenSizeChange);
    mobileScreenSize.addEventListener("change", handleScreenSizeChange);
    XsScreenSize.addEventListener("change", handleScreenSizeChange);

    return () => {
      screenSize.removeEventListener("change", handleScreenSizeChange);
    };
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto p-4 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Top Selling Products
            </CardTitle>
            <CardDescription className="text-sm">
              Browser Extensions Sales Distribution
            </CardDescription>
          </div>
          <Select
            onValueChange={(value) => setSelectedCategory(value)}
            className="mt-2 sm:mt-0"
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topProducts}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isMobile ? 80 : isXsScreen ? 40 : 100}
                fill="#8884d8"
                dataKey="orders"
                nameKey="product"
              >
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                layout={isMiddleScreen ? "horizontal" : "vertical"}
                align={isMiddleScreen ? "center" : "right"}
                verticalAlign={isMiddleScreen ? "bottom" : "middle"}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 text-sm">
        <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
          <div>
            <p className="font-semibold text-lg">
              {totalOrders.toLocaleString()}
            </p>
            <p className="text-muted-foreground">Total Orders</p>
          </div>
          <div className="sm:text-right">
            <p className="font-semibold text-lg">{topProduct.product}</p>
            <p className="text-muted-foreground">Top Selling Product</p>
          </div>
        </div>
        <div className="flex gap-2 font-medium leading-none">
          {percentageChange > 0 ? "Trending up " : "Trending down "}
          {Math.abs(percentageChange).toFixed(1)}% this month{" "}
          <TrendingUp
            className={`h-4 w-4 ${
              percentageChange > 0 ? "text-green-500" : "text-red-500"
            }`}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
