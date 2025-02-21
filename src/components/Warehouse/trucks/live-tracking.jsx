import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function LiveTracking() {
  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          Live Truck Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Map view for real-time truck tracking will be integrated here.</p>
        </div>
      </CardContent>
    </Card>
  )
}

