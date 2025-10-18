import { useState } from "react";
import type { User } from "./types";
import KioskHome from "./components/kiosk/KioskHome";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import Dashboard from "./components/Dashboard";
import ProductAdmin from "./components/products/ProductAdmin";
import UserList from "./components/users/UserList";
import TransactionList from "./components/transactions/TransactionList";
import Autocobro from "./components/autocobro/Autocobro";
import "./App.css";

type AppScreen = 'home' | 'shop' | 'dashboard' | 'products' | 'users' | 'transactions';
type ModalType = 'login' | 'register' | 'admin' | null;

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleKioskNavigation = (action: 'shop' | 'login' | 'register' | 'admin') => {
    switch (action) {
      case 'shop':
        setCurrentScreen('shop');
        break;
      case 'login':
        setActiveModal('login');
        break;
      case 'register':
        setActiveModal('register');
        break;
      case 'admin':
        setActiveModal('admin');
        break;
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setActiveModal(null);
    if (userData.role === 'admin') {
      setCurrentScreen('dashboard');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleRegister = (userData: User) => {
    setUser(userData);
    setActiveModal(null);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleNavigation = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <KioskHome onNavigate={handleKioskNavigation} />;
      
      case 'shop':
        return <Autocobro onBack={() => setCurrentScreen('home')} />;
      
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        );
      
      case 'products':
        return (
          <ProductAdmin
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      case 'users':
        return (
          <UserList
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      case 'transactions':
        return (
          <TransactionList
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      default:
        return <KioskHome onNavigate={handleKioskNavigation} />;
    }
  };

  const renderModal = () => {
    switch (activeModal) {
      case 'login':
        return (
          <LoginModal
            isOpen={true}
            onClose={closeModal}
            onLogin={handleLogin}
            onSwitchToRegister={() => setActiveModal('register')}
            adminMode={false}
          />
        );
      
      case 'register':
        return (
          <RegisterModal
            isOpen={true}
            onClose={closeModal}
            onRegister={handleRegister}
            onSwitchToLogin={() => setActiveModal('login')}
          />
        );
      
      case 'admin':
        return (
          <LoginModal
            isOpen={true}
            onClose={closeModal}
            onLogin={handleLogin}
            onSwitchToRegister={() => setActiveModal('register')}
            adminMode={true}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
      {renderModal()}
    </div>
  );
}

export default App;
