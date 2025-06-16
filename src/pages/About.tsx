
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Calendar, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-primary" />, number: '10,000+', label: 'Happy Guests' },
    { icon: <Calendar className="w-8 h-8 text-primary" />, number: '15', label: 'Years of Excellence' },
    { icon: <Star className="w-8 h-8 text-primary" />, number: '4.8', label: 'Average Rating' },
    { icon: <Award className="w-8 h-8 text-primary" />, number: '25+', label: 'Awards Won' }
  ];

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
              Where tradition meets modernity, and every guest experiences the warmth of Indian hospitality
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
                    Founded in 2009, Hotel Swagat began as a vision to create a place where travelers 
                    could experience authentic Indian hospitality without compromising on modern comfort. 
                    The word "Swagat" means "welcome" in Hindi, perfectly capturing our essence.
                  </p>
                  <p>
                    Over the years, we have grown from a small boutique hotel to one of the most 
                    trusted names in hospitality, consistently delivering exceptional experiences 
                    that blend traditional warmth with contemporary luxury.
                  </p>
                  <p>
                    Today, Hotel Swagat stands as a testament to our commitment to excellence, 
                    having welcomed guests from around the world and created memories that last a lifetime.
                  </p>
                </div>
              </div>
              <div className="animate-slide-up">
                <img 
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop" 
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-hotel-blue mb-6">Meet Our Team</h2>
            <p className="text-gray-600 mb-12">
              Our dedicated team of hospitality professionals is committed to making your stay memorable
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Rajesh Kumar', role: 'General Manager', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop&crop=face' },
                { name: 'Priya Sharma', role: 'Guest Relations Manager', image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=300&h=300&fit=crop&crop=face' },
                { name: 'Amit Patel', role: 'Head Chef', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=300&fit=crop&crop=face' }
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
      </section>

      <Footer />
    </div>
  );
};

export default About;
