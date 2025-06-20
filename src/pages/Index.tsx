
// // import React from 'react';
// // import Header from '@/components/Header';
// // import SearchForm from '@/components/SearchForm';
// // import RoomCard from '@/components/RoomCard';
// // import Footer from '@/components/Footer';
// // import { Button } from '@/components/ui/button';
// // import { Star, Shield, Coffee, Wifi, Car, Phone } from 'lucide-react';

// // const Index = () => {
// //   // Mock room data
// //   const featuredRooms = [
// //     {
// //       id: '1',
// //       name: 'Deluxe Room',
// //       type: 'Deluxe',
// //       price: 3500,
// //       image: 'https://res.cloudinary.com/dulcnzla9/image/upload/v1750093375/ac-min-scaled_a8fmre.jpg',
// //       rating: 4.8,
// //       reviews: 124,
// //       capacity: 2,
// //       amenities: ['WiFi', 'Breakfast', 'Parking'],
// //       description: 'Spacious room with modern amenities and city view'
// //     },
// //     {
// //       id: '2',
// //       name: 'Family Suite',
// //       type: 'Suite',
// //       price: 5500,
// //       image: 'https://res.cloudinary.com/dulcnzla9/image/upload/v1750094209/suite-min-scaled_gkozxa.jpg',
// //       rating: 4.9,
// //       reviews: 89,
// //       capacity: 4,
// //       amenities: ['WiFi', 'Breakfast', 'Parking'],
// //       description: 'Perfect for families with separate living area'
// //     },
// //     {
// //       id: '3',
// //       name: 'Standard Room',
// //       type: 'Standard',
// //       price: 2500,
// //       image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
// //       rating: 4.6,
// //       reviews: 203,
// //       capacity: 2,
// //       amenities: ['WiFi', 'Parking'],
// //       description: 'Comfortable accommodation with essential amenities'
// //     }
// //   ];

// //   const features = [
// //     {
// //       icon: <Shield className="w-8 h-8 text-primary" />,
// //       title: '24/7 Security',
// //       description: 'Round-the-clock security for your peace of mind'
// //     },
// //     {
// //       icon: <Coffee className="w-8 h-8 text-primary" />,
// //       title: 'Complimentary Breakfast',
// //       description: 'Start your day with our delicious breakfast spread'
// //     },
// //     {
// //       icon: <Wifi className="w-8 h-8 text-primary" />,
// //       title: 'Free High-Speed WiFi',
// //       description: 'Stay connected with complimentary internet access'
// //     },
// //     {
// //       icon: <Car className="w-8 h-8 text-primary" />,
// //       title: 'Free Parking',
// //       description: 'Convenient parking space for all our guests'
// //     }
// //   ];

// //   return (
// //     <div className="min-h-screen">
// //       <Header />
      
// //       {/* Hero Section */}
// //       <section className="relative hero-gradient text-white py-20 lg:py-32">
// //         <div className="absolute inset-0 bg-black/20"></div>
// //         <div className="relative container mx-auto px-4">
// //           <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
// //             <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
// //               Welcome to <span className="text-hotel-gold">Hotel Swagat</span>
// //             </h1>
// //             <p className="text-xl lg:text-2xl text-gray-100 max-w-2xl mx-auto">
// //               Experience authentic Indian hospitality with modern comfort. 
// //               Your perfect stay awaits at Hotel Swagat.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <Button size="lg" className="bg-white text-hotel-blue hover:bg-gray-100">
// //                 Explore Rooms
// //               </Button>
// //               <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-hotel-blue">
// //                 <Phone className="w-4 h-4 mr-2" />
// //                 Call Now
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Search Section */}
// //       <section className="py-12 bg-gray-50">
// //         <div className="container mx-auto px-4">
// //           <div className="max-w-6xl mx-auto">
// //             <div className="text-center mb-8 animate-slide-up">
// //               <h2 className="text-3xl font-bold text-hotel-blue mb-4">Find Your Perfect Room</h2>
// //               <p className="text-gray-600">Search and book your ideal accommodation at Hotel Swagat</p>
// //             </div>
// //             <SearchForm />
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Rooms */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center mb-12 animate-slide-up">
// //             <h2 className="text-3xl font-bold text-hotel-blue mb-4">Featured Rooms</h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               Discover our carefully curated selection of rooms, each designed to provide 
// //               the ultimate comfort and luxury experience.
// //             </p>
// //           </div>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {featuredRooms.map((room, index) => (
// //               <div key={room.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
// //                 <RoomCard {...room} />
// //               </div>
// //             ))}
// //           </div>

