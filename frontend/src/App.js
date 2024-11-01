import React, { useState } from 'react';
import LoginPage from './LoginPage';
import TenantLogin from './TenantLogin';
import AdminLogin from './AdminLogin';
import TenantSignup from './TenantSignup';

function App() {
    const [page, setPage] = useState('main');

    const handleSelectUserType = (type) => {
        setPage(type === 'tenant' ? 'tenantLogin' : 'adminLogin');
    };

    const handleBackToMain = () => {
        setPage('main');
    };

    const handleSignup = () => {
        setPage('tenantSignup');
    };

    return (
        <div>
            {page === 'main' && <LoginPage onSelectUserType={handleSelectUserType} />}
            {page === 'tenantLogin' && <TenantLogin onBack={handleBackToMain} onSignup={handleSignup} />}
            {page === 'adminLogin' && <AdminLogin onBack={handleBackToMain} />}
            {page === 'tenantSignup' && <TenantSignup onBack={() => setPage('tenantLogin')} />}
        </div>
    );
}

export default App;
