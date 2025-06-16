
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, CreditCard, Smartphone, Banknote, Upload, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'direct' | null>(null);
  const [directPaymentType, setDirectPaymentType] = useState<'card' | 'upi' | 'cash' | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    upiId: '',
    phoneNumber: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleQRPaymentSubmit = () => {
    if (!screenshot) {
      toast.error('Please upload payment screenshot');
      return;
    }
    toast.success('Payment submitted successfully! We will verify and confirm your booking.');
    navigate('/booking-history');
  };

  const handleDirectPaymentSubmit = () => {
    if (directPaymentType === 'card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardHolder) {
        toast.error('Please fill all card details');
        return;
      }
    } else if (directPaymentType === 'upi' && !formData.upiId) {
      toast.error('Please enter UPI ID');
      return;
    }
    
    toast.success('Payment processed successfully!');
    navigate('/booking-history');
  };

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
                      <p className="text-gray-600 text-sm">Scan QR code, pay and upload screenshot</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => setPaymentMethod('direct')}
                  >
                    <CardContent className="p-6 text-center">
                      <CreditCard className="w-12 h-12 mx-auto mb-4 text-green-600" />
                      <h3 className="text-lg font-semibold mb-2">Direct Payment</h3>
                      <p className="text-gray-600 text-sm">Card, UPI, or Cash payment</p>
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
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <QrCode className="w-24 h-24 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Scan this QR code with your payment app</p>
                  <p className="text-lg font-semibold">Amount: ₹12,000</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
                    <Input
                      id="screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="mt-1"
                    />
                  </div>
                  
                  {screenshot && (
                    <div className="text-sm text-green-600">
                      Screenshot uploaded: {screenshot.name}
                    </div>
                  )}

                  <Button 
                    onClick={handleQRPaymentSubmit} 
                    className="w-full"
                    disabled={!screenshot}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

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

                  <Card 
                    className="cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => setDirectPaymentType('upi')}
                  >
                    <CardContent className="p-4 text-center">
                      <QrCode className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">UPI QR Code</p>
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
            <CardContent className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-lg font-semibold">Amount: ₹12,000</p>
              </div>

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
                    placeholder="yourname@paytm"
                    value={formData.upiId}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {directPaymentType === 'cash' && (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please pay cash at the hotel reception</p>
                  <p className="text-sm text-gray-500">Your booking will be confirmed upon cash payment</p>
                </div>
              )}

              <Button 
                onClick={handleDirectPaymentSubmit} 
                className="w-full"
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
