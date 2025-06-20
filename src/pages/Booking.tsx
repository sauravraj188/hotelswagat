// import React, { useState, useEffect } from 'react';
// import api from '@/api/client';
// import { useNavigate } from 'react-router-dom';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
// import { ArrowLeft, Calendar, User, CreditCard } from 'lucide-react';
// import { toast } from 'sonner';

// interface StoredBooking {
//   roomId: string;
//   roomName: string;
//   checkIn: string;
//   checkOut: string;
//   guests: number;
//   price: number;
// }

// const Booking: React.FC = () => {
//   const navigate = useNavigate();
//   const [bookingData, setBookingData] = useState<StoredBooking | null>(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     specialRequests: '',
//   });

//   useEffect(() => {
//     const raw = localStorage.getItem('bookingData');
//     if (!raw) {
//       toast.error('No booking data found. Please select a room first.');
//       navigate('/rooms');
//       return;
//     }
//     setBookingData(JSON.parse(raw));
//   }, [navigate]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const calculateNights = () => {
//     if (!bookingData) return 0;
//     const start = new Date(bookingData.checkIn);
//     const end = new Date(bookingData.checkOut);
//     return Math.ceil((end.getTime() - start.getTime()) / 86400000);
//   };

//   const nights = calculateNights();
//   const subtotal = nights * (bookingData?.price || 0);
//   const taxes = Math.round(subtotal * 0.12);
//   const total = subtotal + taxes;

//   const handleBooking = async () => {
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.phone
//     ) {
//       toast.error('Please fill in all required customer fields');
//       return;
//     }
//     try {
//       await api.post('/bookings', {
//         roomId: bookingData!.roomId,
//         checkIn: bookingData!.checkIn,
//         checkOut: bookingData!.checkOut,
//         guests: bookingData!.guests,
//         // newly required customer fields:
//         customerName: `${formData.firstName} ${formData.lastName}`,
//         customerEmail: formData.email,
//         customerPhone: formData.phone,
//         // optionally pass specialRequests if you persist that in your schema
//       });

//       // toast.success('Booking confirmed!');
//       // localStorage.removeItem('bookingData');
//       // navigate('/');
//           toast.success('Booking created! Please complete payment.');
//   // keep bookingData in localStorage so Payment page can read it
//     navigate('/payment');
//     } catch (err: any) {
//       toast.error(err.message || 'Booking failed');
//     }
//   };

//   if (!bookingData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         <Button
//           variant="ghost"
//           onClick={() => navigate(-1)}
//           className="mb-6"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" /> Back
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Customer Form */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <User className="w-5 h-5 mr-2" /> Customer Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="firstName">First Name *</Label>
//                     <Input
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="lastName">Last Name *</Label>
//                     <Input
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="email">Email *</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="phone">Phone Number *</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="specialRequests">
//                     Special Requests
//                   </Label>
//                   <textarea
//                     id="specialRequests"
//                     name="specialRequests"
//                     value={formData.specialRequests}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border rounded-lg"
//                     rows={3}
//                     placeholder="Any special requests or preferences..."
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Summary */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle>Booking Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-lg">
//                     {bookingData.roomName}
//                   </h3>
//                   <p className="text-muted-foreground">
//                     {bookingData.guests} guest
//                     {bookingData.guests > 1 ? 's' : ''}
//                   </p>
//                 </div>

//                 <Separator />

//                 <div className="space-y-2">
//                   <div className="flex items-center text-sm">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     <span>Check-in: {bookingData.checkIn}</span>
//                   </div>
//                   <div className="flex items-center text-sm">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     <span>Check-out: {bookingData.checkOut}</span>
//                   </div>
//                   <p className="text-sm font-medium">{nights} nights</p>
//                 </div>

//                 <Separator />

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>
//                       ₹{bookingData.price.toLocaleString()} × {nights}
//                     </span>
//                     <span>₹{subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Taxes & fees</span>
//                     <span>₹{taxes.toLocaleString()}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-semibold text-lg">
//                     <span>Total</span>
//                     <span>₹{total.toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handleBooking}
//                   className="w-full bg-primary hover:bg-primary/90 text-white py-3"
//                 >
//                   <CreditCard className="w-4 h-4 mr-2" />
//                   Confirm Booking
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Booking;
// src/pages/Booking.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

interface StoredBooking {
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
  // we’ll add customer fields here too
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
}

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<Partial<StoredBooking> | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // First load the *room* selection details
  useEffect(() => {
    const raw = localStorage.getItem('bookingData');
    if (!raw) {
      toast.error('No booking data found. Please select a room first.');
      navigate('/rooms');
      return;
    }
    const parsed = JSON.parse(raw);
    setBookingData(parsed);
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  // nights calculation
  const calculateNights = () => {
    if (!bookingData?.checkIn || !bookingData?.checkOut) return 0;
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = nights * (bookingData?.price || 0);
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleBooking = () => {
    const { firstName, lastName, email, phone, specialRequests } = formData;
    if (!firstName || !lastName || !email || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // merge into one object
    const fullBooking: StoredBooking = {
      roomId: bookingData!.roomId!,
      roomName: bookingData!.roomName!,
      checkIn: bookingData!.checkIn!,
      checkOut: bookingData!.checkOut!,
      guests: bookingData!.guests!,
      price: bookingData!.price!,
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      customerPhone: phone,
      specialRequests: specialRequests || undefined
    };

    // store customer + room info in localStorage for the Payment page
    localStorage.setItem('bookingData', JSON.stringify(fullBooking));

    toast.success('Procceding to Payment ...');
    navigate('/payment');
  };

  if (!bookingData) return <div>Loading…</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" /> Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name *</Label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label>Last Name *</Label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Phone Number *</Label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Special Requests</Label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">{bookingData.roomName}</h3>
                <p className="text-sm">
                  {bookingData.guests} guest{bookingData.guests! > 1 ? 's' : ''}
                </p>
                <Separator />
                <p className="text-sm">
                  Check‑in: {bookingData.checkIn}<br/>
                  Check‑out: {bookingData.checkOut}
                </p>
                <p className="text-sm font-medium">{nights} night{nights>1?'s':''}</p>
                <Separator />
                <div className="flex justify-between">
                  <span>₹{bookingData.price!.toLocaleString()} × {nights}</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <Button
                  onClick={handleBooking}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
