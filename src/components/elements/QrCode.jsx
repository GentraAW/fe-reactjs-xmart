import { Typography } from '@material-tailwind/react'; // Pastikan path import sesuai dengan lokasi QRScanner.js
import React from 'react';

export default function QrCode(props) {
  const { nama, qrCode } = props;
  return (
    <div className='bg-[#4fc062] min-h-screen'>
      <div className='flex justify-center font-bold pt-52'>
        <Typography className='font-bold'>QrCode Customer</Typography>
      </div>

      <div className='flex justify-center mt-4'>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrCode}`}
          alt={qrCode}
          className='qr-code'
        />
      </div>
    </div>
  );
}
