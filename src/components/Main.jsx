import { Button, Card, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/x-mart.png';

export default function MainPages() {
  const navigate = useNavigate();
  const handleRiwayatTransaksiPages = () => {
    navigate('/riwayat-transaksi');
  };
  const handleDataPages = () => {
    navigate('/data');
  };
  const handleShopPages = () => {
    navigate('/detail-customer');
  };
  return (
    <div
      className={
        'bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'
      }
    >
      <div className={'grid place-content-center mb-[10rem]'}>
        <h1 className={'place-content-center text-[49px] grid font-bold pb-8'}>
          Welcome
        </h1>
        <Card className='flex items-center justify-center py-3 w-84 bg-teal-50'>
          <Typography className='text-lg font-bold text-black'>
            X-Mart
          </Typography>
          <img src={Logo} className='size-24' />
          <Button
            onClick={handleShopPages}
            className='my-2 text-sm text-black w-[14rem] bg-teal-200'
          >
            Mulai Belanja
          </Button>
          <Button
            onClick={handleDataPages}
            className='w-[14rem] my-2 text-sm text-black bg-teal-200'
          >
            Data
          </Button>
          <Button
            onClick={handleRiwayatTransaksiPages}
            className='w-[14rem] my-2 text-sm text-black bg-teal-200'
          >
            Transaksi Customer
          </Button>
        </Card>
      </div>
    </div>
  );
}
