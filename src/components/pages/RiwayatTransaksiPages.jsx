import { gql, useQuery } from '@apollo/client';
import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

// Definisikan query GraphQL
const GET_TRANSAKSI_MONGO = gql`
  query GetTransaksi {
    transaksi {
      _id
      qr_code
      rfid
      harga_satuan
      jumlah
      date
    }
  }
`;

export default function RiwayatTransaksiPages() {
  const navigate = useNavigate();
  const handleMainPages = () => {
    navigate('/');
  };

  const { loading, error, data } = useQuery(GET_TRANSAKSI_MONGO);

  if (loading)
    return (
      <div className='loading-spinner bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'>
        Loading...
      </div>
    );
  if (error) return <div className='error-message'>Error: {error.message}</div>;

  return (
    <div className='bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'>
      {data.transaksi.length === 0 ? (
        <div className='mb-5 text-3xl font-semibold text-white empty-data-message'>
          Belum ada transaksi.
        </div>
      ) : (
        <div className='overflow-x-auto table-wrapper'>
          <Typography className='mb-5 text-3xl font-semibold text-center text-black'>
            Riwayat Transaksi
          </Typography>
          <table className='border border-collapse border-black table-auto'>
            <thead>
              <tr className='bg-gray-400'>
                <th className='px-4 py-2 border border-black'>No.</th>
                <th className='px-4 py-2 border border-black'>Transaksi ID</th>
                <th className='px-4 py-2 border border-black'>QR Code</th>
                <th className='px-4 py-2 border border-black'>RFID</th>
                <th className='px-4 py-2 border border-black'>Harga Satuan</th>
                <th className='px-4 py-2 border border-black'>Jumlah</th>
                <th className='px-4 py-2 border border-black'>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.transaksi.map((transaksi, index) => (
                <tr key={transaksi._id} className='bg-gray-50'>
                  <td className='px-4 py-2 border border-black'>{index + 1}</td>
                  <td className='px-4 py-2 border border-black'>
                    {transaksi._id}
                  </td>
                  <td className='px-4 py-2 border border-black'>
                    {transaksi.qr_code}
                  </td>
                  <td className='px-4 py-2 border border-black'>
                    {transaksi.rfid}
                  </td>
                  <td className='px-4 py-2 border border-black'>
                    {transaksi.harga_satuan}
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

          <Button
            onClick={handleMainPages}
            className='mt-4 font-semibold text-gray-100 bg-black'
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
