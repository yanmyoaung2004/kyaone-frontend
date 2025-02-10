import React from "react";
import RecentActivity from "../components/Sales/RecentActivity";
import DeliveryTracking from "../components/Sales/DeliveryTracking";
import { TopSellingProduct } from "./TopSellingProduct";
import { SalePerformance } from "./SalePerformance";
import { TopRegion } from "./TopRegion";
import { Profit } from "./Profit";

const Sale = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivity />
        <DeliveryTracking />
        <TopSellingProduct />
        <SalePerformance />
        <Profit />
        <TopRegion />
      </div>
    </div>
  );
};

export default Sale;
