
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Users, Calendar, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-primary" />, number: '10,000+', label: 'Happy Guests' },
    { icon: <Calendar className="w-8 h-8 text-primary" />, number: '25+', label: 'Years of Excellence' },
    { icon: <Star className="w-8 h-8 text-primary" />, number: '4.8', label: 'Average Rating' },
    // { icon: <Award className="w-8 h-8 text-primary" />, number: '25+', label: 'Awards Won' }
  ];
  const customers = [
    { name: 'Rajesh Kumar', role: 'From Jharkhand', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&crop=face' },
    { name: 'Priya Sharma', role: 'From Delhi', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=300&fit=crop&crop=face' },
    { name: 'Amit Patel', role: 'From Agra', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=300&fit=crop&crop=face' },
    { name: 'Sunita Verma', role: 'From Mumbai', image: 'https://images.unsplash.com/photo-1502767089025-6572583495b8?w=300&h=300&fit=crop&crop=face' },
    { name: 'Rohit Singh', role: 'From Bangalore', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=300&fit=crop&crop=face' },
    { name: 'Neha Gupta', role: 'From Kolkata', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&crop=face' },
    // ...add as many as you like
  ];

  // For seamless loop, we'll duplicate the array
  const loopCustomers = [...customers, ...customers];

  const values = [
    {
      title: 'Authentic Hospitality',
      description: 'We embrace the true spirit of Indian hospitality, treating every guest as family.'
    },
    {
      title: 'Modern Comfort',
      description: 'Contemporary amenities and facilities designed for the modern traveler.'
    },
    {
      title: 'Cultural Heritage',
      description: 'Celebrating Indian culture while providing international standards of service.'
    },
    {
      title: 'Sustainable Practices',
      description: 'Committed to environmental responsibility and sustainable tourism.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-hotel-blue to-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Hotel Swagat</h1>
            <p className="text-xl text-gray-100">
            Your Comfort Hub in the Heart of Saharanpur
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-3xl font-bold text-hotel-blue mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                  Located right opposite Ghanta Ghar on Nehru Market Road, Bhagat Singh Marg, Hotel Swagat offers the perfect blend of convenience, comfort, and connectivity. Situated in the vibrant heart of Saharanpur, our hotel is a strategic choice for business travelers, families, and tourists alike.
                  </p>
                  <p>
                  With the city’s key landmarks just steps away — only 50 meters from the railway station, 20 meters from Nehru Market, 100 meters from the famous Wooden Market, and a mere 10 meters from the bus stand — getting around couldn’t be easier.
                  </p>
                  <p>
                  Whether you’re here for a quick stopover or an extended stay, Hotel Swagat promises warm hospitality, clean and well-furnished rooms, and a peaceful environment amidst the city’s buzz. We take pride in offering affordable luxury and personalized service that makes every stay memorable.</p>
                </div>
              </div>
              <div className="animate-slide-up">
                <img 
                  src="https://res.cloudinary.com/dulcnzla9/image/upload/v1750479965/155_fcejmj.png" 
                  alt="Hotel Swagat Building"
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-hotel-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-hotel-blue mb-12">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">{stat.icon}</div>
                    <h3 className="text-3xl font-bold text-hotel-blue mb-2">{stat.number}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-hotel-blue mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-hotel-blue mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
      <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-hotel-blue">Find Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.5342488910073!2d77.54353207527276!3d29.964072722374794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eea916b62fb3d%3A0x793ca2fcb1eae1fc!2sHotel%20Swagat!5e0!3m2!1sen!2sin!4v1750484449910!5m2!1sen!2sin"
    title="Hotel Swagat Location"
    className="w-full h-full rounded-lg"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
                    </div>
                    <div className="space-y-4"> 
                      <div>
                        <h4 className="font-semibold text-hotel-blue mb-2">Location</h4>
                        <p className="text-gray-600">
                          Hotel Swagat is conveniently located in the heart of Saharanpur at
                          Ghanta Ghar, Bhagat Singh Rd, next to Rajdoot sweets, Bijopuri, Uttar Pradesh
                      
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-hotel-blue mb-2">Transportation</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• 50 meters from railway station</li>
                          <li>• 20 meters from Nehru Marke</li>
                          <li>• 100 meters from the famous Wooden Market</li>
                          <li>• 10 meters from the bus stand</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>   
</section>
      {/* Team Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-hotel-blue mb-6">Our Happy Customers</h2>
            <p className="text-gray-600 mb-12">
              Our dedicated team of hospitality professionals is committed to making our customer's stay memorable
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Rajesh Kumar', role: 'From Jharkhand', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop&crop=face' },
                { name: 'Priya Sharma', role: 'From Delhi', image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=300&h=300&fit=crop&crop=face' },
                { name: 'Amit Patel', role: 'From Agra', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=300&fit=crop&crop=face' }
              ].map((member, index) => (
                <Card key={index} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-hotel-blue">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}
       {/* Our Happy Customers with auto-scrolling marquee */}
       <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-hotel-blue mb-6">Our Happy Customers</h2>
            <p className="text-gray-600 mb-12">
              Our dedicated team of hospitality professionals is committed to making our customer's stay memorable
            </p>
            {/* marquee container */}
            <div className="overflow-hidden">
              <div
                className="flex space-x-8 animate-marquee-slow"
                style={{ width: 'max-content' }}
              >
                {loopCustomers.map((member, idx) => (
                  <Card
                    key={idx}
                    className="card-hover animate-float-slow flex-shrink-0"
                    style={{ width: '200px' }}
                  >
                    <CardContent className="p-4 text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                      />
                      <h3 className="text-md font-semibold text-hotel-blue">{member.name}</h3>
                      <p className="text-gray-600 text-sm">{member.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            
          </div>

        </div>
      </section>

     
      <Footer />
      
    </div>
  );
};

export default About;
