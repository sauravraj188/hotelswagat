
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Star, Wifi, Car, Coffee, Shield } from 'lucide-react';
import { toast } from 'sonner';

const BanquetHall = () => {
  const navigate = useNavigate();
  const [bookingForm, setBookingForm] = useState({
    eventType: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    guestCount: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: ''
  });

  const eventTypes = [
    'Wedding Reception',
    'Birthday Party',
    'Corporate Event',
    'Anniversary',
    'Conference',
    'Exhibition',
    'Cultural Event',
    'Other'
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  const handleInputChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!bookingForm.eventType || !bookingForm.eventDate || !bookingForm.customerName || 
        !bookingForm.customerEmail || !bookingForm.customerPhone || !bookingForm.guestCount) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate booking submission
    toast.success('Banquet hall booking request submitted successfully! We will contact you soon.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-hotel-blue to-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Banquet Hall Booking
            </h1>
            <p className="text-xl text-gray-100">
              Celebrate your special moments in our elegant banquet hall
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Banquet Hall Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-hotel-blue">Banquet Hall Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop" 
                    alt="Banquet Hall" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Capacity: 200-500 guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>Available daily</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-5 h-5 text-primary" />
                      <span>Free WiFi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="w-5 h-5 text-primary" />
                      <span>Parking Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Coffee className="w-5 h-5 text-primary" />
                      <span>Catering Services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>24/7 Security</span>
                    </div>
                  </div>

                  <div className="bg-hotel-cream p-4 rounded-lg">
                    <h3 className="font-semibold text-hotel-blue mb-2">Pricing</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Half Day (4 hours): ₹25,000</li>
                      <li>• Full Day (8 hours): ₹45,000</li>
                      <li>• Additional hours: ₹3,000/hour</li>
                      <li>• Catering: ₹500-₹1500 per person</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-hotel-blue mb-2">Facilities Include</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Stage and sound system</li>
                      <li>• LED lighting setup</li>
                      <li>• Air conditioning</li>
                      <li>• Tables and chairs</li>
                      <li>• Decoration assistance</li>
                      <li>• Dedicated event coordinator</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-hotel-blue">Book Banquet Hall</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('eventType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guestCount">Guest Count *</Label>
                      <Input
                        id="guestCount"
                        type="number"
                        min="50"
                        max="500"
                        placeholder="Number of guests"
                        value={bookingForm.guestCount}
                        onChange={(e) => handleInputChange('guestCount', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={bookingForm.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Select onValueChange={(value) => handleInputChange('startTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Select onValueChange={(value) => handleInputChange('endTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerName">Your Name *</Label>
                    <Input
                      id="customerName"
                      type="text"
                      placeholder="Enter your full name"
                      value={bookingForm.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail">Email *</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={bookingForm.customerEmail}
                        onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customerPhone">Phone Number *</Label>
                      <Input
                        id="customerPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={bookingForm.customerPhone}
                        onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requirements or additional services needed"
                      value={bookingForm.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Submit Booking Request
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    * Required fields. We will contact you within 24 hours to confirm your booking.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BanquetHall;