"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

// Mock data for the sales report
// const monthlySalesData = [
//   { month: "Jan", volume: 1000, revenue: 50000, target: 45000 },
//   { month: "Feb", volume: 1200, revenue: 60000, target: 55000 },
//   { month: "Mar", volume: 800, revenue: 40000, target: 50000 },
//   { month: "Apr", volume: 1500, revenue: 75000, target: 60000 },
//   { month: "May", volume: 2000, revenue: 100000, target: 80000 },
//   { month: "Jun", volume: 1800, revenue: 90000, target: 85000 },
// ];

// const topProducts = [
//   { name: "Product A", sales: 500, revenue: 25000 },
//   { name: "Product B", sales: 350, revenue: 17500 },
//   { name: "Product C", sales: 200, revenue: 10000 },
//   { name: "Product D", sales: 150, revenue: 7500 },
//   { name: "Product E", sales: 100, revenue: 5000 },
// ];

// const salesByRegion = [
//   { name: "North", value: 30000 },
//   { name: "South", value: 25000 },
//   { name: "East", value: 20000 },
//   { name: "West", value: 15000 },
// ];

const salesTeamPerformance = [
  { name: "Alice", sales: 50000, quota: 45000 },
  { name: "Bob", sales: 45000, quota: 50000 },
  { name: "Charlie", sales: 60000, quota: 55000 },
  { name: "Diana", sales: 55000, quota: 50000 },
];

const customerData = {
  ageGroups: [
    { name: "18-24", value: 20 },
    { name: "25-34", value: 30 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 15 },
    { name: "55+", value: 10 },
  ],
  purchaseFrequency: [
    { name: "Weekly", value: 15 },
    { name: "Bi-weekly", value: 30 },
    { name: "Monthly", value: 40 },
    { name: "Quarterly", value: 15 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function SalesReport() {
  const { id } = useParams();
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [salesByRegion, setSalesByRegion] = useState([]);
  const [report, setReport] = useState();

  const fetchMonthlySalesData = async () => {
    const res = await axios.get(`/api/sale/products/getMonthlyOrders/${2025}`);
    // setMonthlySalesData(res.data);
  };

  function getMonthAndYear(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonth = start.getMonth() + 1;
    const startYear = start.getFullYear();

    const endMonth = end.getMonth() + 1;
    const endYear = end.getFullYear();

    if (startMonth === endMonth && startYear === endYear) {
      return { month: startMonth, year: startYear };
    }

    return {
      start_month: startMonth,
      start_year: startYear,
      end_month: endMonth,
      end_year: endYear,
    };
  }

  const fetchSaleDate = async () => {
    if (report.type === "annual") {
      const res = await axios.get(
        `/api/sale/products/getMonthlyOrders/${2025}`
      );
      setMonthlySalesData(res.data);
    } else if (report.type === "monthly") {
      const result = getMonthAndYear(report?.start_date, report?.end_date);
      const res = await axios.get(`/api/report/orders/daily`, {
        params: {
          year: result?.year,
          month: result?.month,
        },
      });
      setMonthlySalesData(res.data);
    } else if (report.type === "weekly") {
      const res = await axios.post(`api/report/orders/weekly`, {
        start_date: report?.startDate,
        end_date: report?.endDate,
      });
      console.log(res.data);
      setMonthlySalesData(res.data);
    }
  };

  const fetchReport = async () => {
    const res = await axios.get(`api/reports/sale/${id}`);
    setReport(res.data);
  };

  const fetchTopProductsData = async () => {
    if (report) {
      const res = await axios.get(
        `api/reports/sale/top-selling-products/${report?.start_date}/${report?.end_date}`
      );
      setTopProducts(res.data.top_selling_products);
    }
  };

  const fetchRegionSaleData = async () => {
    const res = await axios.get(`api/sale/products/topSellingLocations/10`);
    setSalesByRegion(res.data);
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  useEffect(() => {
    fetchMonthlySalesData();
    fetchTopProductsData();
    fetchRegionSaleData();
    fetchSaleDate();
  }, [report]);

  const totalVolume = monthlySalesData.reduce(
    (sum, item) => sum + item.volume,
    0
  );
  const totalRevenue = monthlySalesData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const averageRevenue = totalRevenue / monthlySalesData.length;
  const totalTarget = monthlySalesData.reduce(
    (sum, item) => sum + item.target,
    0
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Comprehensive Sales Report</h1>
        <p className="text-muted-foreground">
          {report?.start_date} to {report?.end_date}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Sales Volume
              </p>
              <p className="text-2xl font-bold">
                {totalVolume.toLocaleString()} units
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-2xl font-bold">${report?.total_revenue}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Average Monthly Revenue
              </p>
              <p className="text-2xl font-bold">
                ${report?.average_monthly_revenue}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="regions">Regional Analysis</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Performance</CardTitle>
              <CardDescription>
                Analysis of sales volume, revenue, and target achievement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="volume"
                    stroke="#8884d8"
                    name="Sales Volume"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="target"
                    stroke="#ffc658"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">
                  Key Observations:
                </h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>
                    Sales volume and revenue show an overall upward trend.
                  </li>
                  <li>
                    May was the best performing month with 2000 units sold and
                    $100,000 in revenue.
                  </li>
                  <li>
                    The company has consistently met or exceeded its monthly
                    targets since April.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Top-Selling Products</CardTitle>
              <CardDescription>
                Analysis of the best performing products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Sales Volume</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>% of Total Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.total_quantity_sold}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">
                  Product Performance Insights:
                </h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>
                    Product A is the top performer, contributing 38.5% of total
                    revenue.
                  </li>
                  <li>
                    The top 3 products account for 80.8% of total revenue.
                  </li>
                  <li>
                    Consider strategies to boost sales of lower-performing
                    products.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Region</CardTitle>
              <CardDescription>
                Breakdown of sales performance across different regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={salesByRegion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ location, percent }) =>
                      `${location} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {salesByRegion.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">
                  Regional Performance Analysis:
                </h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>
                    The North region leads in sales, contributing 33.3% of total
                    revenue.
                  </li>
                  <li>
                    The West region shows the lowest performance and may require
                    additional support.
                  </li>
                  <li>
                    Consider implementing successful strategies from the North
                    region in other areas.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Sales Team Performance</CardTitle>
              <CardDescription>
                Individual performance analysis of sales representatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesTeamPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Actual Sales" />
                  <Bar dataKey="quota" fill="#82ca9d" name="Sales Quota" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">
                  Team Performance Insights:
                </h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>
                    Charlie is the top performer, exceeding their quota by 9.1%.
                  </li>
                  <li>
                    Bob is slightly below their quota and may need additional
                    support or training.
                  </li>
                  <li>
                    The team as a whole is performing well, with most members
                    meeting or exceeding their quotas.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerData.ageGroups}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {customerData.ageGroups.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Purchase Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerData.purchaseFrequency}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {customerData.purchaseFrequency.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-semibold mb-2">Key Observations:</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>
                  The 25-34 age group represents our largest customer segment
                  (30%).
                </li>
                <li>
                  Monthly purchases are the most common frequency (40%),
                  suggesting potential for subscription or loyalty programs.
                </li>
                <li>
                  There's an opportunity to increase engagement with the 55+ age
                  group and weekly purchasers.
                </li>
                <li>
                  Consider tailoring marketing strategies to the preferences of
                  the 25-44 age range, which comprises 55% of our customer base.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
