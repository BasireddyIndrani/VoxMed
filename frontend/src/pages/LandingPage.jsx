import { useState } from 'react';
import { Mic, Languages, FileText, Brain, ArrowRight, Play, CheckCircle, HeartPulse, AlertTriangle } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const stats = [
    { value: '45m → 60s', label: 'Triage & Charting Speed', desc: 'Saving hours of manual typing daily' },
    { value: '5 Languages', label: 'Supported Vernaculars', desc: 'Telugu, Hindi, Tamil, Kannada, Malayalam' },
    { value: '100% Format', label: 'Structured SOAP Notes', desc: 'Clinical documentation standards' }
  ];

  const features = [
    {
      icon: Mic,
      title: 'Voice Recording',
      desc: 'Record clinical patient audio or upload existing sound files with high fidelity.'
    },
    {
      icon: Languages,
      title: 'Vernacular Translation',
      desc: 'Instantly convert complex regional dialects into standard clinical English.'
    },
    {
      icon: Brain,
      title: 'SOAP Note Generation',
      desc: 'Convert patient narratives into structured Subjective, Objective, Assessment, and Plan notes.'
    },
    {
      icon: FileText,
      title: 'Hospital PDF Export',
      desc: 'Download clean, professional documents with signatures, ready for hospital registries.'
    }
  ];



  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans overflow-x-hidden">
      
      {/* Header Bar */}
      <nav className="max-w-7xl mx-auto w-full px-6 lg:px-8 h-20 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-medical-500 to-medical-600 text-white shadow-md shadow-medical-500/10">
            <HeartPulse className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-slate-800 leading-tight">VoxMed</h1>
            <span className="text-[9px] font-bold text-healthgreen-600 tracking-wider uppercase block -mt-0.5">Rural Clinical AI</span>
          </div>
        </div>

        <button 
          onClick={onGetStarted}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-medical-500 to-medical-600 text-white text-xs font-bold shadow-md shadow-medical-500/20 hover:shadow-lg hover:shadow-medical-500/30 hover:scale-[1.02] transition-all duration-200"
        >
          <span>Open Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center">
        
        {/* Background glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-gradient-to-br from-medical-500/5 to-healthgreen-500/5 rounded-full blur-3xl pointer-events-none" />

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text Column */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">

            
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1] tracking-tight">
              Turn Rural Voices into <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-500 to-healthgreen-500">Clinical Notes</span> in Seconds.
            </h1>
            
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium">
              AI-powered healthcare documentation tailored for rural health workers. Capture vernacular spoken descriptions, translate them instantly, generate SOAP summaries, and download hospital-ready records.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-medical-500 to-medical-600 text-white font-bold shadow-lg shadow-medical-500/25 hover:shadow-xl hover:shadow-medical-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Try Demo Application</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setShowVideoModal(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Play className="w-3 h-3 fill-slate-500 ml-0.5" />
                </div>
                <span>Watch Product Tour</span>
              </button>
            </div>
          </div>

          {/* Right SVG Illustration / Visual Card Column */}
          <div className="flex-1 w-full max-w-md lg:max-w-none flex items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square rounded-[40px] bg-gradient-to-tr from-medical-500/10 to-healthgreen-500/10 border border-slate-100 flex items-center justify-center shadow-premium backdrop-blur-md overflow-hidden">
              
              {/* Spinning background rings */}
              <div className="absolute inset-8 rounded-full border border-slate-200 border-dashed animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-16 rounded-full border border-medical-500/10 animate-[spin_20s_linear_infinite]" />
              
              {/* Glass dashboard card overlay */}
              <div className="absolute top-8 left-8 w-[240px] bg-white/80 border border-slate-100/50 backdrop-blur-md rounded-2xl p-4 shadow-glass animate-[bounce_5s_infinite_ease-in-out]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-medical-500 flex items-center justify-center text-white font-bold">
                    VM
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-[10px] font-bold text-slate-800">Patient Report</h5>
                    <p className="text-[8px] text-slate-400">VM-4982 • Active Triage</p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="h-2 w-full bg-slate-100 rounded-full" />
                  <div className="h-2 w-4/5 bg-slate-100 rounded-full" />
                  <div className="h-2 w-3/5 bg-medical-100 rounded-full" />
                </div>
              </div>

              {/* Pulsing Mic Icon */}
              <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-white border border-slate-50 shadow-premium z-10 hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 rounded-full bg-medical-500/5 border border-medical-500/10 animate-ping" />
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-medical-500 to-medical-600 text-white shadow-lg shadow-medical-500/35">
                  <Mic className="w-10 h-10 animate-pulse" />
                </div>
              </div>

              {/* Second overlay - SOAP Badge */}
              <div className="absolute bottom-8 right-8 w-[180px] bg-white/85 border border-slate-100/50 backdrop-blur-md rounded-2xl p-3.5 shadow-glass animate-[bounce_6s_infinite_ease-in-out_1s]">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-healthgreen-500" />
                  <span className="text-[9px] font-bold text-slate-700">SOAP Compiled</span>
                </div>
                <div className="h-1.5 w-full bg-slate-150 rounded-full mb-1" />
                <div className="h-1.5 w-5/6 bg-slate-150 rounded-full" />
              </div>
            </div>
          </div>

        </section>

        {/* Statistics Block */}
        <section className="bg-white border-y border-slate-100 w-full py-12 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 bg-clip-text bg-gradient-to-r from-medical-600 to-medical-700">
                  {stat.value}
                </div>
                <h4 className="font-bold text-sm text-slate-800">{stat.label}</h4>
                <p className="text-xs text-slate-400 max-w-[250px] mx-auto leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-bold text-3xl text-slate-900 leading-snug">
              Complete Documentation Workflow
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              VoxMed covers the entire pipeline from capturing live vocal histories to final database archival and hospital printing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-medical-50 text-medical-500 flex items-center justify-center shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How VoxMed Works Section */}
        <section className="w-full bg-white border-t border-slate-100 py-20 relative overflow-hidden">
          {/* Background glows */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-medical-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-healthgreen-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 relative">
            
            {/* Header Title & Subtitle with Badge */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-medical-500/10 to-medical-600/10 border border-medical-200/35 text-medical-600 text-[10px] font-extrabold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-medical-500 animate-ping" />
                <span>Live AI Processing Flow</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                How VoxMed Works
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
                Transform rural patient conversations into structured clinical documentation in under 60 seconds.
              </p>
            </div>

            {/* Modern 5-Step Process Flow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative pt-4">
              
              {/* Step 1 */}
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 shadow-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-medical-500 to-medical-600 text-white flex items-center justify-center shadow-md shadow-medical-500/15 mb-5 relative">
                  <Mic className="w-6 h-6" />
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-white text-white text-[10px] font-extrabold flex items-center justify-center font-display">1</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-medical-500 transition-colors">Step 1: Voice Capture</h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">Record patient symptoms in Telugu or any regional language.</p>
                {/* Connecting arrow (Desktop layout) */}
                <div className="hidden lg:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-350">
                  <ArrowRight className="w-5 h-5 text-slate-350" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 shadow-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-medical-500 to-medical-600 text-white flex items-center justify-center shadow-md shadow-medical-500/15 mb-5 relative">
                  <Languages className="w-6 h-6" />
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-white text-white text-[10px] font-extrabold flex items-center justify-center font-display">2</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-medical-500 transition-colors">Step 2: AI Translation</h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">Convert local language speech into accurate English medical text.</p>
                {/* Connecting arrow (Desktop layout) */}
                <div className="hidden lg:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-300">
                  <ArrowRight className="w-5 h-5 text-slate-350" />
                </div>
              </div>

              {/* Step 3 (Pulse Animation step) */}
              <div className="bg-[#F8FAFC] border border-medical-300/40 rounded-3xl p-6 shadow-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col group animate-[pulse_2s_infinite]">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-medical-500 to-medical-600 text-white flex items-center justify-center shadow-md shadow-medical-500/20 mb-5 relative">
                  <Brain className="w-6 h-6 animate-pulse" />
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-medical-500 border-2 border-white text-white text-[10px] font-extrabold flex items-center justify-center font-display">3</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-medical-500 transition-colors">Step 3: SOAP Gen</h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">Generate Subjective, Objective, Assessment, and Plan automatically.</p>
                {/* Connecting arrow (Desktop layout) */}
                <div className="hidden lg:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-300">
                  <ArrowRight className="w-5 h-5 text-slate-350" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 shadow-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-medical-500 to-medical-600 text-white flex items-center justify-center shadow-md shadow-medical-500/15 mb-5 relative">
                  <AlertTriangle className="w-6 h-6 text-white" />
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-white text-white text-[10px] font-extrabold flex items-center justify-center font-display">4</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-medical-500 transition-colors">Step 4: Smart Triage</h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">Classify urgency as Low, Medium, or High risk based on symptoms.</p>
                {/* Connecting arrow (Desktop layout) */}
                <div className="hidden lg:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-350">
                  <ArrowRight className="w-5 h-5 text-slate-350" />
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 shadow-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-medical-500 to-medical-600 text-white flex items-center justify-center shadow-md shadow-medical-500/15 mb-5 relative">
                  <FileText className="w-6 h-6" />
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-white text-white text-[10px] font-extrabold flex items-center justify-center font-display">5</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-medical-500 transition-colors">Step 5: Export & Share</h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">Download PDF reports and store consultation records securely.</p>
              </div>

            </div>

            {/* Metrics Strip */}
            <div className="bg-gradient-to-r from-medical-500/5 via-medical-600/10 to-healthgreen-500/5 border border-slate-100 rounded-[32px] p-6 max-w-4xl mx-auto shadow-glass relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center items-center justify-center">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-lg">⚡</span>
                  <span className="text-xs font-bold text-slate-800">&lt; 60 Seconds Processing</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-l border-slate-150/40">
                  <span className="text-lg">🌍</span>
                  <span className="text-xs font-bold text-slate-800">Multilingual Support</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-l border-slate-150/40">
                  <span className="text-lg">📄</span>
                  <span className="text-xs font-bold text-slate-800">Auto SOAP Notes</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-l border-slate-150/40">
                  <span className="text-lg">🚨</span>
                  <span className="text-xs font-bold text-slate-800">Instant Triage Detection</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Video Modal (Mock Walkthrough) */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden max-w-2xl w-full shadow-premium relative flex flex-col">
            <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
              <h4 className="font-display font-bold text-sm text-slate-800">VoxMed Demonstration Tour</h4>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            
            {/* Mock Video Player */}
            <div className="aspect-video bg-slate-900 relative flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80')" }} />
              <div className="relative z-10 space-y-4 max-w-sm flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-medical-500 flex items-center justify-center text-white shadow-lg animate-pulse mb-2">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
                <h5 className="font-bold text-sm">Welcome to the VoxMed Demo</h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Experience a simulated pipeline containing recorded Telugu chest-pain logs, automated translations, and instant SOAP compilation on the Dashboard.
                </p>
                <button
                  onClick={() => {
                    setShowVideoModal(false);
                    onGetStarted();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-medical-500 to-medical-600 text-white font-bold text-xs"
                >
                  Start Demo Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-400">
        <p>© 2026 VoxMed Project. Built for Hackathons & Rural Clinical Operations.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
