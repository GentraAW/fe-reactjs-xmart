import { Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Barang from '../fragments/Barang';
import Customer from '../fragments/Customer';
import Transaksi from '../fragments/Transaksi';

export default function DataPages() {
    const navigate = useNavigate();
    const handleMainPages = () => {
        navigate('/');
    };
    const [activeTab, setActiveTab] = useState('transaksi');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'>
            <div className='overflow-x-auto table-wrapper'>
                <Typography className='mb-5 text-3xl font-semibold text-center text-black'>
                    List Data
                </Typography>
                <div className='flex justify-center '>
                    <Button
                        className='m-10 text-gray-100 bg-black'
                        onClick={() => handleTabChange('transaksi')}
                    >
                        Transaksi
                    </Button>
                    <Button
                        className='m-10 text-gray-100 bg-black'
                        onClick={() => handleTabChange('customer')}
                    >
                        Customer
                    </Button>
                    <Button
                        className='m-10 text-gray-100 bg-black'
                        onClick={() => handleTabChange('barang')}
                    >
                        Barang
                    </Button>
                </div>
                <div className='flex justify-center'>
                    {activeTab === 'transaksi' && <Transaksi />}
                    {activeTab === 'customer' && <Customer />}
                    {activeTab === 'barang' && <Barang />}
                </div>
                <Button
                    onClick={handleMainPages}
                    className='mt-4 font-semibold text-gray-100 bg-black'
                >
                    Back
                </Button>
            </div>
        </div>
    );
}
