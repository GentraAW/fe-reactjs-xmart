import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(true); // Status scanner aktif atau tidak
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (scanning && data) {
      setResult(data);
      setScanning(false); // Menonaktifkan scanning setelah berhasil
      axios
        .get(`http://localhost:8080/customer/${data}`)
        .then((response) => {
          console.log('data yang dikirim dari qrScanner:', response.data);
          // Navigasi ke /shop dan meneruskan data customer ke dalam state location
          navigate('/shop', { state: { customerData: response.data } });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setScanning(true); // Mengaktifkan scanning kembali jika terjadi error
        });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Scanner
        onResult={(result) => handleScan(result)}
        onError={(error) => handleError(error)}
      />
      <p>{result}</p>
    </div>
  );
};

export default QRScanner;
