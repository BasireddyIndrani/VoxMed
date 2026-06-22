
import { Users, FileHeart, Calendar, Timer, AlertCircle } from 'lucide-react';

const Analytics = ({ reports }) => {
  // Aggregate stats
  const totalPatients = reports.length;
  
  // Calculate average processing time (simulated average)
  const avgTime = reports.length > 0 ? '58 sec' : 'N/A';

  // Count languages
  const languageCounts = reports.reduce((acc, rep) => {
    acc[rep.language] = (acc[rep.language] || 0) + 1;
    return acc;
  }, {});

  const totalLanguagesUsed = Object.keys(languageCounts).length;

  // Language Breakdown Data for Chart
  const languagesList = ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam'];
  const languageChartData = languagesList.map((lang) => {
    const count = languageCounts[lang] || 0;
    const pct = totalPatients > 0 ? Math.round((count / totalPatients) * 100) : 0;
    return { name: lang, count, pct };
  });

  // Urgency Breakdown Data
  const urgencyCounts = reports.reduce((acc, rep) => {
    const level = rep.triage?.urgency || 'Low';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, { High: 0, Moderate: 0, Low: 0 });

  // Weekly consultations trend (Mock distribution based on reports)
  const weeklyData = [
    { day: 'Mon', count: Math.max(1, Math.round(totalPatients * 0.12)) },
    { day: 'Tue', count: Math.max(2, Math.round(totalPatients * 0.20)) },
    { day: 'Wed', count: Math.max(1, Math.round(totalPatients * 0.15)) },
    { day: 'Thu', count: Math.max(3, Math.round(totalPatients * 0.25)) },
    { day: 'Fri', count: Math.max(2, Math.round(totalPatients * 0.18)) },
    { day: 'Sat', count: Math.max(1, Math.round(totalPatients * 0.08)) },
    { day: 'Sun', count: Math.max(0, Math.round(totalPatients * 0.02)) }
  ];

  const maxWeeklyCount = Math.max(...weeklyData.map(d => d.count), 5);

  const kpis = [
    { label: 'Total Patients Checked', value: totalPatients, icon: Users, desc: 'Unique registrations logged', color: 'text-medical-500 bg-medical-50 border-medical-100' },
    { label: 'SOAP Records Exported', value: totalPatients, icon: FileHeart, desc: 'Completed medical charts', color: 'text-healthgreen-500 bg-healthgreen-50 border-healthgreen-100' },
    { label: 'Vernaculars Handled', value: totalLanguagesUsed, icon: Calendar, desc: 'Distinct dialects processed', color: 'text-indigo-500 bg-indigo-50 border-indigo-150' },
    { label: 'Avg Processing Time', value: avgTime, icon: Timer, desc: 'Voice to finalized PDF speed', color: 'text-amber-500 bg-amber-50 border-amber-100' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium flex items-center justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</span>
                <h3 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight leading-none">{kpi.value}</h3>
                <p className="text-[10px] text-slate-400">{kpi.desc}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${kpi.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {reports.length === 0 ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-400 bg-white border border-slate-100 rounded-[32px] text-center shadow-premium space-y-4">
          <AlertCircle className="w-12 h-12 stroke-[1.25] text-slate-300" />
          <div>
            <h4 className="font-display font-bold text-sm text-slate-700">Analytics Offline</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[280px] leading-relaxed mx-auto">
              Please register some patient visits or trigger presets in the Consultation Hub to populate the regional charts.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* SVG Weekly Consultations Bar Chart */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium flex flex-col">
            <div className="mb-6">
              <h4 className="font-display font-bold text-slate-800 text-sm">Consultation Volume</h4>
              <p className="text-[10px] text-slate-400">Weekly patient log distribution</p>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="flex-1 flex flex-col justify-end min-h-[220px] pt-4">
              <div className="flex items-end justify-between h-36 px-2">
                {weeklyData.map((d, i) => {
                  const barHeightPct = (d.count / maxWeeklyCount) * 100;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer relative" style={{ width: '12%' }}>
                      
                      {/* Tooltip on Hover */}
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white font-bold text-[9px] px-1.5 py-0.5 rounded shadow-md transition-opacity duration-200">
                        {d.count} cases
                      </span>

                      {/* Bar fill */}
                      <div className="w-full bg-slate-50 border border-slate-100 rounded-lg h-full flex items-end overflow-hidden">
                        <div 
                          className="w-full bg-gradient-to-t from-medical-500 to-medical-600 rounded-t-md group-hover:from-medical-600 group-hover:to-medical-700 transition-all duration-300 ease-out"
                          style={{ height: `${Math.max(4, barHeightPct)}%` }}
                        />
                      </div>
                      
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{d.day}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chart baseline */}
              <div className="w-full h-[1px] bg-slate-100 mt-2" />
            </div>
          </div>

          {/* Regional Languages Distribution Chart */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium">
            <div className="mb-6">
              <h4 className="font-display font-bold text-slate-800 text-sm">Vernacular Metrics</h4>
              <p className="text-[10px] text-slate-400">Language distribution profile</p>
            </div>

            <div className="space-y-4">
              {languageChartData.map((item, idx) => {
                const barColor = idx % 2 === 0 ? 'bg-medical-500' : 'bg-healthgreen-500';
                return (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">{item.name}</span>
                      <span className="text-slate-400 font-semibold">{item.count} cases ({item.pct}%)</span>
                    </div>
                    {/* Linear Progress bar */}
                    <div className="w-full h-2.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Triage Health Level Triage Ratios */}
            <div className="border-t border-slate-50 mt-6 pt-5 grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-red-50/20 border border-red-100/30 rounded-2xl">
                <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider">High Risk</span>
                <h5 className="text-base font-extrabold text-red-700 mt-1">{urgencyCounts.High}</h5>
              </div>
              <div className="p-3 bg-amber-50/20 border border-amber-100/30 rounded-2xl">
                <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Moderate</span>
                <h5 className="text-base font-extrabold text-amber-700 mt-1">{urgencyCounts.Moderate}</h5>
              </div>
              <div className="p-3 bg-emerald-50/20 border border-emerald-100/30 rounded-2xl">
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">Low Risk</span>
                <h5 className="text-base font-extrabold text-emerald-700 mt-1">{urgencyCounts.Low}</h5>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Analytics;
