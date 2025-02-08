import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CardComponent = () => {
  const itemDetail = {
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image: "././assets/images/download.jpg",
    category: "Electronics",
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black">{itemDetail.name}</CardTitle>
        <Badge variant="outline" className="text-black border-black">
          {itemDetail.category}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 overflow-hidden rounded-lg">
          <img src={itemDetail.image} alt={itemDetail.name} />
        </div>
        <p className="text-gray-700">{itemDetail.description}</p>
        <p className="text-xl font-semibold text-black">
          Price: ${itemDetail.price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
