import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import CustomerLayout from "../layout/CustomerLayout";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const item = {
  id: 8,
  name: "Premium Wireless Headphones",
  category: "Electronics",
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
  price: 249.99,
  image:
    "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
};

export default function ProductDetail() {
  const { addToCart } = useContext(DataContext);
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`api/products/${id}`);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <CustomerLayout>
      {item && (
        <main className="max-w-7xl mx-auto p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            {}
            <div>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  // src={images[selectedImage] || "/placeholder.svg"}
                  src={item.media[0].original_url}
                  alt="Premium Wireless Headphones"
                  className="object-cover w-full h-96"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {item.category.name}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
                <p className="text-2xl font-bold">${item.unitprice.price}</p>
              </div>

              <div className="space-y-4">
                <p className="text-slate-600 dark:text-white">
                  {item.description}
                </p>

                <div className="space-y-2">
                  <h3 className="font-semibold">Key Features:</h3>
                  <ul className="list-disc list-inside text-slate-600 dark:text-white space-y-1">
                    <li>Active Noise Cancellation</li>
                    <li>40-hour Battery Life</li>
                    <li>Bluetooth 5.0 Connectivity</li>
                    <li>Premium Sound Quality</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      )}
    </CustomerLayout>
  );
}
