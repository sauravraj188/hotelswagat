
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, User, Wifi, Car, Coffee } from 'lucide-react';

interface RoomCardProps {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  capacity: number;
  amenities: string[];
  description: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  type,
  price,
  image,
  rating,
  reviews,
  capacity,
  amenities,
  description
}) => {
  const navigate = useNavigate();

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'breakfast':
        return <Coffee className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleBookNow = () => {
    navigate(`/rooms/${id}`);
  };

  const handleCardClick = () => {
    navigate(`/rooms/${id}`);
  };

  return (
    <Card className="overflow-hidden card-hover cursor-pointer" onClick={handleCardClick}>
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-white">
          {type}
        </Badge>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 fill-hotel-gold text-hotel-gold" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-hotel-blue">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Up to {capacity} guests</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center space-x-1 text-xs bg-gray-100 rounded-full px-2 py-1">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {amenities.length > 3 && (
              <span className="text-xs text-muted-foreground">+{amenities.length - 3} more</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-2xl font-bold text-primary">₹{price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">/night</span>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={(e) => {
                e.stopPropagation();
                handleBookNow();
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
