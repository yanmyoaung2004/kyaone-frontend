import React, { useEffect, useState } from "react";

import { TopSellingProduct } from "./TopSellingProduct";
import { SalePerformance } from "./SalePerformance";
import { TopRegion } from "./TopRegion";
import { Profit } from "./Profit";
import axios from "axios";

const Sale = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [topSellingLocations, setTopSellingLocation] = useState([]);
  const fetchTopSellingProductData = async () => {
    try {
      const res1 = await axios.get(`/api/sale/products/getMonthlyOrders`);
      setMonthlyData(res1.data["2025"]);

      const res2 = await axios.get(
        `/api/sale/products/topSellingLocations/2025`
      );
      setTopSellingLocation(res2.data);

      const res = await axios.get(`/api/sale/products/topSellingProducts/2025`);
      setTopSellingProducts(assignColors(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const assignColors = (data) => {
    return data.map((item, index) => ({
      ...item,
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
    }));
  };

  useEffect(() => {
    fetchTopSellingProductData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <RecentActivity />
        <DeliveryTracking /> */}
        {monthlyData?.length > 0 && (
          <SalePerformance ordersData={monthlyData} />
        )}
        {topSellingLocations.length > 0 && (
          <TopRegion chartData={topSellingLocations} />
        )}
        {topSellingProducts.length > 0 && (
          <TopSellingProduct chartData={topSellingProducts} />
        )}
        <Profit />
      </div>
    </div>
  );
};

export default Sale;
