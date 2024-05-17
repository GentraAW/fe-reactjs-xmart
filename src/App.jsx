import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPages from './components/Main.jsx';
import QrCode from './components/elements/QrCode.jsx';
import DataPages from './components/pages/DataPages.jsx';
import DetailCustomerPages from './components/pages/DetailCustomerPages.jsx';
import HistoryTransaksiCustomerPages from './components/pages/HistoryTransaksiCustomer.jsx';
import QRPages from './components/pages/QRPages.jsx';
import RiwayatTransaksiPages from './components/pages/RiwayatTransaksiPages.jsx';
import ShopPages from './components/pages/ShopPages.jsx';

const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql',
    cache: new InMemoryCache(),
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path='/' element={<MainPages />} />
                    <Route
                        path='riwayat-transaksi'
                        element={<RiwayatTransaksiPages />}
                    />
                    <Route path='data' element={<DataPages />} />
                    <Route
                        path='detail-customer'
                        element={<DetailCustomerPages />}
                    />
                    <Route path='qrcode' element={<QrCode />} />
                    <Route path='scanner' element={<QRPages />} />
                    <Route path='shop' element={<ShopPages />} />
                    <Route
                        path='riwayat-transaksi-customer'
                        element={<HistoryTransaksiCustomerPages />}
                    />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}
