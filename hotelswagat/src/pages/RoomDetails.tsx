
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  User, 
  Wifi, 
  Car, 
  Coffee, 
  Calendar,
  MapPin,
  Bed,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { toast } from 'sonner';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Mock room data - in real app, this would come from API
  const room = {
    id: '1',
    name: 'Deluxe Room',
    type: 'Deluxe',
    price: 3500,
    rating: 4.8,
    reviews: 124,
    capacity: 2,
    size: '450 sq ft',
    beds: '1 King Bed',
    amenities: ['WiFi', 'Breakfast', 'Parking', 'AC', 'Mini Bar', 'Room Service'],
    description: 'Experience luxury and comfort in our spacious Deluxe Room at Hotel Swagat. Perfect for couples or business travelers, this elegantly appointed room features modern amenities and stunning city views.',
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'
    ],
    features: [
      'Air Conditioning',
      'Free WiFi',
      'Flat-screen TV',
      'Mini Refrigerator',
      'In-room Safe',
      'Hair Dryer',
      'Iron & Ironing Board',
      'Tea/Coffee Maker'
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      smoking: 'Non-smoking room',
      pets: 'Pets not allowed'
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    
    const bookingData = {
      roomId: room.id,
      roomName: room.name,
      checkIn,
      checkOut,
      guests,
      price: room.price
    };
    
    // Store booking data and navigate to booking page
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    toast.success('Proceeding to booking...');
    navigate('/booking');
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalPrice = calculateNights() * room.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/rooms')}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Rooms
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={room.images[currentImageIndex]} 
                  alt={room.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                />
              </div>
              
              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${room.name} ${index + 1}`}
                    className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-hotel-blue">{room.name}</h1>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-hotel-gold text-hotel-gold" />
                    <span className="font-semibold">{room.rating}</span>
                    <span className="text-muted-foreground">({room.reviews} reviews)</span>
                  </div>
                </div>
                <Badge className="bg-primary text-white">{room.type}</Badge>
              </div>

              <p className="text-gray-600 text-lg">{room.description}</p>

              {/* Room Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-primary" />
                  <span>{room.beds}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Maximize className="w-5 h-5 text-primary" />
                  <span>{room.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-primary" />
                  <span>Private Bathroom</span>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Room Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Hotel Policies</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Check-in:</strong> {room.policies.checkIn}</p>
                  <p><strong>Check-out:</strong> {room.policies.checkOut}</p>
                  <p><strong>Cancellation:</strong> {room.policies.cancellation}</p>
                  <p><strong>Smoking:</strong> {room.policies.smoking}</p>
                  <p><strong>Pets:</strong> {room.policies.pets}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary">₹{room.price.toLocaleString()}</div>
                  <div className="text-muted-foreground">per night</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full p-3 border rounded-lg"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  {calculateNights() > 0 && (
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>₹{room.price.toLocaleString()} × {calculateNights()} nights</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & fees</span>
                        <span>₹{Math.round(totalPrice * 0.12).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>₹{(totalPrice + Math.round(totalPrice * 0.12)).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleBookNow}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                    size="lg"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>
          <img
            src={room.images[currentImageIndex]}
            alt={room.name}
            className="max-w-full max-h-full object-contain"
          />
          <Button
            variant="ghost"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RoomDetails;
