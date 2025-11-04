import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
import MenuManagement from '../menu/MenuManagement';
import TemplateBuilder from '../templates/TemplateBuilder';
import QRGenerator from '../qr/QRGenerator';
import BillingSystem from '../billing/BillingSystem';
import ReservationSystem from '../reservations/ReservationSystem';
import SalesReports from '../reports/SalesReports';
import ProfitCalculator from '../reports/ProfitCalculator';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'menu':
        return <MenuManagement />;
      case 'templates':
        return <TemplateBuilder />;
      case 'qr':
        return <QRGenerator />;
      case 'billing':
        return <BillingSystem />;
      case 'reservations':
        return <ReservationSystem />;
      case 'reports':
        return <SalesReports />;
      case 'profit':
        return <ProfitCalculator />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Section */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Dashboard Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <Header user={user} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
