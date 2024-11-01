import React, { useState } from 'react';
import LoginPage from './LoginPage';
import TenantLogin from './TenantLogin';
import AdminLogin from './AdminLogin';

function App() {
    const [userType, setUserType] = useState(null);

    const handleSelectUserType = (type) => {
        setUserType(type);
    };

    const handleBack = () => {
        setUserType(null);
    };

    return (
        <div>
            {userType === 'tenant' && <TenantLogin onBack={handleBack} />}
            {userType === 'admin' && <AdminLogin onBack={handleBack} />}
            {!userType && <LoginPage onSelectUserType={handleSelectUserType} />}
        </div>
    );
}

export default App;
