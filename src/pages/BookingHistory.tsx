
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { Button } from '@/components/ui/button';
// // import { Calendar, MapPin, Clock, X } from 'lucide-react';
// // import { toast } from 'sonner';

// // const BookingHistory = () => {
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState<any>(null);
// //   const [bookings, setBookings] = useState([
// //     {
// //       id: 'BK001234',
// //       roomName: 'Deluxe Room',
// //       checkIn: '2024-01-15',
// //       checkOut: '2024-01-17',
// //       nights: 2,
// //       amount: 7000,
// //       status: 'completed',
// //       bookedOn: '2024-01-10'
// //     },
// //     {
// //       id: 'BK001235',
// //       roomName: 'Family Suite',
// //       checkIn: '2024-02-20',
// //       checkOut: '2024-02-23',
// //       nights: 3,
// //       amount: 12000,
// //       status: 'upcoming',
// //       bookedOn: '2024-02-15'
// //     }
// //   ]);

// //   useEffect(() => {
// //     const userData = localStorage.getItem('user');
// //     if (!userData) {
// //       toast.error('Please login to view your booking history');
// //       navigate('/login');
// //       return;
// //     }

// //     try {
// //       const parsedUser = JSON.parse(userData);
// //       setUser(parsedUser);
// //     } catch (error) {
// //       console.error('Error parsing user data:', error);
// //       navigate('/login');
// //     }
// //   }, [navigate]);

