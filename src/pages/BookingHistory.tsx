
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Calendar, MapPin, Clock, X } from 'lucide-react';
// import { toast } from 'sonner';

// const BookingHistory = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<any>(null);
//   const [bookings, setBookings] = useState([
//     {
//       id: 'BK001234',
//       roomName: 'Deluxe Room',
//       checkIn: '2024-01-15',
//       checkOut: '2024-01-17',
//       nights: 2,
//       amount: 7000,
//       status: 'completed',
//       bookedOn: '2024-01-10'
//     },
//     {
//       id: 'BK001235',
//       roomName: 'Family Suite',
//       checkIn: '2024-02-20',
//       checkOut: '2024-02-23',
//       nights: 3,
//       amount: 12000,
//       status: 'upcoming',
//       bookedOn: '2024-02-15'
//     }
//   ]);

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (!userData) {
//       toast.error('Please login to view your booking history');
//       navigate('/login');
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);
//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleCancelBooking = (bookingId: string) => {
//     setBookings(prev => 
//       prev.map(booking => 
//         booking.id === bookingId 
//           ? { ...booking, status: 'cancelled' }
//           : booking
//       )
//     );
//     toast.success(`Booking ${bookingId} cancelled successfully`);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'upcoming': return 'bg-blue-100 text-blue-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Clock className="w-5 h-5 mr-2" />
//                 Booking History
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {bookings.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
//                   <p className="text-gray-600">When you make a booking, it will appear here.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {bookings.map((booking) => (
//                     <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="font-semibold text-lg">{booking.roomName}</h3>
//                         <div className="flex items-center space-x-2">
//                           <Badge className={getStatusColor(booking.status)}>
//                             {booking.status}
//                           </Badge>
//                           {booking.status === 'upcoming' && (
//                             <Button
//                               variant="destructive"
//                               size="sm"
//                               onClick={() => handleCancelBooking(booking.id)}
//                             >
//                               <X className="w-4 h-4 mr-1" />
//                               Cancel
//                             </Button>
//                           )}
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                         <div>
//                           <p><strong>Booking ID:</strong> {booking.id}</p>
//                           <p><strong>Booked on:</strong> {booking.bookedOn}</p>
//                         </div>
//                         <div>
//                           <p><strong>Check-in:</strong> {booking.checkIn}</p>
//                           <p><strong>Check-out:</strong> {booking.checkOut}</p>
//                           <p><strong>Nights:</strong> {booking.nights}</p>
//                         </div>
//                         <div>
//                           <p><strong>Total Amount:</strong> ₹{booking.amount.toLocaleString()}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default BookingHistory;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, X } from 'lucide-react';
import { toast } from 'sonner';

interface APIRoom {
  name: string;
}

interface APIBooking {
  _id: string;
  room: APIRoom;
  checkIn: string;    // ISO date
  checkOut: string;   // ISO date
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  createdAt: string;  // ISO date
}

const BookingHistory: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<APIBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // load user and data
  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) {
      toast.error('Please login to view your booking history');
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(raw);
    setUser(parsed);

    (async () => {
      try {
        const data = await api.get<APIBooking[]>('/bookings/my');
        setBookings(data);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleCancel = async (id: string) => {
    try {
      await api.post(`/bookings/${id}/cancel`, {}); // if you have a cancel endpoint
      setBookings((bs) =>
        bs.map((b) =>
          b._id === id ? { ...b, paymentStatus: 'cancelled' } : b
        )
      );
      toast.success('Booking cancelled');
    } catch (err: any) {
      toast.error(err.message || 'Cancel failed');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':      return 'bg-green-100 text-green-800';
      case 'pending':   return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default:          return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const calculateNights = (inISO: string, outISO: string) => {
    const d1 = new Date(inISO),
      d2 = new Date(outISO);
    return Math.ceil((d2.getTime() - d1.getTime()) / 86400000);
  };

  if (!user || loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Booking History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No bookings yet
                  </h3>
                  <p className="text-gray-600">
                    When you make a booking, it will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => {
                    const nights = calculateNights(b.checkIn, b.checkOut);
                    return (
                      <div
                        key={b._id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            {b.room.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(b.paymentStatus)}>
                              {b.paymentStatus}
                            </Badge>
                            {b.paymentStatus === 'pending' && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancel(b._id)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <p>
                              <strong>Booking ID:</strong> {b._id}
                            </p>
                            <p>
                              <strong>Booked on:</strong>{' '}
                              {formatDate(b.createdAt)}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Check-in:</strong> {formatDate(b.checkIn)}
                            </p>
                            <p>
                              <strong>Check-out:</strong>{' '}
                              {formatDate(b.checkOut)}
                            </p>
                            <p>
                              <strong>Nights:</strong> {nights}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Total Amount:</strong>{' '}
                              ₹{b.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingHistory;
