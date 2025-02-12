"use client";

import { useContext, useEffect, useState, useCallback } from "react";
import { CardComponent } from "../components/Cards";
import CustomerLayout from "../layout/CustomerLayout";
import { DataContext } from "../context/DataContext";
import { PaginationForItems } from "../components/PaginationForItems";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Hero from "../components/Hero";
import axios from "axios";

const ProductList = () => {
  const { cartItems, addToCart } = useContext(DataContext);
  const [itemList, setItemList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
    per_page: 10,
    total: 0,
  });

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios(`/api/categories`);

      setCategories(data);
    } catch (error) {
      setError("Failed to load products. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, category]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios(`/api/stocks`);

      setItemList(await res.json());
    } catch (error) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, category]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchQuery, category, fetchProducts]);

  const handlePageChange = (newPage) => {
    fetchProducts(newPage);
  };

  return (
    <CustomerLayout>
      <div className="overflow-x-hidden">
        <Hero />
      </div>
      <div className="w-5/6 mx-auto my-5">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search"
              className="pl-8 pr-10 py-5 rounded-full"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[140px] py-5">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading ? (
        <div className="text-center my-5">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 my-5">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-5/6 mx-auto gap-6 my-5">
            {itemList.length > 0 &&
              itemList.map((item) => (
                <CardComponent
                  item={item}
                  key={item.id}
                  addToCart={addToCart}
                  isAdded={cartItems.some((product) => product.id === item.id)}
                />
              ))}
          </div>
          {itemList.length > 0 && (
            <div className="w-5/6 mx-auto my-5">
              <PaginationForItems
                current_page={pagination.current_page}
                last_page={pagination.last_page}
                next_page_url={pagination.next_page_url}
                prev_page_url={pagination.prev_page_url}
                per_page={pagination.per_page}
                total={pagination.total}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </CustomerLayout>
  );
};

export default ProductList;
