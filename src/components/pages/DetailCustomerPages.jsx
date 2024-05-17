import { Button, Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../elements/QrScanner';

export default function DetailCustomerPages() {
  const [dataCustomer, setDataCustomer] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleMainPages = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/customer/get-all',
        );
        setDataCustomer(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleScan = (data) => {
    if (data) {
      fetch(`http://localhost:8080/customer/${data}`)
        .then((response) => {
          if (response.ok) {
            alert('Data berhasil');
          } else {
            alert('Data tidak valid');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert('Tidak ada data yang dipindai');
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='bg-[#3AAFA9] min-h-screen flex flex-col'>
      {/* Left side content */}
      <div className='flex'>
        <div className='flex flex-col w-2/3'>
          <div className='flex items-center justify-center pt-44'>
            <Typography className='text-xl font-semibold'>
              Detail Customer
            </Typography>
          </div>
          <div className='flex flex-wrap justify-center mt-10'>
            {dataCustomer.map((customer, index) => (
              <Card
                key={index}
                className='flex items-center justify-center w-56 py-5 mx-10 my-6 bg-teal-100'
              >
                <Typography>QRCode:</Typography>
                <Typography className='font-medium'>
                  {customer.qrCode}
                </Typography>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${customer.qrCode}`}
                  alt={customer.qrCode}
                  className='mt-3 mb-3'
                />
                <Typography>Nama Customer:</Typography>
                <Typography className='font-medium'>{customer.nama}</Typography>
                <Typography className='mt-2'>Wallet:</Typography>
                <Typography className='font-medium'>
                  Rp.{customer.wallet}
                </Typography>
              </Card>
            ))}
          </div>
          <div className='flex justify-start mx-[15rem] mt-8'>
            <Button
              onClick={handleMainPages}
              className='mt-4 font-semibold text-gray-100 bg-black'
            >
              Back
            </Button>
          </div>
        </div>
        {/* Separator */}
        <div className='w-1 h-full bg-black'></div>

        <div className='flex flex-col w-[30rem] pt-60 mx-5'>
          <QRScanner onScan={handleScan} />
        </div>
      </div>
    </div>
  );
}
