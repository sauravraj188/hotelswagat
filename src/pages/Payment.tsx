
// src/pages/Payment.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, CreditCard, Smartphone, Banknote, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import PaymentQr from '@/components/PaymentQr';
import api from '@/api/client';
import ImageUploader from '@/components/ImageUploader';
import { useForm, FormProvider } from 'react-hook-form';

// Spinner for buttons
const Spinner: React.FC = () => (
  <svg
    className="w-5 h-5 text-white animate-spin"
    viewBox="0 0 50 50"
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="31.415, 31.415"
    />
  </svg>
);

interface StoredBooking {
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
}

interface ImageForm {
  imageUrl: string;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<StoredBooking | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'direct' | null>(null);
  const [directPaymentType, setDirectPaymentType] = useState<'card' | 'upi' | 'cash' | null>(null);

  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // React Hook Form for image upload
  const imageFormMethods = useForm<ImageForm>({ defaultValues: { imageUrl: '' } });

  // Direct payment form data
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    upiId: '',
  });

  // Read bookingData on mount
  useEffect(() => {
    const raw = localStorage.getItem('bookingData');
    if (!raw) {
      toast.error('No booking data found');
      navigate('/rooms');
      return;
    }
    setBookingData(JSON.parse(raw));
  }, [navigate]);

  if (!bookingData) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  // Compute nights, subtotal, taxes & total
  const nights = Math.max(
    0,
    Math.ceil(
      (new Date(bookingData.checkOut).getTime() -
        new Date(bookingData.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );
  const subtotal = nights * bookingData.price;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Customer details form JSX
 
  // QR payment submit: upload screenshot via ImageUploader's form state
  const handleQRPaymentSubmit = async () => {
    // validate customer details
    
    const imageUrl = imageFormMethods.getValues('imageUrl');
    if (!imageUrl) {
      toast.error('Please upload payment screenshot');
      return;
    }
    // Create booking with paymentScreenshot
    try {
      const payload = {
        ...bookingData,
        paymentScreenshot: imageUrl,
      };
      await api.post('/bookings', payload);
      localStorage.removeItem('bookingData');
      toast.success('Payment submitted! Booking pending verification.');
      navigate('/booking-history');
    } catch (err: any) {
      console.error('Booking creation failed:', err);
      toast.error(err.message || 'Failed to create booking');
    }
  };

  // Direct payment submit
  const handleDirectPaymentSubmit = async () => {
    
    if (directPaymentType === 'card') {
      const { cardNumber, expiryDate, cvv, cardHolder } = formData;
      if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
        toast.error('Please fill all card details');
        return;
      }
      // Integrate real payment if available; else assume success
    } else if (directPaymentType === 'upi') {
      if (!formData.upiId) {
        toast.error('Please enter UPI ID');
        return;
      }
      // Real UPI integration omitted
    }
    // Create booking without screenshot; paymentStatus remains pending or handle as paid if desired
    try {
      const payload: any = {
        ...bookingData
      };
      await api.post('/bookings', payload);
      localStorage.removeItem('bookingData');
      toast.success('Booking created! We will confirm shortly.');
      navigate('/booking-history');
    } catch (err: any) {
      console.error('Booking creation failed:', err);
      toast.error(err.message || 'Failed to create booking');
    }
  };

  // Initial choose payment method
  if (!paymentMethod) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Choose Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card
                    className="cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => setPaymentMethod('qr')}
                  >
                    <CardContent className="p-6 text-center">
                      <QrCode className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-lg font-semibold mb-2">Payment through QR</h3>
                      <p className="text-gray-600 text-sm">Scan QR, pay and upload screenshot</p>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => setPaymentMethod('direct')}
                  >
                    <CardContent className="p-6 text-center">
                      <CreditCard className="w-12 h-12 mx-auto mb-4 text-green-600" />
                      <h3 className="text-lg font-semibold mb-2">Direct Payment</h3>
                      <p className="text-gray-600 text-sm">Card, UPI, or Cash</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // QR payment screen
  if (paymentMethod === 'qr') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setPaymentMethod(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">QR Code Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <PaymentQr
                  upiId="sauravrajind@axl"
                  payeeName="Hotel Swagat"
                  amount={total}
                  note="Hotel Booking"
                />
                
                <FormProvider {...imageFormMethods}>
                  <ImageUploader />
                </FormProvider>
                <Button
                  onClick={handleQRPaymentSubmit}
                  className="w-full flex justify-center items-center"
                  disabled={!imageFormMethods.watch('imageUrl')}
                >
                  Submit Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Choose direct payment type
  if (paymentMethod === 'direct' && !directPaymentType) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setPaymentMethod(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Choose Direct Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card
                    className="cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => setDirectPaymentType('card')}
                  >
                    <CardContent className="p-4 text-center">
                      <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">Debit/Credit Card</p>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => setDirectPaymentType('upi')}
                  >
                    <CardContent className="p-4 text-center">
                      <Smartphone className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium">UPI</p>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => setDirectPaymentType('cash')}
                  >
                    <CardContent className="p-4 text-center">
                      <Banknote className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <p className="text-sm font-medium">Cash</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Direct payment form
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setDirectPaymentType(null)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {directPaymentType === 'card' && 'Card Payment'}
                {directPaymentType === 'upi' && 'UPI Payment'}
                {directPaymentType === 'cash' && 'Cash Payment'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center mb-4">
                <p className="text-lg font-semibold">Amount: ₹{total}</p>
              </div>
              {/* <CustomerDetailsForm /> */}
              {directPaymentType === 'card' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardHolder">Cardholder Name</Label>
                    <Input
                      id="cardHolder"
                      name="cardHolder"
                      placeholder="John Doe"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {directPaymentType === 'upi' && (
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    name="upiId"
                    placeholder="yourname@bank"
                    value={formData.upiId}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              {directPaymentType === 'cash' && (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please pay cash at reception</p>
                  <p className="text-sm text-gray-500">Booking confirmed upon payment</p>
                </div>
              )}
              <Button
                onClick={handleDirectPaymentSubmit}
                className="w-full flex justify-center items-center"
              >
                {directPaymentType === 'cash' ? 'Confirm Booking' : 'Pay Now'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
