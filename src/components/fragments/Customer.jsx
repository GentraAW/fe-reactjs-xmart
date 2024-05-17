import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';

export default function Customer() {
  const [dataCustomer, setDataCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/customer/get-all',
        );
        setDataCustomer(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=''>
      <Typography className='mb-1 font-medium text-center text-black text-5'>
        Data Customer
      </Typography>
      <table className='border border-collapse border-black table-auto'>
        <thead>
          <tr className='bg-gray-400'>
            <th className='px-4 py-2 border border-black'>No.</th>
            <th className='px-4 py-2 border border-black'>QRCode</th>
            <th className='px-4 py-2 border border-black'>Nama</th>
            <th className='px-4 py-2 border border-black'>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {dataCustomer.map((customer, index) => (
            <tr key={index} className='bg-gray-50'>
              <td className='px-4 py-2 border border-black'>{index + 1}</td>
              <td className='px-4 py-2 border border-black'>
                {customer.qrCode}
              </td>
              <td className='px-4 py-2 border border-black'>{customer.nama}</td>
              <td className='px-4 py-2 border border-black'>
                {customer.wallet}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
