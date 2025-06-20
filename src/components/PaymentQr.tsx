// // import React from 'react';
// // import QRCode from 'react-qr-code';

// // interface PaymentQrProps {
// //   upiId: string;       // e.g. 'hotelswagat@bank'
// //   payeeName: string;   // e.g. 'Hotel Swagat'
// //   amount?: number;     // optional fixed amount
// //   note?: string;       // optional note
// // }

// // const PaymentQr: React.FC<PaymentQrProps> = ({ upiId, payeeName, amount, note }) => {
// //   // Build UPI link
// //   const params = new URLSearchParams({
// //     pa: upiId,
// //     pn: payeeName,
// //     cu: 'INR',
// //   });
// //   if (note) params.set('tn', note);
// //   if (amount) params.set('am', amount.toString());
// //   const upiLink = `upi://pay?${params.toString()}`;

// //   return (
// //     <div className="text-center">
// //       <div className="relative w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
// //         <QRCode value={upiLink} size={160} />
// //       </div>
// //       <p className="text-sm text-gray-600 mb-2">Scan this QR with your UPI app</p>
// //       {amount && <p className="text-lg font-semibold">Amount: ₹{amount.toLocaleString()}</p>}
// //     </div>
// //   );
// // };

// // export default PaymentQr;
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
//   if (note)       params.set('tn', note);
//   if (amount)     params.set('am', amount.toString());
//   const upiLink = `upi://pay?${params.toString()}`;

//   const handleClickToPay = () => {
//     window.location.href = upiLink;
//   };

//   return (
//     <div className="text-center">
//       <div className="relative w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
//         <QRCode value={upiLink} size={160} />
//       </div>
//       <p className="text-sm text-gray-600 mb-2">Scan this QR with your UPI app</p>
//       {amount && <p className="text-lg font-semibold mb-4">Amount: ₹{amount.toLocaleString()}</p>}
//       <button
//         onClick={handleClickToPay}
//         className="
//           inline-flex items-center justify-center
//           px-4 py-2
//           bg-primary text-white font-medium
//           rounded-md
//           hover:bg-primary/90
//           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
//           animate-pulse
//           transition
//         "
//       >
//         Or Click to Pay
//       </button>
//     </div>
//   );
// };

// export default PaymentQr;
import React from 'react';

interface UpiLinkProps {
  pa: string;   // UPI ID, e.g. "sauravrajind@axl"
  pn: string;   // Payee name, e.g. "John Doe"
  am?: number;  // optional amount
  tn?: string;  // optional transaction note
}

const buildUpiParams = (props: UpiLinkProps) => {
  const params = new URLSearchParams({
    pa: props.pa,
    pn: props.pn,
    cu: 'INR',
  });
  if (props.am) params.set('am', props.am.toString());
  if (props.tn) params.set('tn', props.tn);
  return params.toString();
};

const UpiPaymentLinks: React.FC<UpiLinkProps> = ({ pa, pn, am, tn }) => {
  const paramString = buildUpiParams({ pa, pn, am, tn });
  // Generic upi:// link
  const genericLink = `upi://pay?${paramString}`;
  // Intent links targeting specific packages:
  const phonePeIntent = `intent://pay?${paramString}#Intent;scheme=upi;package=com.phonepe.app;end`;
  const paytmIntent  = `intent://pay?${paramString}#Intent;scheme=upi;package=net.one97.paytm;end`;
  const gpayIntent   = `intent://pay?${paramString}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-700">
        Tap one of the buttons below to open the corresponding UPI app:
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={phonePeIntent}
          className="px-4 py-2 bg-purple-600 text-white rounded text-center"
        >
          Pay with PhonePe
        </a>
        <a
          href={paytmIntent}
          className="px-4 py-2 bg-indigo-600 text-white rounded text-center"
        >
          Pay with Paytm
        </a>
        <a
          href={gpayIntent}
          className="px-4 py-2 bg-blue-600 text-white rounded text-center"
        >
          Pay with Google Pay
        </a>
        {/* Generic fallback */}
        <a
          href={genericLink}
          className="px-4 py-2 bg-gray-500 text-white rounded text-center"
        >
          Open UPI App (default)
        </a>
      </div>
      <p className="text-xs text-gray-500">
        If a specific app is not installed, that link may show an error or do nothing. Use the generic “Open UPI App” or scan the QR code instead.
      </p>
    </div>
  );
};

export default UpiPaymentLinks;
