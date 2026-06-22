import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import DoctorDashboard from './pages/DoctorDashboard';

const API_URL = 'http://localhost:5000';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dbMode, setDbMode] = useState('local-json-fallback');
  const [reports, setReports] = useState([]);
  const [backendOnline, setBackendOnline] = useState(false);
  const [isAiConnected, setIsAiConnected] = useState(false);
  const [speechEngine, setSpeechEngine] = useState('Browser Speech Recognition');
  const [translationEngine, setTranslationEngine] = useState('Gemini');

  // Fetch initial health and consultations from server
  useEffect(() => {
    const fetchServerInfo = async () => {
      try {
        // Fetch database status
        const healthRes = await fetch(`${API_URL}/api/health`);
        if (healthRes.ok) {
          const healthData = await healthRes.json();
          setDbMode(healthData.database);
          setIsAiConnected(!!healthData.aiConnected);
          setSpeechEngine(healthData.speechEngine || 'Browser Speech Recognition');
          setTranslationEngine(healthData.translationEngine || 'Gemini');
          setBackendOnline(true);
        } else {
          setBackendOnline(false);
          setIsAiConnected(false);
          setDbMode('local-json-fallback');
        }

        // Fetch reports
        const reportsRes = await fetch(`${API_URL}/api/consultations`);
        if (reportsRes.ok) {
          const reportsData = await reportsRes.json();
          setReports(reportsData);
        }
      } catch {
        console.warn('Backend server is offline or unreachable. Running in client-only demo fallback.');
        setDbMode('local-json-fallback');
        setBackendOnline(false);
        setIsAiConnected(false);
      }
    };

    fetchServerInfo();
  }, []);

  // Sync new reports locally
  const handleAddReport = (newReport) => {
    setReports(prev => [newReport, ...prev]);
  };

  // Sync deleted reports locally
  const handleDeleteReport = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this consultation report?')) {
      return;
    }

    try {
      // If we had a delete endpoint we'd hit it:
      await fetch(`${API_URL}/api/consultations/${reportId}`, {
        method: 'DELETE'
      });
      
      // Filter out from local state
      setReports(prev => prev.filter(r => r._id !== reportId));
    } catch (error) {
      console.warn('Failed to delete on server, removing from client state only.', error);
      setReports(prev => prev.filter(r => r._id !== reportId));
    }
  };

  // Clear all reports
  const handleClearAllReports = () => {
    setReports([]);
  };

  // We bypass the global dashboard layout on the Landing Page
  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />;
  }

  // Render the current view
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onAddReport={handleAddReport} API_URL={API_URL} />;
      case 'reports':
        return <Reports reports={reports} onDeleteReport={handleDeleteReport} />;
      case 'analytics':
        return <Analytics reports={reports} />;
      case 'settings':
        return (
          <DoctorDashboard 
            reports={reports}
            API_URL={API_URL} 
            dbMode={dbMode} 
            isAiConnected={isAiConnected}
            backendOnline={backendOnline}
            onClearAllReports={handleClearAllReports}
            setCurrentPage={setCurrentPage}
            speechEngine={speechEngine}
            translationEngine={translationEngine}
          />
        );
      default:
        return <Dashboard onAddReport={handleAddReport} API_URL={API_URL} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main Panel Viewport */}
      <div className={`flex-1 flex flex-col min-h-screen overflow-x-hidden transition-all duration-300 ${sidebarOpen ? 'lg:pl-72' : 'lg:pl-0'}`}>
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          backendOnline={backendOnline}
          isAiConnected={isAiConnected}
          speechEngine={speechEngine}
          translationEngine={translationEngine}
        />{/* Dynamic content view wrapper */}
        <main className="flex-1 p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
