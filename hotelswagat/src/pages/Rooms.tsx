
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoomCard from '@/components/RoomCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const Rooms = () => {
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [sortBy, setSortBy] = useState('price-low');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const rooms = [
    {
      id: '1',
      name: 'Deluxe Room',
      type: 'Deluxe',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 124,
      capacity: 2,
      amenities: ['WiFi', 'Breakfast', 'Parking', 'AC'],
      description: 'Spacious room with modern amenities and city view'
    },
    {
      id: '2',
      name: 'Family Suite',
      type: 'Suite',
      price: 5500,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 89,
      capacity: 4,
      amenities: ['WiFi', 'Breakfast', 'Parking', 'AC', 'Balcony'],
      description: 'Perfect for families with separate living area'
    },
    {
      id: '3',
      name: 'Standard Room',
      type: 'Standard',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      rating: 4.6,
      reviews: 203,
      capacity: 2,
      amenities: ['WiFi', 'Parking', 'AC'],
      description: 'Comfortable accommodation with essential amenities'
    },
    {
      id: '4',
      name: 'Executive Suite',
      type: 'Executive',
      price: 7500,
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 67,
      capacity: 2,
      amenities: ['WiFi', 'Breakfast', 'Parking', 'AC', 'Balcony', 'Mini Bar'],
      description: 'Luxury suite with premium amenities and mountain view'
    },
    {
      id: '5',
      name: 'Budget Room',
      type: 'Budget',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
      rating: 4.2,
      reviews: 156,
      capacity: 2,
      amenities: ['WiFi', 'AC'],
      description: 'Affordable comfort without compromising on quality'
    },
    {
      id: '6',
      name: 'Honeymoon Suite',
      type: 'Suite',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop',
      rating: 5.0,
      reviews: 34,
      capacity: 2,
      amenities: ['WiFi', 'Breakfast', 'Parking', 'AC', 'Balcony', 'Mini Bar', 'Jacuzzi'],
      description: 'Romantic suite perfect for couples with special amenities'
    }
  ];

  const amenitiesList = ['WiFi', 'Breakfast', 'Parking', 'AC', 'Balcony', 'Mini Bar', 'Jacuzzi'];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };

  const filteredRooms = rooms.filter(room => {
    const priceInRange = room.price >= priceRange[0] && room.price <= priceRange[1];
    const hasAmenities = selectedAmenities.length === 0 || 
      selectedAmenities.every(amenity => room.amenities.includes(amenity));
    return priceInRange && hasAmenities;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-hotel-blue mb-4">Our Rooms & Suites</h1>
          <p className="text-gray-600 text-lg">
            Discover comfortable and luxurious accommodations at Hotel Swagat
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={1000}
                    max={10000}
                    step={500}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="space-y-2">
                    {amenitiesList.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                        />
                        <label htmlFor={amenity} className="text-sm">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPriceRange([1000, 10000]);
                    setSelectedAmenities([]);
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {sortedRooms.length} room{sortedRooms.length !== 1 ? 's' : ''} found
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedRooms.map((room, index) => (
                <div 
                  key={room.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RoomCard {...room} />
                </div>
              ))}
            </div>

            {sortedRooms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No rooms match your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setPriceRange([1000, 10000]);
                    setSelectedAmenities([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rooms;
