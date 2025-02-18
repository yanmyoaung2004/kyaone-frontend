import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { Image } from "lucide-react";

const CardComponent = ({ item, addToCart, isAdded }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  // console.log(item);
  return (
    <Card
      className={`w-full max-w-md mx-auto shadow-md ${
        theme !== "dark" ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bol">{item.name}</CardTitle>
        <div>
          <Badge
            variant="outline"
            className={`${
              theme === "dark"
                ? "text-black border-black"
                : "text-white border-white"
            }`}
          >
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`relative w-full h-48 overflow-hidden rounded-lg`}>
          {/* <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          /> */}
          {item.image ? (
            <img
              src={item.image || "/placeholder.svg"}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">There is no image</div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">${item.price.toFixed(2)}</p>

          {/* <p className="text-sm opacity-90">Available: {item.available}</p> */}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-lg"
              size="icon"
              onClick={() => {
                navigate(`/${item.name}/${item.id}`);
              }}
            >
              <Eye
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              />
              <span className="sr-only">See details</span>
            </Button>
            <div
              onClick={() => {
                addToCart(item);
              }}
            >
              {!isAdded ? (
                <Button className="rounded-lg " size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Open cart</span>
                </Button>
              ) : (
                <Button className="rounded-lg opacity-80 " size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Open cart</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
