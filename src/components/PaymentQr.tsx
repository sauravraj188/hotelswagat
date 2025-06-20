// import React from 'react';
// import QRCode from 'react-qr-code';

// interface PaymentQrProps {
//   upiId: string;       // e.g. 'hotelswagat@bank'
//   payeeName: string;   // e.g. 'Hotel Swagat'
//   amount?: number;     // optional fixed amount
//   note?: string;       // optional note
// }

// const PaymentQr: React.FC<PaymentQrProps> = ({ upiId, payeeName, amount, note }) => {
//   // Build UPI link
//   const params = new URLSearchParams({
//     pa: upiId,
//     pn: payeeName,
//     cu: 'INR',
//   });
//   if (note) params.set('tn', note);
//   if (amount) params.set('am', amount.toString());
//   const upiLink = `upi://pay?${params.toString()}`;

//   return (
//     <div className="text-center">
//       <div className="relative w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
//         <QRCode value={upiLink} size={160} />
//       </div>
//       <p className="text-sm text-gray-600 mb-2">Scan this QR with your UPI app</p>
//       {amount && <p className="text-lg font-semibold">Amount: ₹{amount.toLocaleString()}</p>}
//     </div>
//   );
// };

// export default PaymentQr;
import React from 'react';
import QRCode from 'react-qr-code';

interface PaymentQrProps {
  upiId: string;       // e.g. 'hotelswagat@bank'
  payeeName: string;   // e.g. 'Hotel Swagat'
  amount?: number;     // optional fixed amount
  note?: string;       // optional note
}

const PaymentQr: React.FC<PaymentQrProps> = ({ upiId, payeeName, amount, note }) => {
  // Build UPI link
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName,
    cu: 'INR',
  });
  if (note)       params.set('tn', note);
  if (amount)     params.set('am', amount.toString());
  const upiLink = `upi://pay?${params.toString()}`;

  const handleClickToPay = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
        <QRCode value={upiLink} size={160} />
      </div>
      <p className="text-sm text-gray-600 mb-2">Scan this QR with your UPI app</p>
      {amount && <p className="text-lg font-semibold mb-4">Amount: ₹{amount.toLocaleString()}</p>}
      <button
        onClick={handleClickToPay}
        className="
          inline-flex items-center justify-center
          px-4 py-2
          bg-primary text-white font-medium
          rounded-md
          hover:bg-primary/90
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          animate-pulse
          transition
        "
      >
        Or Click to Pay
      </button>
    </div>
  );
};

export default PaymentQr;