// //           <div className="text-center mt-12">
// //             <Button size="lg" className="bg-primary hover:bg-primary/90">
// //               View All Rooms
// //             </Button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="py-16 bg-hotel-cream">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center mb-12 animate-slide-up">
// //             <h2 className="text-3xl font-bold text-hotel-blue mb-4">Why Choose Hotel Swagat?</h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               We offer exceptional services and amenities to make your stay memorable and comfortable.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             {features.map((feature, index) => (
// //               <div 
// //                 key={index} 
// //                 className="text-center space-y-4 animate-slide-up"
// //                 style={{ animationDelay: `${index * 0.1}s` }}
// //               >
// //                 <div className="flex justify-center">{feature.icon}</div>
// //                 <h3 className="text-xl font-semibold text-hotel-blue">{feature.title}</h3>
// //                 <p className="text-gray-600">{feature.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Testimonial Section */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4">
// //           <div className="max-w-4xl mx-auto text-center animate-slide-up">
// //             <h2 className="text-3xl font-bold text-hotel-blue mb-8">What Our Guests Say</h2>
            
// //             <div className="bg-white rounded-lg shadow-lg p-8 relative">
// //               <div className="flex justify-center mb-4">
// //                 {[...Array(5)].map((_, i) => (
// //                   <Star key={i} className="w-6 h-6 fill-hotel-gold text-hotel-gold" />
// //                 ))}
// //               </div>
// //               <blockquote className="text-xl text-gray-700 mb-6 italic">
// //                 "Exceptional service and beautiful rooms. Hotel Swagat truly lives up to its reputation. 
// //                 The staff was incredibly helpful and the breakfast was delicious. Will definitely return!"
// //               </blockquote>
// //               <div className="flex items-center justify-center space-x-4">
// //                 <img 
// //                   src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=60&h=60&fit=crop&crop=face" 
// //                   alt="Guest" 
// //                   className="w-12 h-12 rounded-full object-cover"
// //                 />
// //                 <div>
// //                   <p className="font-semibold text-hotel-blue">Priya Sharma</p>
// //                   <p className="text-sm text-gray-500">Delhi</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Index;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '@/components/Header';
// import SearchForm, { SearchParams } from '@/components/SearchForm';
// import RoomCard from '@/components/RoomCard';
// import Footer from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Star, Shield, Coffee, Wifi, Car, Phone } from 'lucide-react';

// interface Room {
//   _id: string;
//   name: string;
//   type: string;
//   price: number;
//   image: string;
//   images: string[];
//   rating: number;
//   reviews: number;
//   capacity: number;
//   amenities: string[];
//   description: string;
//   size?: string;
//   beds?: string;
//   features?: string[];
//   policies?: {
//     checkIn: string;
//     checkOut: string;
//     cancellation: string;
//     smoking: string;
//     pets: string;
//   };
// }

// const Index: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchResults, setSearchResults] = useState<Room[] | null>(null);
//   const [isSearching, setIsSearching] = useState(false);

//   const handleSearch = async (params: SearchParams) => {
//     setIsSearching(true);
//     try {
//       const qs = new URLSearchParams();
//       if (params.checkIn) qs.set('checkIn', params.checkIn);
//       if (params.checkOut) qs.set('checkOut', params.checkOut);
//       qs.set('guests', params.guests.toString());
//       if (params.roomType) qs.set('type', params.roomType);

