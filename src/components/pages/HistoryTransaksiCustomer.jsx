import { gql, useQuery } from '@apollo/client';
import { Button, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const GET_HISTORY_TRANSAKSI_CUSTOMER_POSTGRE = gql`
  query GetHistoryTransaksiCustomer($qrCode: String) {
    historyTransaksiCustomer(qrCode: $qrCode) {
      _id
      qr_code
      rfid
      nama_barang
      harga_satuan
      jumlah
      date
    }
  }
`;

export default function HistoryTransaksiCustomerPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [customerData, setCustomerData] = useState(null);
  const qrCode = customerData ? customerData.qrCode : '';
  console.log('data yang diterima2:', customerData);
  const transaksiPages = () => {
    navigate('/shop', { state: { customerData: customerData } });
  };

  const historyTransaksiPages = () => {
    navigate('/riwayat-transaksi-customer', {
      state: { customerData: customerData },
    });
  };
  const handleMainPages = () => {
    navigate('/');
  };

  useEffect(() => {
    if (location.state && location.state.customerData) {
      setCustomerData(location.state.customerData);
    }
  }, [location]);

  const { loading, error, data } = useQuery(
    GET_HISTORY_TRANSAKSI_CUSTOMER_POSTGRE,
    {
      variables: { qrCode: qrCode },
    },
  );

  if (loading)
    return (
      <div className='loading-spinner bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'>
        Loading...
      </div>
    );
  if (error) return <div className='error-message'>Error: {error.message}</div>;

  return (
    <div className='bg-[#3AAFA9] min-h-screen flex flex-col justify-center items-center'>
      <div className='absolute top-0 h-20 bg-white left-0 w-full flex justify-between bg-[#3AAFA9]'>
        <div className='flex items-center'>
          <Typography className='ml-4 font-bold text-black'>X-Mart</Typography>
          <Button
            onClick={transaksiPages}
            className='mx-2 font-semibold text-gray-100 bg-black'
          >
            Shop
          </Button>
          <Button
            onClick={historyTransaksiPages}
            className='mx-2 font-semibold text-gray-100 bg-black'
          >
            History Transaksi
          </Button>
        </div>
        <div className='flex items-center font-semibold'>
          {customerData && (
            <div className='flex '>
              <p className='mx-2 text-black bg-transparent'>
                {customerData.nama}
              </p>
            </div>
          )}
          <Button
            onClick={handleMainPages}
            className='mx-4 font-semibold text-gray-100 bg-black'
          >
            Logout
          </Button>
        </div>
      </div>
      {data.historyTransaksiCustomer.length === 0 ? (
        <div className='mb-5 text-3xl font-semibold text-white empty-data-message'>
          No transactions available.
        </div>
      ) : (
        <div className='overflow-x-auto table-wrapper'>
          <Typography className='mb-8 text-3xl font-semibold text-center text-black'>
            History Transaksi X-Mart
          </Typography>
          <div className='overflow-auto max-h-96'>
            <table className='border border-collapse border-black table-auto'>
              <thead>
                <tr className='bg-gray-400'>
                  <th className='px-4 py-2 border border-black'>No.</th>
                  <th className='px-4 py-2 border border-black'>QR Code</th>
                  <th className='px-4 py-2 border border-black'>RFID</th>
                  <th className='px-4 py-2 border border-black'>Barang</th>
                  <th className='px-4 py-2 border border-black'>
                    Harga Satuan
                  </th>
                  <th className='px-4 py-2 border border-black'>Jumlah</th>
                  <th className='px-4 py-2 border border-black'>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.historyTransaksiCustomer.map(
                  (historyTransaksiCustomer, index) => (
                    <tr
                      key={historyTransaksiCustomer._id}
                      className='bg-gray-50'
                    >
                      <td className='px-4 py-2 border border-black'>
                        {index + 1}
                      </td>
                      <td className='px-4 py-2 border border-black'>
                        {historyTransaksiCustomer.qr_code}
                      </td>
                      <td className='px-4 py-2 border border-black'>
                        {historyTransaksiCustomer.rfid}
                      </td>
                      <td className='px-4 py-2 border border-black'>
                        {historyTransaksiCustomer.nama_barang}
                      </td>
                      <td className='px-4 py-2 border border-black'>
                        {historyTransaksiCustomer.harga_satuan}
                      </td>
                      <td className='px-4 py-2 border border-black'>
                        {historyTransaksiCustomer.jumlah}
                      </td>
                      <td className='px-4 py-2 border border-black'>
                        {historyTransaksiCustomer.date}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
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
