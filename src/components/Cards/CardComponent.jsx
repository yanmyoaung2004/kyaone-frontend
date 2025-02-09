import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ item, addToCart, isAdded }) => {
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black">
          {item.name}
        </CardTitle>
        <div>
          <Badge variant="outline" className="text-black border-black">
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-48 overflow-hidden rounded-lg">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-black">
            ${item.price.toFixed(2)}
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-lg"
              size="icon"
              onClick={() => {
                navigate(`/${item.name}/${item.id}`);
              }}
            >
              <Eye className="h-5 w-5" />
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
