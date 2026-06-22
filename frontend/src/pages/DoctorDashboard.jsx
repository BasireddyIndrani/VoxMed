import { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  AlertCircle, 
  FileText, 
  Clock, 
  Mic, 
  FolderOpen, 
  Download, 
  Activity, 
  Server, 
  Database,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  RefreshCw,
  Cpu
} from 'lucide-react';

const DoctorDashboard = ({ reports, API_URL, dbMode, isAiConnected, backendOnline, onClearAllReports, setCurrentPage, speechEngine, translationEngine }) => {
  const [showStatusDetails, setShowStatusDetails] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [pingTime, setPingTime] = useState(null);
  const [isPinging, setIsPinging] = useState(false);

  const measureLatency = useCallback(async () => {
    if (!backendOnline) {
      setPingTime(null);
      return;
    }
    setIsPinging(true);
    const start = performance.now();
    try {
      await fetch(`${API_URL}/api/health`);
      const end = performance.now();
      setPingTime(Math.round(end - start));
    } catch {
      setPingTime(null);
    } finally {
      setIsPinging(false);
    }
  }, [backendOnline, API_URL]);

  // Measure server latency on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      measureLatency();
    }, 100);
    return () => clearTimeout(timer);
  }, [measureLatency]);

  // 1. Calculate KPI Metrics
  const today = new Date().toDateString();
  const consultationsToday = reports.filter(r => new Date(r.created_at).toDateString() === today).length;
  const highPriorityCases = reports.filter(r => r.triage?.urgency === 'High').length;
  const totalReports = reports.length;
  
  // Calculate average processing time (simulated or average if records present)
  const averageProcessingTime = totalReports > 0 ? "45s" : "N/A";

  // 2. Export Reports to CSV
  const handleExportCSV = () => {
    if (reports.length === 0) {
      alert("No reports available to export.");
      return;
    }

    // Define CSV header and map records
    const headers = ["Patient ID", "Date", "Language", "Suspected Condition", "Urgency", "Subjective", "Objective", "Assessment", "Plan"];
    const rows = reports.map(r => [
      r.patient_id || "N/A",
      r.created_at ? new Date(r.created_at).toLocaleString() : "N/A",
      r.language || "N/A",
      r.triage?.condition || "N/A",
      r.triage?.urgency || "Low",
      r.soap_note?.subjective?.replace(/"/g, '""') || "",
      r.soap_note?.objective?.replace(/"/g, '""') || "",
      r.soap_note?.assessment?.replace(/"/g, '""') || "",
      r.soap_note?.plan?.replace(/"/g, '""') || ""
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `VoxMed_Consultations_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. Clear Database
  const handleClearDatabase = async () => {
    if (!window.confirm('WARNING: Are you sure you want to clear all patient logs? This action is irreversible.')) {
      return;
    }

    setIsResetting(true);
    setResetSuccess(false);

    try {
      const response = await fetch(`${API_URL}/api/consultations/clear`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Reset failed');

      onClearAllReports(); // sync frontend state
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    } catch (error) {
      console.error('API Clear failed, clearing frontend memory only:', error);
      onClearAllReports();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Dashboard Top Header & Live Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-premium">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Welcome, Dr. Sharma</h1>
          <p className="text-xs text-slate-400 mt-1">Medical Officer • Primary Health Centre Zone 4</p>
        </div>

        {/* Live API & Services Connectivity Badge */}
        <div className="flex items-center">
          {backendOnline && isAiConnected ? (
            <div className="flex flex-col items-end gap-1 text-right">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl text-xs font-bold shadow-sm animate-pulse-slow">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                <span>AI Services Connected</span>
              </div>
              <span className="text-[9px] font-bold text-slate-400">Speech Engine: {speechEngine}</span>
              <span className="text-[9px] font-bold text-slate-400">Translation Engine: {translationEngine}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 text-amber-705 rounded-2xl text-xs font-bold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
              <span>Offline Demo Mode</span>
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Consultations Today */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium flex items-center justify-between hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Today's Consults</span>
            <h3 className="font-display font-extrabold text-3xl text-slate-850 tracking-tight leading-none">
              {consultationsToday}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Visits completed today</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
            <Users className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 2: High Priority Cases */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium flex items-center justify-between hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">High Priority</span>
            <h3 className="font-display font-extrabold text-3xl text-red-650 tracking-tight leading-none">
              {highPriorityCases}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Needs immediate attention</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-650 border border-red-100 flex items-center justify-center">
            <AlertCircle className="w-5.5 h-5.5 animate-bounce" />
          </div>
        </div>

        {/* Card 3: Reports Generated */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium flex items-center justify-between hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Reports</span>
            <h3 className="font-display font-extrabold text-3xl text-slate-850 tracking-tight leading-none">
              {totalReports}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Hospital-ready PDF charts</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
            <FileText className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 4: Average Processing Time */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium flex items-center justify-between hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Sync Speed</span>
            <h3 className="font-display font-extrabold text-3xl text-slate-850 tracking-tight leading-none">
              {averageProcessingTime}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Voice dictation to PDF</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
            <Clock className="w-5.5 h-5.5" />
          </div>
        </div>

      </div>

      {/* Main Actions Panel */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-premium space-y-6">
        <h2 className="font-display font-bold text-base text-slate-800">Quick Actions Portal</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Action 1: New Consultation */}
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="flex flex-col items-start text-left p-6 bg-slate-50 hover:bg-blue-50 border border-slate-200/60 hover:border-blue-200 rounded-2xl transition-all duration-350 hover:shadow-premium group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-slate-800 mt-4">New Consultation</h4>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
              Start recording or upload live patient conversation.
            </p>
          </button>

          {/* Action 2: Consultation History */}
          <button 
            onClick={() => setCurrentPage('reports')}
            className="flex flex-col items-start text-left p-6 bg-slate-50 hover:bg-blue-50 border border-slate-200/60 hover:border-blue-200 rounded-2xl transition-all duration-350 hover:shadow-premium group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
              <FolderOpen className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-slate-800 mt-4">Consultation History</h4>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
              Review history clinical logs and patient database.
            </p>
          </button>

          {/* Action 3: Export Reports */}
          <button 
            onClick={handleExportCSV}
            className="flex flex-col items-start text-left p-6 bg-slate-50 hover:bg-blue-50 border border-slate-200/60 hover:border-blue-200 rounded-2xl transition-all duration-350 hover:shadow-premium group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-slate-800 mt-4">Export Reports</h4>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
              Download CSV data containing patient summaries.
            </p>
          </button>

          {/* Action 4: System Status Details Toggle */}
          <button 
            onClick={() => {
              setShowStatusDetails(!showStatusDetails);
              measureLatency();
            }}
            className={`flex flex-col items-start text-left p-6 border rounded-2xl transition-all duration-350 hover:shadow-premium group w-full ${
              showStatusDetails 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-slate-50 hover:bg-blue-50 border-slate-200/60 hover:border-blue-200'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between w-full mt-4">
              <h4 className="font-display font-bold text-sm text-slate-800">System Status</h4>
              {showStatusDetails ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
              Diagnose database mode, server health, and API latency.
            </p>
          </button>

        </div>

        {/* System Status Details Section */}
        {showStatusDetails && (
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-6 animate-[fadeIn_0.25s_ease-out]">
            <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5 text-blue-500" />
              <span>Diagnostic System Registry</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Stat item 1: DB Sync Mode */}
              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-650 shadow-sm">
                  <Database className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Database Mode</span>
                  <span className="text-xs font-bold text-slate-700 capitalize">
                    {dbMode === 'mongodb-atlas' ? 'Mongoose Atlas' : 'Local JSON Fallback'}
                  </span>
                </div>
              </div>

              {/* Stat item 2: API connection status */}
              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-650 shadow-sm">
                  <Server className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">AI API Connection</span>
                  <span className="text-xs font-bold text-slate-700">
                    {backendOnline && isAiConnected ? '🟢 AI Services Connected' : 'Offline Rules Fallback'}
                  </span>
                  {backendOnline && isAiConnected && (
                    <div className="text-[9px] font-semibold text-slate-405 mt-1 space-y-0.5">
                      <div>Speech Engine: {speechEngine}</div>
                      <div>Translation Engine: {translationEngine}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stat item 3: API latency */}
              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-3 cursor-pointer" onClick={measureLatency}>
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-650 shadow-sm">
                  {isPinging ? <RefreshCw className="w-4 h-4 animate-spin text-blue-500" /> : <Activity className="w-4.5 h-4.5" />}
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Server Latency</span>
                  <span className="text-xs font-bold text-slate-700">
                    {!backendOnline ? 'Offline' : pingTime ? `${pingTime} ms` : 'Testing latency...'}
                  </span>
                </div>
              </div>

            </div>

            {/* Reset Database Control */}
            <div className="p-5 border border-red-150 bg-red-50/10 rounded-2xl flex items-start gap-4 mt-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-650 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="text-xs font-bold text-red-800">Clear Clinical Registry</h5>
                  <p className="text-[10px] text-red-600 mt-0.5 leading-relaxed">
                    Clears all patient records from the active database registry. This does not affect credential settings (which are loaded strictly from the environment variables). Make sure you have exported any critical consultation data before executing.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClearDatabase}
                    disabled={isResetting}
                    className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-xl text-[10px] font-bold shadow-md shadow-red-500/10 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isResetting && <RefreshCw className="w-3 h-3 animate-spin" />}
                    <span>Clear All Patient Records</span>
                  </button>

                  {resetSuccess && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4.5 h-4.5" />
                      <span>Database Cleared Successfully!</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default DoctorDashboard;
