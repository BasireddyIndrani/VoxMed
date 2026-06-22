import { Menu, HelpCircle, HeartPulse } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, currentPage, setCurrentPage, backendOnline, isAiConnected, speechEngine, translationEngine }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Clinical Consultation Hub';
      case 'reports': return 'Consultation Archives';
      case 'analytics': return 'Regional Health Insights';
      case 'settings': return 'Doctor Dashboard';
      default: return 'VoxMed Hub';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 h-20 bg-white/80 backdrop-blur-md border-b border-slate-100">
      
      {/* Left side: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          className="p-2 -ml-2 text-slate-500 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {!sidebarOpen && (
          <div 
            onClick={() => setCurrentPage('landing')}
            title="Go to Landing Page"
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-all mr-2"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-medical-500 to-medical-600 text-white shadow-md shadow-medical-500/10">
              <HeartPulse className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <span className="font-display font-bold text-sm text-slate-800 hidden sm:block">VoxMed</span>
          </div>
        )}

        <div>
          <h2 className="font-display font-bold text-lg lg:text-xl text-slate-800 leading-tight">
            {getPageTitle()}
          </h2>
          <p className="hidden sm:block text-xs text-slate-400 mt-0.5">
            Empowering rural clinicians with instant AI-driven charting.
          </p>
        </div>
      </div>

      {/* Right side: Database status & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Connection status badge */}
        <div className="hidden sm:flex flex-col items-end text-right mr-2">
          {backendOnline && isAiConnected ? (
            <>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>🟢 AI Services Connected</span>
              </div>
              <div className="text-[9px] font-semibold text-slate-400 mt-0.5">
                Speech: {speechEngine} | Translation: {translationEngine}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>🟡 Offline Demo Mode</span>
              </div>
              <div className="text-[9px] font-semibold text-slate-400 mt-0.5">
                Local Fallback Rules Active
              </div>
            </>
          )}
        </div>

        {/* Support or Walkthrough link */}
        <button className="p-2 text-slate-400 rounded-xl hover:bg-slate-50 hover:text-slate-600 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-medical-500 to-medical-600 text-white font-semibold text-sm flex items-center justify-center shadow-md shadow-medical-500/10">
            D1
          </div>
          <div className="hidden sm:block">
            <h5 className="text-xs font-bold text-slate-700 leading-tight">Dr. A. Sharma</h5>
            <span className="text-[10px] font-medium text-slate-400">Medical Officer</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
