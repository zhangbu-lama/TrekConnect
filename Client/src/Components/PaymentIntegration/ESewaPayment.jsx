import React from 'react';
import CryptoJS from 'crypto-js';

const ESewaPayment = () => {
  const handlePayment = () => {
    const total_amount = '100';
    const transaction_uuid = 'txn1234567890';
    const product_code = 'EPAYTEST';
    const signed_field_names = 'total_amount,transaction_uuid,product_code';
    const signed_data = `${total_amount},${transaction_uuid},${product_code}`;
    const secret = '8gBm/ulzjrU='; // UAT secret key (DON'T expose in production)

    const signature = CryptoJS.HmacSHA256(signed_data, secret);
    const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);

    // Create and submit form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

    const fields = {
      amount: '100',
      tax_amount: '0',
      total_amount,
      transaction_uuid,
      product_code,
      product_service_charge: '0',
      product_delivery_charge: '0',
      success_url: 'http://localhost:5173/success',
      failure_url: 'http://localhost:5173/failed',
      signed_field_names,
      signature: signatureBase64,
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
      >
        Pay with eSewa
      </button>
    </div>
  );
};

export default ESewaPayment;
