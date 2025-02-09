import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import CustomerLayout from "../layout/CustomerLayout";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";

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
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo4-wireless/pdp/product-carousel/slate-blue/blue-01-solo4.jpg",
    "https://dam.ee.co.uk/image/786263124743/image_geom2amfcp1jnccpgttoe3cl1e/-S568x568-FWEBP",
  ];
  const { addToCart } = useContext(DataContext);
  const { id } = useParams();

  return (
    <CustomerLayout>
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt="Premium Wireless Headphones"
                className="object-contain p-10"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative rounded-lg overflow-hidden bg-white border-2 
                    ${
                      selectedImage === index
                        ? "border-slate-900"
                        : "border-transparent"
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="object-contain p-4"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                {item.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
              <p className="text-2xl font-bold">${item.price}</p>
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
    </CustomerLayout>
  );
}
