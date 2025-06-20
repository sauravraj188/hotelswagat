import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/api/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  User,
  Bed,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

interface Room {
  _id: string;
  name: string;
  type: string;
  price: number;
  images: string[];
  rating: number;
  reviews: number;
  capacity: number;
  size?: string;
  beds?: string;
  features?: string[];
  description: string;
  policies?: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    smoking: string;
    pets: string;
  };
}

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const data = await api.get<Room>(`/rooms/${id}`);
        setRoom(data);
      } catch {
        toast.error('Failed to load room');
      } finally {
        setLoading(false);
      }
    }
    fetchRoom();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }
  if (!room) {
    return <div className="container mx-auto py-8">Room not found.</div>;
  }

  const nextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % room.images.length);
  const prevImage = () =>
    setCurrentImageIndex((i) =>
      (i - 1 + room.images.length) % room.images.length
    );

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / 86400000);
  };
  const nights = calculateNights();
  const totalPrice = nights * room.price;

  const handleProceed = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select both dates');
      return;
    }
    if (nights < 1) {
      toast.error('Check-out must be after check-in');
      return;
    }
    // Store preliminary booking data
    localStorage.setItem(
      'bookingData',
      JSON.stringify({
        roomId: room._id,
        roomName: room.name,
        checkIn,
        checkOut,
        guests,
        price: room.price,
      })
    );
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/rooms')}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Rooms
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={room.images[currentImageIndex]}
                  alt={room.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                />
              </div>
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

              <div className="flex gap-2 mt-4 overflow-x-auto">
                {room.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${room.name} ${idx + 1}`}
                    className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${
                      idx === currentImageIndex
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-hotel-blue">
                  {room.name}
                </h1>
                <Badge className="bg-primary text-white">{room.type}</Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-hotel-gold text-hotel-gold" />
                <span className="font-semibold">
                  {room.rating} ({room.reviews})
                </span>
              </div>
              <p className="text-gray-600">{room.description}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Up to {room.capacity} guests</span>
                </div>
                {room.beds && (
                  <div className="flex items-center space-x-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <span>{room.beds}</span>
                  </div>
                )}
                {room.size && (
                  <div className="flex items-center space-x-2">
                    <Maximize className="w-5 h-5 text-primary" />
                    <span>{room.size}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-primary" />
                  <span>Private Bath</span>
                </div>
              </div>

              {/* Features */}
              {room.features && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Room Features
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {room.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Policies */}
              {room.policies && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Hotel Policies
                  </h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <strong>Check-in:</strong> {room.policies.checkIn}
                    </li>
                    <li>
                      <strong>Check-out:</strong> {room.policies.checkOut}
                    </li>
                    <li>
                      <strong>Cancellation:</strong>{' '}
                      {room.policies.cancellation}
                    </li>
                    <li>
                      <strong>Smoking:</strong> {room.policies.smoking}
                    </li>
                    <li>
                      <strong>Pets:</strong> {room.policies.pets}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    ₹{room.price.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">per night</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full p-2 border rounded"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-2 border rounded"
                      min={
                        checkIn
                          ? new Date(
                              new Date(checkIn).getTime() + 86400000
                            )
                              .toISOString()
                              .split('T')[0]
                          : new Date(
                              Date.now() + 86400000
                            )
                              .toISOString()
                              .split('T')[0]
                      }
                      disabled={!checkIn}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(+e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Guest{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {nights > 0 && (
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between">
                        <span>
                          ₹{room.price.toLocaleString()} × {nights} nights
                        </span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & fees</span>
                        <span>
                          ₹{Math.round(totalPrice * 0.12).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>
                          ₹
                          {(
                            totalPrice +
                            Math.round(totalPrice * 0.12)
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleProceed}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                  >
                    Proceed to Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsLightboxOpen(false)}          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            className="absolute left-4 top-1/2 text-white"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <img
            src={room.images[currentImageIndex]}
            alt={room.name}
            className="max-w-full max-h-full object-contain"
          />
          <Button
            variant="ghost"
            className="absolute right-4 top-1/2 text-white"
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
