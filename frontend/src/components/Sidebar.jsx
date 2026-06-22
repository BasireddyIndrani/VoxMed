import { 
  Mic, 
  Activity, 
  FileText, 
  LayoutDashboard, 
  HeartPulse,
  Home,
  ChevronLeft
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'landing', label: 'Back to Landing', icon: Home },
    { id: 'settings', label: 'Doctor Dashboard', icon: LayoutDashboard },
    { id: 'dashboard', label: 'New Consultation', icon: Mic },
    { id: 'reports', label: 'Reports Directory', icon: FileText },
    { id: 'analytics', label: 'Health Analytics', icon: Activity },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 flex flex-col w-72 bg-white border-r border-slate-100 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-50">
          <div 
            onClick={() => {
              setCurrentPage('landing');
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-medical-500 to-medical-600 text-white shadow-md shadow-medical-500/20">
              <HeartPulse className="w-5.5 h-5.5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-slate-800 leading-none">VoxMed</h1>
              <span className="text-[9px] font-bold text-healthgreen-600 tracking-wider uppercase mt-0.5 block">Rural Health AI</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            title="Collapse Sidebar"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`
                  flex items-center gap-3.5 w-full px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-medical-50 text-medical-500 shadow-sm shadow-medical-500/5' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }
                `}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-medical-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="w-1.5 h-6 rounded-full bg-medical-500 ml-auto" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User / Facility Section */}
        <div className="p-4 border-t border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-healthgreen-100 flex items-center justify-center text-healthgreen-600 font-display font-bold">
              PHC
            </div>
            <div className="overflow-hidden">
              <h4 className="font-semibold text-xs text-slate-700 truncate">Rural PHC - Zone 4</h4>
              <p className="text-[10px] text-slate-400 truncate">healthcare_worker_09</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
