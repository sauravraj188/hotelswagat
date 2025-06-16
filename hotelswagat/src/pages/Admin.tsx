import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Home, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface Booking {
  id: string;
  guest: string;
  email: string;
  phone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: string;
  amount: number;
  paymentStatus: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [user, setUser] = useState<any>(null);
  const [roomFilter, setRoomFilter] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [bookingSearch, setBookingSearch] = useState<string>('');
  const [roomSearch, setRoomSearch] = useState<string>('');

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('user');
    if (!userData) {
      toast.error('Please login to access admin panel');
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      // Check if user has admin privileges (in real app, this would be checked against backend)
      if (!parsedUser.email?.includes('admin')) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Mock data
  const stats = [
    { title: 'Total Bookings Today', value: '24', icon: <Calendar className="w-6 h-6" />, color: 'text-blue-600' },
    { title: 'Current Occupancy', value: '85%', icon: <Home className="w-6 h-6" />, color: 'text-green-600' },
    { title: 'Revenue Today', value: '₹1,25,000', icon: <DollarSign className="w-6 h-6" />, color: 'text-purple-600' },
    { title: 'Check-ins Today', value: '18', icon: <Users className="w-6 h-6" />, color: 'text-orange-600' }
  ];

  // Mock data with updated bookings that can be cancelled
  const [recentBookings, setRecentBookings] = useState<Booking[]>([
    { 
      id: 'BK001', 
      guest: 'Rajesh Kumar', 
      email: 'rajesh@example.com',
      phone: '+91 98765 43210',
      room: 'Deluxe Room', 
      checkIn: '2024-01-15', 
      checkOut: '2024-01-17',
      nights: 2,
      status: 'confirmed', 
      amount: 3500,
      paymentStatus: 'paid'
    },
    { 
      id: 'BK002', 
      guest: 'Priya Sharma', 
      email: 'priya@example.com',
      phone: '+91 87654 32109',
      room: 'Family Suite', 
      checkIn: '2024-01-16', 
      checkOut: '2024-01-19',
      nights: 3,
      status: 'pending', 
      amount: 5500,
      paymentStatus: 'pending'
    },
    { 
      id: 'BK003', 
      guest: 'Amit Patel', 
      email: 'amit@example.com',
      phone: '+91 76543 21098',
      room: 'Standard Room', 
      checkIn: '2024-01-15', 
      checkOut: '2024-01-16',
      nights: 1,
      status: 'confirmed', 
      amount: 2500,
      paymentStatus: 'paid'
    },
    { 
      id: 'BK004', 
      guest: 'Sunita Gupta', 
      email: 'sunita@example.com',
      phone: '+91 65432 10987',
      room: 'Executive Suite', 
      checkIn: '2024-01-17', 
      checkOut: '2024-01-20',
      nights: 3,
      status: 'pending', 
      amount: 7500,
      paymentStatus: 'pending'
    }
  ]);

  const rooms = [
    { id: 'R001', name: 'Deluxe Room 101', type: 'Deluxe', status: 'occupied', guest: 'John Doe', checkOut: '2024-01-16' },
    { id: 'R002', name: 'Family Suite 201', type: 'Suite', status: 'available', guest: null, checkOut: null },
    { id: 'R003', name: 'Standard Room 102', type: 'Standard', status: 'cleaning', guest: null, checkOut: null },
    { id: 'R004', name: 'Executive Suite 301', type: 'Suite', status: 'occupied', guest: 'Jane Smith', checkOut: '2024-01-18' },
    { id: 'R005', name: 'Deluxe Room 102', type: 'Deluxe', status: 'available', guest: null, checkOut: null },
    { id: 'R006', name: 'Standard Room 103', type: 'Standard', status: 'cleaning', guest: null, checkOut: null }
  ];

  const filteredRooms = roomFilter === 'all' 
    ? rooms.filter(room => 
        roomSearch === '' || 
        room.name.toLowerCase().includes(roomSearch.toLowerCase()) ||
        room.id.toLowerCase().includes(roomSearch.toLowerCase())
      )
    : rooms.filter(room => 
        room.status === roomFilter && 
        (roomSearch === '' || 
         room.name.toLowerCase().includes(roomSearch.toLowerCase()) ||
         room.id.toLowerCase().includes(roomSearch.toLowerCase()))
      );

  const filteredBookings = recentBookings.filter(booking =>
    bookingSearch === '' ||
    booking.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    booking.guest.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    booking.phone.includes(bookingSearch)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'occupied': return 'bg-blue-100 text-blue-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'cleaning': return 'bg-orange-100 text-orange-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleConfirmBooking = (bookingId: string) => {
    setRecentBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'confirmed' }
          : booking
      )
    );
    toast.success(`Booking ${bookingId} confirmed successfully`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setRecentBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
    toast.success(`Booking ${bookingId} cancelled successfully`);
  };

  const viewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleManageRoom = (room: any) => {
    setSelectedRoom(room);
  };

  const handleRoomStatusChange = (roomId: string, newStatus: string) => {
    toast.success(`Room ${roomId} status updated to ${newStatus}`);
    setSelectedRoom(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-hotel-blue">Hotel Swagat Admin</h1>
              <p className="text-gray-600">Manage your hotel operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Welcome, {user.name}</p>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-2">+12% from yesterday</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
            <TabsTrigger value="rooms">Room Status</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Booking Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search by ID, guest name, or phone..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-medium text-lg">{booking.guest}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(booking.status)}
                                <span>{booking.status}</span>
                              </div>
                            </Badge>
                            <Badge className={getStatusColor(booking.paymentStatus)}>
                              {booking.paymentStatus}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Booking ID:</strong> {booking.id}</p>
                            <p><strong>Room:</strong> {booking.room}</p>
                            <p><strong>Dates:</strong> {booking.checkIn} to {booking.checkOut} ({booking.nights} nights)</p>
                            <p><strong>Contact:</strong> {booking.email} | {booking.phone}</p>
                            <p><strong>Amount:</strong> ₹{booking.amount.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => viewBookingDetails(booking)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {booking.status === 'pending' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleConfirmBooking(booking.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Confirm
                              </Button>
                              <Button 
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button 
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Room Status Overview</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search by room name or number..."
                      value={roomSearch}
                      onChange={(e) => setRoomSearch(e.target.value)}
                      className="w-64"
                    />
                    <select
                      value={roomFilter}
                      onChange={(e) => setRoomFilter(e.target.value)}
                      className="px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="all">All Rooms</option>
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="cleaning">Cleaning</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRooms.map((room) => (
                    <div key={room.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{room.name}</h3>
                        <Badge className={getStatusColor(room.status)}>
                          {room.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{room.type}</p>
                      {room.guest && (
                        <div className="text-sm">
                          <p>Guest: {room.guest}</p>
                          <p>Check-out: {room.checkOut}</p>
                        </div>
                      )}
                      <div className="mt-3 flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleManageRoom(room)}
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guests Tab */}
          <TabsContent value="guests">
            <Card>
              <CardHeader>
                <CardTitle>Guest Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Guest Management</h3>
                  <p className="text-gray-600">View and manage guest profiles, preferences, and booking history.</p>
                  <Button className="mt-4">View All Guests</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Revenue Chart Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Occupancy Chart Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Booking Details - {selectedBooking.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Guest Information</h4>
                <p>Name: {selectedBooking.guest}</p>
                <p>Email: {selectedBooking.email}</p>
                <p>Phone: {selectedBooking.phone}</p>
              </div>
              <div>
                <h4 className="font-semibold">Booking Information</h4>
                <p>Room: {selectedBooking.room}</p>
                <p>Check-in: {selectedBooking.checkIn}</p>
                <p>Check-out: {selectedBooking.checkOut}</p>
                <p>Nights: {selectedBooking.nights}</p>
                <p>Amount: ₹{selectedBooking.amount.toLocaleString()}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Room Management Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Manage Room - {selectedRoom.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Current Status</h4>
                <Badge className={getStatusColor(selectedRoom.status)}>
                  {selectedRoom.status}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-semibold">Change Status</h4>
                <div className="space-y-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => handleRoomStatusChange(selectedRoom.id, 'available')}
                  >
                    Mark as Available
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => handleRoomStatusChange(selectedRoom.id, 'cleaning')}
                  >
                    Mark for Cleaning
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => handleRoomStatusChange(selectedRoom.id, 'maintenance')}
                  >
                    Mark for Maintenance
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedRoom(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;