//       const res = await fetch(`/api/rooms?${qs.toString()}`);
//       if (!res.ok) throw new Error(res.statusText);
//       const rooms: Room[] = await res.json();
//       setSearchResults(rooms);
//     } catch (err: any) {
//       console.error(err);
//       alert(`Search failed: ${err.message}`);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const clearSearch = () => setSearchResults(null);

//   // Mock featured rooms with `id`, matching RoomCardProps
//   const featuredRooms = [
//     {
//       id: '1',
//       name: 'Deluxe Room',
//       type: 'Deluxe',
//       price: 3500,
//       image: 'https://res.cloudinary.com/dulcnzla9/image/upload/v1750093375/ac-min-scaled_a8fmre.jpg',
//       rating: 4.8,
//       reviews: 124,
//       capacity: 2,
//       amenities: ['WiFi', 'Breakfast', 'Parking'],
//       description: 'Spacious room with modern amenities and city view'
//     },
//     {
//       id: '2',
//       name: 'Family Suite',
//       type: 'Suite',
//       price: 5500,
//       image: 'https://res.cloudinary.com/dulcnzla9/image/upload/v1750094209/suite-min-scaled_gkozxa.jpg',
//       rating: 4.9,
//       reviews: 89,
//       capacity: 4,
//       amenities: ['WiFi', 'Breakfast', 'Parking'],
//       description: 'Perfect for families with separate living area'
//     },
//     {
//       id: '3',
//       name: 'Standard Room',
//       type: 'Standard',
//       price: 2500,
//       image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
//       rating: 4.6,
//       reviews: 203,
//       capacity: 2,
//       amenities: ['WiFi', 'Parking'],
//       description: 'Comfortable accommodation with essential amenities'
//     }
//   ];

//   const features = [
//     {
//       icon: <Shield className="w-8 h-8 text-primary" />,
//       title: '24/7 Security',
//       description: 'Round-the-clock security for your peace of mind'
//     },
//     {
//       icon: <Coffee className="w-8 h-8 text-primary" />,
//       title: 'Complimentary Breakfast',
//       description: 'Start your day with our delicious breakfast spread'
//     },
//     {
//       icon: <Wifi className="w-8 h-8 text-primary" />,
//       title: 'Free High-Speed WiFi',
//       description: 'Stay connected with complimentary internet access'
//     },
//     {
//       icon: <Car className="w-8 h-8 text-primary" />,
//       title: 'Free Parking',
//       description: 'Convenient parking space for all our guests'
//     }
//   ];

//   return (
//     <div className="min-h-screen">
//       <Header />
      
//       {/* Hero Section */}
//       <section className="relative hero-gradient text-white py-20 lg:py-32">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="relative container mx-auto px-4">
//           <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
//             <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
//               Welcome to <span className="text-hotel-gold">Hotel Swagat</span>
//             </h1>
//             <p className="text-xl lg:text-2xl text-gray-100 max-w-2xl mx-auto">
//               Experience authentic Indian hospitality with modern comfort. 
//               Your perfect stay awaits at Hotel Swagat.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button
//                 size="lg"
//                 className="bg-white text-hotel-blue hover:bg-gray-100"
//                 onClick={() => navigate('/rooms')}
//               >
//                 Explore Rooms
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white hover:text-hotel-blue"
//                 onClick={() => {
//                   // example: maybe open tel: link
//                   window.location.href = 'tel:+1234567890';
//                 }}
//               >
//                 <Phone className="w-4 h-4 mr-2" />
//                 Call Now
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Search Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-8 animate-slide-up">
//               <h2 className="text-3xl font-bold text-hotel-blue mb-4">
//                 Find Your Perfect Room
//               </h2>
//               <p className="text-gray-600">
//                 Search and book your ideal accommodation at Hotel Swagat
//               </p>
//             </div>
//             <SearchForm onSearch={handleSearch} loading={isSearching} />
//           </div>
//         </div>
//       </section>

