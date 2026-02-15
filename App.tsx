import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Finance from './components/Finance';
import Sales from './components/Sales';
import AIAnalyst from './components/AIAnalyst';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.PROJECTS:
        return <Projects />;
      case ViewState.FINANCE:
        return <Finance />;
      case ViewState.SALES:
        return <Sales />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout currentView={currentView} onNavigate={setCurrentView}>
        {renderView()}
      </Layout>
      <AIAnalyst />
    </>
  );
};

export default App;