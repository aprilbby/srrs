import React, { useState } from 'react';
import LoginPage from './LoginPage';
import TenantLogin from './TenantLogin';
import AdminLogin from './AdminLogin';
import TenantSignup from './TenantSignup';
import TenantHome from './TenantHome';

function App() {
    const [page, setPage] = useState('main');
    const [user, setUser] = useState(null);

    const handleSelectUserType = (type) => {
        setPage(type === 'tenant' ? 'tenantLogin' : 'adminLogin');
    };

    const handleBackToMain = () => {
        setPage('main');
    };

    const handleSignupSuccess = (userData) => {
        setUser(userData);
        setPage('tenantHome');
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setPage('tenantHome');
    };

    return (
        <div>
            {page === 'main' && <LoginPage onSelectUserType={handleSelectUserType} />}
            {page === 'tenantLogin' && <TenantLogin onBack={handleBackToMain} onSignup={() => setPage('tenantSignup')} onLoginSuccess={handleLoginSuccess} />}
            {page === 'tenantSignup' && <TenantSignup onBack={() => setPage('tenantLogin')} onSignupSuccess={handleSignupSuccess} />}
            {page === 'tenantHome' && <TenantHome user={user} />}
        </div>
    );
}

export default App;
