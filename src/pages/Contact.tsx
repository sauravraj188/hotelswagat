
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Thank you! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: 'Phone',
      details: ['+919760299901'],
      description: 'Call us anytime for reservations or inquiries'
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: 'Email',
      details: ['hotelswagat247001@gmail.com'],
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: 'Address',
      details: ['Ghanta Ghar, Bhagat Singh Rd, next to Rajdoot sweets, Bijopuri, Saharanpur, Uttar Pradesh 247001 India'],
      description: 'Visit us in the heart of Saharanpur'
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: 'Hours',
      details: ['24/7 Reception', 'Check-in: 2:00 PM', 'Check-out: 12:00 PM'],
      description: 'We\'re here to assist you round the clock'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-hotel-blue to-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Hotel Swagat</h1>
            <p className="text-xl text-gray-100">
              We're here to help make your stay perfect. Get in touch with us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">{info.icon}</div>
                    <h3 className="text-lg font-semibold text-hotel-blue mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-hotel-blue">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Subject of your inquiry"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          placeholder="Tell us how we can help you..."
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map & Additional Info */}
              <div className="animate-slide-up space-y-6">
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
                          Hotel Swagat is conveniently located in the heart of Saharanpur, 
                          close to major business districts and tourist attractions.
                        </p>
                      </div>
                      {/* <div>
                        <h4 className="font-semibold text-hotel-blue mb-2">Transportation</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• 15 minutes from Mumbai Airport</li>
                          <li>• 5 minutes from Central Railway Station</li>
                          <li>• Walking distance to Marine Drive</li>
                          <li>• Complimentary airport pickup available</li>
                        </ul>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-hotel-blue">Quick Reservations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Need to make a quick reservation? Call us directly or use our online booking system.
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now:+91976029901
                      </Button>
                      <Button variant="outline" className="w-full">
                        Book Online
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
