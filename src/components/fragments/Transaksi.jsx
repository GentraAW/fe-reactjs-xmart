import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';

export default function Transaksi() {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/transaksi/get-all',
        );
        setDataTransaksi(response.data);
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
        Data Transaksi
      </Typography>
      <div className='overflow-auto max-h-96'>
        <table className='border border-collapse border-black table-auto'>
          <thead>
            <tr className='bg-gray-400'>
              <th className='px-4 py-2 border border-black'>No.</th>
              <th className='px-4 py-2 border border-black'>Transaksi ID</th>
              <th className='px-4 py-2 border border-black'>QRCode</th>
              <th className='px-4 py-2 border border-black'>RFID</th>
              <th className='px-4 py-2 border border-black'>Nama Barang</th>
              <th className='px-4 py-2 border border-black'>Harga</th>
              <th className='px-4 py-2 border border-black'>Jumlah</th>
              <th className='px-4 py-2 border border-black'>Date</th>
            </tr>
          </thead>
          <tbody>
            {dataTransaksi.map((transaksi, index) => (
              <tr key={index} className='bg-gray-50'>
                <td className='px-4 py-2 border border-black'>{index + 1}</td>
                <td className='px-4 py-2 border border-black'>
                  {transaksi.transaksiId}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaksi.qrCode}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaksi.rfid}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaksi.namaBarang}
                </td>
                <td className='px-4 py-2 border border-black'>
                  Rp.{transaksi.hargaSatuan}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaksi.jumlah}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaksi.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
