import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: `"Exceptional service and beautiful rooms. Hotel Swagat truly lives up to its reputation. The staff was incredibly helpful and the breakfast was delicious. Will definitely return!"`,
    name: "Priya Sharma",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=60&h=60&fit=crop&crop=face",
  },
  {
    text: `"Loved the ambiance and hospitality. Rooms were neat and clean. Staff behavior was excellent."`,
    name: "Amit Patel",
    location: "Agra",
    image:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=60&h=60&fit=crop&crop=face",
  },
  {
    text: `"The food was excellent, and the service was top-notch. Truly a home away from home!"`,
    name: "Neha Gupta",
    location: "Kolkata",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&crop=face",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 1000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h2 className="text-3xl font-bold text-hotel-blue mb-8">What Our Guests Say</h2>

          <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden transition-all duration-700 ease-in-out transform animate-fade-in">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-hotel-gold text-hotel-gold"
                />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 mb-6 italic transition-opacity duration-500">
              {testimonial.text}
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-hotel-blue">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
