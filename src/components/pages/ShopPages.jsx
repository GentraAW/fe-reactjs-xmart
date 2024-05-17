import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Typography, Card } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Shirt from '../../assets/shirt.png';
import Cart from '../../assets/cart.png';

const GET_HISTORY_TRANSAKSI_CUSTOMER_REDIS = gql`
  query GetHistoryTransaksiCustomer($qrCode: String) {
    transaksiByQRCode(qr_code: $qrCode) {
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

const EDIT_JUMLAH_TRANSAKSI = gql`
  mutation EditJumlahTransaksi($id: ID!, $jumlah: Int!) {
    editJumlahTransaksi(_id: $id, jumlah: $jumlah) {
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

const ADD_TO_CART = gql`
  mutation CreateTransaksi(
    $qrCode: String!
    $rfid: String!
    $namaBarang: String!
    $hargaSatuan: Int!
    $jumlah: Int!
  ) {
    createTransaksi(
      qr_code: $qrCode
      rfid: $rfid
      nama_barang: $namaBarang
      harga_satuan: $hargaSatuan
      jumlah: $jumlah
    ) {
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

export default function ShopPages() {
  const [dataBarang, setDataBarang] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [deletedSuccess, setDeletedSuccess] = useState(false);
  const [editJumlahTransaksi] = useMutation(EDIT_JUMLAH_TRANSAKSI);
  const [createTransaksi, { loading: loadingAddToCart }] =
    useMutation(ADD_TO_CART);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/barang/get-all',
        );
        setDataBarang(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (barang) => {
    const { rfid, namaBarang, hargaSatuan } = barang;

    const transaksiData = {
      qrCode: customerData.qrCode,
      rfid: rfid,
      namaBarang: namaBarang,
      hargaSatuan: hargaSatuan,
      jumlah: 1,
    };

    console.log('Data yang akan dikirim ke createTransaksi:', transaksiData);

    try {
      await createTransaksi({
        variables: {
          qrCode: customerData.qrCode,
          rfid: rfid,
          namaBarang: namaBarang,
          hargaSatuan: hargaSatuan,
          jumlah: 1,
        },
      });
      console.log('Transaksi berhasil ditambahkan ke keranjang!');
      window.location.reload();
    } catch (error) {
      console.error('Error add transaksi:', error);
    }
  };

  const handleTambahJumlah = async (id, currentJumlah) => {
    try {
      await editJumlahTransaksi({
        variables: { id: id, jumlah: parseInt(currentJumlah, 10) + 1 },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating jumlah transaksi:', error);
    }
  };

  const handleKurangiJumlah = async (id, currentJumlah) => {
    try {
      await editJumlahTransaksi({
        variables: { id: id, jumlah: parseInt(currentJumlah, 10) - 1 },
      });

      window.location.reload();
    } catch (error) {
      console.error('Error updating jumlah transaksi:', error);
    }
  };

  const handleSimpanTransaksi = async () => {
    try {
      await axios.get(
        `http://localhost:3333/transfer-data/${customerData.qrCode}`,
      );
      navigate('/riwayat-transaksi-customer', {
        state: { customerData: customerData },
      });
      alert('Simpan Berhasil');
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleMainPages = () => {
    navigate('/');
  };

  const transaksiPages = () => {
    navigate('/shop', { state: { customerData: customerData } });
  };

  const historyTransaksiPages = () => {
    navigate('/riwayat-transaksi-customer', {
      state: { customerData: customerData },
    });
  };

  useEffect(() => {
    if (location.state && location.state.customerData) {
      setCustomerData(location.state.customerData);
    }
  }, [location]);

  useEffect(() => {
    if (deletedSuccess) {
      window.location.reload();
    }
  }, [deletedSuccess]);

  const handleDeleteTransaksi = async (transaksiId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/delete-cart/${transaksiId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        setDeletedSuccess(true);
      } else {
        console.error('Failed to delete transaksi');
      }
    } catch (error) {
      console.error('Error deleting transaksi:', error);
    }
  };

  let qrCode = '';
  if (customerData && customerData.qrCode) {
    qrCode = customerData.qrCode;
  }
  const { loading, error, data } = useQuery(
    GET_HISTORY_TRANSAKSI_CUSTOMER_REDIS,
    {
      variables: { qrCode: qrCode },
    },
  );

  if (loading)
    return (
      <div className='loading-spinner bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'></div>
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

      <div className='flex mt-[5rem] justify-center items-center'>
        <div className=' w-5/5'>
          <div className='flex justify-center p-3 '>
            {dataBarang.map((barang, index) => (
              <Button
                key={index}
                className='mx-2 text-black bg-[#3ebbb5] p-0 '
                onClick={() => handleAddToCart(barang)}
              >
                <Card className='flex-grow bg-white '>
                  <img src={Shirt} className='mt-2 size-40' />
                  <div className='text-lg'>
                    <p>{barang.namaBarang}</p>
                    <p className='mb-2'>Rp.{barang.hargaSatuan}</p>
                  </div>
                </Card>
                <div className='flex justify-center my-2 text-sm text-white'>
                  <div className='flex items-center '>
                    <img src={Cart} className='size-5' />
                    <Typography className='ml-1 text-sm font-medium'>
                      tambah
                    </Typography>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className='w-5/5'>
          <div className='flex justify-center p-3 mt-3 ml-2 overflow-auto bg-white min-h-64 max-h-[35rem] '>
            {data.transaksiByQRCode.length === 0 ? (
              <div className='mb-5 text-lg font-semibold text-black empty-data-message'>
                Belum Ada Transaksi di Cart.
              </div>
            ) : (
              <div className='overflow-x-auto table-wrapper'>
                <Typography className='flex justify-center mb-2 text-xl font-bold'>
                  Cart
                </Typography>

                <table className='min-w-full'>
                  <thead>
                    <tr>
                      <th className='p-2 text-center'>RFID</th>
                      <th className='p-2 text-center'>Barang</th>
                      <th className='p-2 text-center'>Harga</th>
                      <th className='p-2 text-center'>Jumlah</th>
                      <th className='p-2 text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.transaksiByQRCode.map((transaksiByQRCode) => (
                      <tr
                        key={transaksiByQRCode._id}
                        className='bg-blue-gray-50'
                      >
                        <td className='text-center'>
                          {transaksiByQRCode.rfid}
                        </td>
                        <td className='text-center'>
                          {transaksiByQRCode.nama_barang}
                        </td>
                        <td className='text-center'>
                          {transaksiByQRCode.harga_satuan}
                        </td>
                        <td className='text-center'>
                          {transaksiByQRCode.jumlah}
                        </td>
                        <Button
                          onClick={() =>
                            handleKurangiJumlah(
                              transaksiByQRCode._id,
                              transaksiByQRCode.jumlah,
                            )
                          }
                          className='text-black bg-transparent'
                        >
                          -
                        </Button>
                        <Button
                          onClick={() =>
                            handleTambahJumlah(
                              transaksiByQRCode._id,
                              transaksiByQRCode.jumlah,
                            )
                          }
                          className='text-black bg-transparent'
                        >
                          +
                        </Button>

                        <td>
                          <Button
                            onClick={() =>
                              handleDeleteTransaksi(transaksiByQRCode._id)
                            }
                            className='text-red-400 bg-transparent'
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  className='mt-4'
                  onClick={handleSimpanTransaksi}
                  disabled={loadingAddToCart}
                >
                  Simpan Transaksi
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
