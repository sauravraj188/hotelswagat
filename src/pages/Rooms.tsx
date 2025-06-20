import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoomCard from '@/components/RoomCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/api/client';

interface Room {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  capacity: number;
  amenities: string[];
  description: string;
  size?: string;
  beds?: string;
  features?: string[];
  policies?: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    smoking: string;
    pets: string;
  };
}

const Rooms: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([1000, 10000]);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>(
    'price-low'
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await api.get<Room[]>('/rooms');
        setRooms(data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">Loading rooms…</div>
        <Footer />
      </div>
    );
  }

  const amenitiesList = [
    'WiFi',
    'Breakfast',
    'Parking',
    'AC',
    'Balcony',
    'Mini Bar',
    'Jacuzzi',
  ];

  const filteredRooms = rooms.filter((room) => {
    const inPrice =
      room.price >= priceRange[0] && room.price <= priceRange[1];
    const hasAllAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => room.amenities.includes(a));
    return inPrice && hasAllAmenities;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-hotel-blue mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-gray-600 text-lg">
            Discover comfortable and luxurious accommodations at Hotel Swagat
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={(val) => setPriceRange(val as number[])}
                    min={1000}
                    max={10000}
                    step={500}
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="space-y-2">
                    {amenitiesList.map((amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) =>
                            setSelectedAmenities((prev) =>
                              checked
                                ? [...prev, amenity]
                                : prev.filter((a) => a !== amenity)
                            )
                          }
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

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
          </aside>

          {/* Results */}
          <section className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {sortedRooms.length} room
                {sortedRooms.length !== 1 && 's'} found
              </p>
              <Select
                value={sortBy}
                onValueChange={(value) =>
                  setSortBy(value as 'price-low' | 'price-high' | 'rating')
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedRooms.map((room, idx) => (
                <div
                  key={room._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <RoomCard {...{ id: room._id, ...room }} />
                </div>
              ))}
            </div>

            {sortedRooms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No rooms match your criteria.
                </p>
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
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rooms;