//       {searchResults !== null && (
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-3xl font-bold text-hotel-blue">
//                 {searchResults.length
//                   ? `Found ${searchResults.length} Room${searchResults.length > 1 ? 's' : ''}`
//                   : 'No Rooms Found'}
//               </h2>
//               <Button variant="outline" onClick={clearSearch}>
//                 View All
//               </Button>
//             </div>
//             {searchResults.length ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {searchResults.map((r, i) => (
//                   <div key={r._id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
//                     <RoomCard
//                       id={r._id}
//                       name={r.name}
//                       type={r.type}
//                       price={r.price}
//                       image={r.image}
//                       // images={r.images} // only pass if RoomCardProps includes images[]
//                       rating={r.rating}
//                       reviews={r.reviews}
//                       capacity={r.capacity}
//                       amenities={r.amenities}
//                       description={r.description}
//                       size={r.size}
//                       beds={r.beds}
//                       features={r.features}
//                       policies={r.policies}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">Try different dates or room types.</p>
//             )}
//           </div>
//         </section>
//       )}

//       {searchResults === null && (
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12 animate-slide-up">
//               <h2 className="text-3xl font-bold text-hotel-blue mb-4">Featured Rooms</h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Discover our carefully curated selection of rooms, each designed to provide 
//                 the ultimate comfort and luxury experience.
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {featuredRooms.map((room, index) => (
//                 <div key={room.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
//                   <RoomCard {...room} />
//                 </div>
//               ))}
//             </div>

//             <div className="text-center mt-12">
//               <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/rooms')}>
//                 View All Rooms
//               </Button>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Features Section */}
//       <section className="py-16 bg-hotel-cream">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12 animate-slide-up">
//             <h2 className="text-3xl font-bold text-hotel-blue mb-4">Why Choose Hotel Swagat?</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               We offer exceptional services and amenities to make your stay memorable and comfortable.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="text-center space-y-4 animate-slide-up"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="flex justify-center">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold text-hotel-blue">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonial Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto text-center animate-slide-up">
//             <h2 className="text-3xl font-bold text-hotel-blue mb-8">What Our Guests Say</h2>
            
//             <div className="bg-white rounded-lg shadow-lg p-8 relative">
//               <div className="flex justify-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-6 h-6 fill-hotel-gold text-hotel-gold" />
//                 ))}
//               </div>
//               <blockquote className="text-xl text-gray-700 mb-6 italic">
//                 "Exceptional service and beautiful rooms. Hotel Swagat truly lives up to its reputation. 
//                 The staff was incredibly helpful and the breakfast was delicious. Will definitely return!"
//               </blockquote>
//               <div className="flex items-center justify-center space-x-4">
//                 <img 
//                   src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=60&h=60&fit=crop&crop=face" 
//                   alt="Guest" 
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="font-semibold text-hotel-blue">Priya Sharma</p>
//                   <p className="text-sm text-gray-500">Delhi</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Index;
// src/pages/Index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SearchForm, { SearchParams } from '@/components/SearchForm';
import RoomCard from '@/components/RoomCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Star, Shield, Coffee, Wifi, Car, Phone } from 'lucide-react';
import api from '@/api/client';

interface Room {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  images?: string[];
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

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Room[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    try {
      const qs = new URLSearchParams();
      if (params.checkIn)  qs.set('checkIn', params.checkIn);
      if (params.checkOut) qs.set('checkOut', params.checkOut);
      qs.set('guests', params.guests.toString());
      if (params.roomType) qs.set('type', params.roomType);

      // Use your api client: BASE_URL + '/rooms?...'
      const rooms = await api.get<Room[]>(`/rooms?${qs.toString()}`);
      setSearchResults(rooms);
    } catch (err: any) {
      console.error('Search error:', err);
      alert(`Search failed: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => setSearchResults(null);

  // Mock featured rooms (client-side) with `id` for RoomCardProps
  const featuredRooms = [
    {
      id: '1',
      name: 'Deluxe Room',
      type: 'Deluxe',
      price: 3500,
      image: 'https://res.cloudinary.com/dulcnzla9/image/upload/v1750093375/ac-min-scaled_a8fmre.jpg',
      rating: 4.8,
      reviews: 124,
      capacity: 2,
      amenities: ['WiFi', 'Breakfast', 'Parking'],
      description: 'Spacious room with modern amenities and city view'
    },
    {
      id: '2',
      name: 'Family Suite',
      type: 'Suite',
      price: 5500,
      image: 'https://res.cloudinary.com/dulcnzla9/image/upload/v1750094209/suite-min-scaled_gkozxa.jpg',
      rating: 4.9,
      reviews: 89,
      capacity: 4,
      amenities: ['WiFi', 'Breakfast', 'Parking'],
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
      amenities: ['WiFi', 'Parking'],
      description: 'Comfortable accommodation with essential amenities'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: '24/7 Security',
      description: 'Round-the-clock security for your peace of mind'
    },
    {
      icon: <Coffee className="w-8 h-8 text-primary" />,
      title: 'Complimentary Breakfast',
      description: 'Start your day with our delicious breakfast spread'
    },
    {
      icon: <Wifi className="w-8 h-8 text-primary" />,
      title: 'Free High-Speed WiFi',
      description: 'Stay connected with complimentary internet access'
    },
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: 'Free Parking',
      description: 'Convenient parking space for all our guests'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative hero-gradient text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Welcome to <span className="text-hotel-gold">Hotel Swagat</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 max-w-2xl mx-auto">
              Experience authentic Indian hospitality with modern comfort. 
              Your perfect stay awaits at Hotel Swagat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-hotel-blue hover:bg-gray-100"
                onClick={() => navigate('/rooms')}
              >
                Explore Rooms
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-hotel-blue"
                onClick={() => { window.location.href = 'tel:+1234567890'; }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 animate-slide-up">
              <h2 className="text-3xl font-bold text-hotel-blue mb-4">
                Find Your Perfect Room
              </h2>
              <p className="text-gray-600">
                Search and book your ideal accommodation at Hotel Swagat
              </p>
            </div>
            <SearchForm onSearch={handleSearch} loading={isSearching} />
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchResults !== null && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-hotel-blue">
                {searchResults.length
                  ? `Found ${searchResults.length} Room${searchResults.length > 1 ? 's' : ''}`
                  : 'No Rooms Found'}
              </h2>
              <Button variant="outline" onClick={clearSearch}>
                View All
              </Button>
            </div>
            {searchResults.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((r, i) => (
                  <div
                    key={r._id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <RoomCard
                      id={r._id}
                      name={r.name}
                      type={r.type}
                      price={r.price}
                      image={r.image}
                      // images={r.images || []}
                      rating={r.rating}
                      reviews={r.reviews}
                      capacity={r.capacity}
                      amenities={r.amenities}
                      description={r.description}
                      // size={r.size}
                      // beds={r.beds}
                      // features={r.features}
                      // policies={r.policies}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Try different dates or room types.</p>
            )}
          </div>
        </section>
      )}

      {/* Featured Rooms if no search */}
      {searchResults === null && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl font-bold text-hotel-blue mb-4">Featured Rooms</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our carefully curated selection of rooms, each designed to provide 
                the ultimate comfort and luxury experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRooms.map((room, index) => (
                <div
                  key={room.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RoomCard {...room} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/rooms')}>
                View All Rooms
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Section */}
      <section className="py-16 bg-hotel-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-hotel-blue mb-4">Why Choose Hotel Swagat?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer exceptional services and amenities to make your stay memorable and comfortable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-hotel-blue">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h2 className="text-3xl font-bold text-hotel-blue mb-8">What Our Guests Say</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-hotel-gold text-hotel-gold" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                "Exceptional service and beautiful rooms. Hotel Swagat truly lives up to its reputation. 
                The staff was incredibly helpful and the breakfast was delicious. Will definitely return!"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=60&h=60&fit=crop&crop=face" 
                  alt="Guest" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-hotel-blue">Priya Sharma</p>
                  <p className="text-sm text-gray-500">Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