// //   const handleCancelBooking = (bookingId: string) => {
// //     setBookings(prev => 
// //       prev.map(booking => 
// //         booking.id === bookingId 
// //           ? { ...booking, status: 'cancelled' }
// //           : booking
// //       )
// //     );
// //     toast.success(`Booking ${bookingId} cancelled successfully`);
// //   };

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case 'completed': return 'bg-green-100 text-green-800';
// //       case 'upcoming': return 'bg-blue-100 text-blue-800';
// //       case 'cancelled': return 'bg-red-100 text-red-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   if (!user) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />
      
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="max-w-4xl mx-auto">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center">
// //                 <Clock className="w-5 h-5 mr-2" />
// //                 Booking History
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               {bookings.length === 0 ? (
// //                 <div className="text-center py-12">
// //                   <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //                   <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
// //                   <p className="text-gray-600">When you make a booking, it will appear here.</p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {bookings.map((booking) => (
// //                     <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
// //                       <div className="flex items-center justify-between mb-2">
// //                         <h3 className="font-semibold text-lg">{booking.roomName}</h3>
// //                         <div className="flex items-center space-x-2">
// //                           <Badge className={getStatusColor(booking.status)}>
// //                             {booking.status}
// //                           </Badge>
// //                           {booking.status === 'upcoming' && (
// //                             <Button
// //                               variant="destructive"
// //                               size="sm"
// //                               onClick={() => handleCancelBooking(booking.id)}
// //                             >
// //                               <X className="w-4 h-4 mr-1" />
// //                               Cancel
// //                             </Button>
// //                           )}
// //                         </div>
// //                       </div>
                      
// //                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
// //                         <div>
// //                           <p><strong>Booking ID:</strong> {booking.id}</p>
// //                           <p><strong>Booked on:</strong> {booking.bookedOn}</p>
// //                         </div>
// //                         <div>
// //                           <p><strong>Check-in:</strong> {booking.checkIn}</p>
// //                           <p><strong>Check-out:</strong> {booking.checkOut}</p>
// //                           <p><strong>Nights:</strong> {booking.nights}</p>
// //                         </div>
// //                         <div>
// //                           <p><strong>Total Amount:</strong> ₹{booking.amount.toLocaleString()}</p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default BookingHistory;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '@/api/client';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Calendar, Clock, X } from 'lucide-react';
// import { toast } from 'sonner';

// interface APIRoom {
//   name: string;
// }

// interface APIBooking {
//   _id: string;
//   room: APIRoom;
//   checkIn: string;    // ISO date
//   checkOut: string;   // ISO date
//   totalPrice: number;
//   paymentStatus: 'pending' | 'paid' | 'cancelled';
//   createdAt: string;  // ISO date
// }

// const BookingHistory: React.FC = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<any>(null);
//   const [bookings, setBookings] = useState<APIBooking[]>([]);
//   const [loading, setLoading] = useState(true);

//   // load user and data
//   useEffect(() => {
//     const raw = localStorage.getItem('user');
//     if (!raw) {
//       toast.error('Please login to view your booking history');
//       navigate('/login');
//       return;
//     }
//     const parsed = JSON.parse(raw);
//     setUser(parsed);

//     (async () => {
//       try {
//         const data = await api.get<APIBooking[]>('/bookings/my');
//         setBookings(data);
//       } catch (err: any) {
//         toast.error(err.message || 'Failed to load bookings');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [navigate]);

//   const handleCancel = async (id: string) => {
//     try {
//       await api.post(`/bookings/${id}/cancel`, {}); // if you have a cancel endpoint
//       setBookings((bs) =>
//         bs.map((b) =>
//           b._id === id ? { ...b, paymentStatus: 'cancelled' } : b
//         )
//       );
//       toast.success('Booking cancelled');
//     } catch (err: any) {
//       toast.error(err.message || 'Cancel failed');
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'paid':      return 'bg-green-100 text-green-800';
//       case 'pending':   return 'bg-blue-100 text-blue-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default:          return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (iso: string) =>
//     new Date(iso).toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });

//   const calculateNights = (inISO: string, outISO: string) => {
//     const d1 = new Date(inISO),
//       d2 = new Date(outISO);
//     return Math.ceil((d2.getTime() - d1.getTime()) / 86400000);
//   };

//   if (!user || loading) {
//     return <div className="container mx-auto py-8">Loading...</div>;
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
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     No bookings yet
//                   </h3>
//                   <p className="text-gray-600">
//                     When you make a booking, it will appear here.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {bookings.map((b) => {
//                     const nights = calculateNights(b.checkIn, b.checkOut);
//                     return (
//                       <div
//                         key={b._id}
//                         className="border rounded-lg p-4 hover:bg-gray-50"
//                       >
//                         <div className="flex items-center justify-between mb-2">
//                           <h3 className="font-semibold text-lg">
//                             {b.room.name}
//                           </h3>
//                           <div className="flex items-center space-x-2">
//                             <Badge className={getStatusColor(b.paymentStatus)}>
//                               {b.paymentStatus}
//                             </Badge>
//                             {b.paymentStatus === 'pending' && (
//                               <Button
//                                 variant="destructive"
//                                 size="sm"
//                                 onClick={() => handleCancel(b._id)}
//                               >
//                                 <X className="w-4 h-4 mr-1" />
//                                 Cancel
//                               </Button>
//                             )}
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                           <div>
//                             <p>
//                               <strong>Booking ID:</strong> {b._id}
//                             </p>
//                             <p>
//                               <strong>Booked on:</strong>{' '}
//                               {formatDate(b.createdAt)}
//                             </p>
//                           </div>
//                           <div>
//                             <p>
//                               <strong>Check-in:</strong> {formatDate(b.checkIn)}
//                             </p>
//                             <p>
//                               <strong>Check-out:</strong>{' '}
//                               {formatDate(b.checkOut)}
//                             </p>
//                             <p>
//                               <strong>Nights:</strong> {nights}
//                             </p>
//                           </div>
//                           <div>
//                             <p>
//                               <strong>Total Amount:</strong>{' '}
//                               ₹{b.totalPrice.toLocaleString()}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
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

// BookingHistory.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, X, Eye, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Booking {
  id: string;
  roomName: string;
  checkIn: string;    // formatted YYYY-MM-DD
  checkOut: string;   // formatted YYYY-MM-DD
  nights: number;
  amount: number;
  status: string;
  bookedOn: string;   // formatted YYYY-MM-DD
  paymentScreenshot?: string;
  assignedRoom?: string;
}

const BookingHistory = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper to format a Date or date-string to YYYY-MM-DD
  const formatDate = (dateInput: string | Date): string => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!userData) {
      toast.error('Please login to view your booking history');
      navigate('/login');
      return;
    }
    let parsedUser: any;
    try {
      parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
      return;
    }

    // Fetch bookings for this user
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // const token = parsedUser.token; // ensure you store JWT in user.token
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get('https://hotelswagatbackend-1.onrender.com/api/bookings/my', { headers });
        // res.data is expected: array of booking objects with populated `room`
        const data: any[] = res.data;
        const mapped: Booking[] = data.map(b => {
          // b._id, b.checkIn, b.checkOut, b.totalPrice, b.status, b.createdAt, b.paymentScreenshot, b.assignedRoom, b.room populated
          const checkInStr = formatDate(b.checkIn);
          const checkOutStr = formatDate(b.checkOut);
          const checkInDate = new Date(b.checkIn);
          const checkOutDate = new Date(b.checkOut);
          const nights = isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())
            ? 0
            : Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
          const bookedOnStr = formatDate(b.createdAt || b.updatedAt || '');
          const roomName = b.room?.name || b.room?._id || '—';
          return {
            id: b._id,
            roomName,
            checkIn: checkInStr,
            checkOut: checkOutStr,
            nights,
            amount: b.totalPrice ?? 0,
            status: b.status ?? '',
            bookedOn: bookedOnStr,
            paymentScreenshot: b.paymentScreenshot,
            assignedRoom: b.assignedRoom,
          };
        });
        setBookings(mapped);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        toast.error('Failed to load booking history');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleCancelBooking = async (bookingId: string) => {
    // Call backend to cancel; adjust endpoint if needed
    try {
      const token = user?.token;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      // Example endpoint: PUT /api/bookings/:id/cancel
      await axios.put(`https://hotelswagatbackend-1.onrender.com/api/bookings/${bookingId}/cancel`, {}, { headers });
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      toast.success(`Booking ${bookingId} cancelled successfully`);
      // If details modal open on this booking, close it
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(null);
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = (checkIn: string) => {
    const checkInDate = new Date(checkIn);
    const today = new Date();
    // treat same-day check-in as upcoming
    return !isNaN(checkInDate.getTime()) && checkInDate >= new Date(today.toDateString());
  };

  const upcomingBookings = bookings.filter(booking =>
    isUpcoming(booking.checkIn) && booking.status !== 'cancelled'
  );
  const pastBookings = bookings.filter(booking =>
    !isUpcoming(booking.checkIn) || booking.status === 'cancelled'
  );

  const viewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  if (!user || loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const BookingCard = ({ booking, showCancelOption = false }: { booking: Booking; showCancelOption?: boolean }) => (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{booking.roomName}</h3>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
          {booking.assignedRoom && (
            <Badge className="bg-blue-100 text-blue-800">
              <MapPin className="w-3 h-3 mr-1" />
              {booking.assignedRoom}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
        <div>
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Booked on:</strong> {booking.bookedOn}</p>
        </div>
        <div>
          <p><strong>Check-in:</strong> {booking.checkIn}</p>
          <p><strong>Check-out:</strong> {booking.checkOut}</p>
          <p><strong>Nights:</strong> {booking.nights}</p>
        </div>
        <div>
          <p><strong>Total Amount:</strong> ₹{booking.amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => viewBookingDetails(booking)}
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </Button>
        {showCancelOption && booking.status !== 'cancelled' && isUpcoming(booking.checkIn) && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleCancelBooking(booking.id)}
          >
            <XCircle className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        )}
      </div>
    </div>
  );

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
              <Tabs defaultValue="upcoming" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                  <TabsTrigger value="past">Past Bookings</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                      <p className="text-gray-600">When you make a new booking, it will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingBookings.map(booking => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          showCancelOption={true}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past">
                  {pastBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No past bookings</h3>
                      <p className="text-gray-600">Your completed bookings will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pastBookings.map(booking => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          showCancelOption={false}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Booking Details - {selectedBooking.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Booking Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><strong>Room Type:</strong> {selectedBooking.roomName}</p>
                  <p><strong>Check-in:</strong> {selectedBooking.checkIn}</p>
                  <p><strong>Check-out:</strong> {selectedBooking.checkOut}</p>
                  <p><strong>Nights:</strong> {selectedBooking.nights}</p>
                  <p><strong>Amount:</strong> ₹{selectedBooking.amount.toLocaleString()}</p>
                  <p><strong>Booked on:</strong> {selectedBooking.bookedOn}</p>
                  <p><strong>Status:</strong>
                    <Badge className={`ml-2 ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </Badge>
                  </p>
                  {selectedBooking.assignedRoom && (
                    <p><strong>Assigned Room:</strong> {selectedBooking.assignedRoom}</p>
                  )}
                </div>
              </div>

              {selectedBooking.paymentScreenshot && (
                <div>
                  <h4 className="font-semibold mb-2">Payment Screenshot</h4>
                  <div
                    className="border rounded-lg p-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => setFullscreenImage(selectedBooking.paymentScreenshot!)}
                  >
                    <img
                      src={selectedBooking.paymentScreenshot}
                      alt="Payment Screenshot"
                      className="w-32 h-32 object-cover rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">Click to view fullscreen</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
                {selectedBooking.status !== 'cancelled' && isUpcoming(selectedBooking.checkIn) && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleCancelBooking(selectedBooking.id);
                      setSelectedBooking(null);
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 z-10"
              onClick={() => setFullscreenImage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
            <img
              src={fullscreenImage}
              alt="Payment Screenshot"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BookingHistory;

