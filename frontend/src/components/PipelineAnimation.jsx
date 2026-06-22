
import { Mic, Languages, Brain, FileText, CheckCircle2 } from 'lucide-react';

const PipelineAnimation = ({ activeStage }) => {
  // Define pipeline stages and properties
  const stages = [
    {
      key: 'recording',
      label: 'Voice Recording / Upload',
      icon: Mic,
      desc: 'Transcribing speech to text',
      stepNum: 1
    },
    {
      key: 'translation',
      label: 'Vernacular Translation',
      icon: Languages,
      desc: 'Translating content to English',
      stepNum: 2
    },
    {
      key: 'analysis',
      label: 'Triage & Urgency Check',
      icon: Brain,
      desc: 'Checking vitals & severity levels',
      stepNum: 3
    },
    {
      key: 'soap',
      label: 'Clinical SOAP Note',
      icon: FileText,
      desc: 'Structuring Subjective & Plan notes',
      stepNum: 4
    }
  ];

  // Helper to determine state of a stage
  const getStageStatus = (stageKey) => {
    const order = ['recording', 'translation', 'analysis', 'soap'];
    const activeIndex = order.indexOf(activeStage);
    const stageIndex = order.indexOf(stageKey);

    if (activeStage === 'idle') return 'waiting';
    if (activeStage === 'completed') return 'done';
    
    if (stageIndex < activeIndex) return 'done';
    if (stageIndex === activeIndex) return 'active';
    return 'waiting';
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-premium relative overflow-hidden">
      
      {/* Visual background gradient glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-medical-500/5 rounded-full blur-2xl pointer-events-none" />

      <h3 className="font-display font-bold text-slate-800 text-base mb-6 flex items-center justify-between">
        <span>Processing Pipeline</span>
        {activeStage !== 'idle' && activeStage !== 'completed' && (
          <span className="text-[10px] font-bold bg-medical-50 text-medical-600 px-2 py-0.5 rounded-full animate-pulse uppercase tracking-wider">
            Processing...
          </span>
        )}
      </h3>

      <div className="relative pl-1">
        {/* Timeline Connecting Line */}
        <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-slate-100" />
        
        {/* Glow progress bar over timeline */}
        <div 
          className="absolute left-[22px] top-6 w-[2px] bg-gradient-to-b from-medical-500 to-healthgreen-500 transition-all duration-700 ease-out"
          style={{
            height: 
              activeStage === 'idle' ? '0%' :
              activeStage === 'recording' ? '12%' :
              activeStage === 'translation' ? '38%' :
              activeStage === 'analysis' ? '68%' :
              activeStage === 'soap' ? '88%' : '100%'
          }}
        />

        {/* Timeline Stages */}
        <div className="space-y-6">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const status = getStageStatus(stage.key);

            return (
              <div 
                key={stage.key} 
                className={`
                  flex items-start gap-4 transition-all duration-300
                  ${status === 'waiting' ? 'opacity-50' : 'opacity-100'}
                `}
              >
                
                {/* Node bubble */}
                <div className="relative z-10 flex items-center justify-center">
                  {status === 'done' ? (
                    <div className="w-11 h-11 rounded-full bg-healthgreen-500 text-white flex items-center justify-center shadow-lg shadow-healthgreen-500/15 border border-white">
                      <CheckCircle2 className="w-5.5 h-5.5" />
                    </div>
                  ) : status === 'active' ? (
                    <div className="w-11 h-11 rounded-full bg-medical-500 text-white flex items-center justify-center shadow-lg shadow-medical-500/20 border-4 border-medical-100 animate-pulse-slow">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-200">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                  )}
                </div>

                {/* Node details */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`
                      font-semibold text-sm transition-colors duration-200
                      ${status === 'active' ? 'text-medical-600' : status === 'done' ? 'text-slate-800' : 'text-slate-500'}
                    `}>
                      {stage.label}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{stage.desc}</p>
                  
                  {/* Small progress loading bar inside active item */}
                  {status === 'active' && (
                    <div className="mt-2 w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-medical-500 rounded-full animate-[loading_1.5s_infinite_linear]" 
                           style={{
                             backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                             backgroundSize: '1rem 1rem',
                             width: '100%'
                           }}
                      />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
      
      {/* Custom loading animation injected via inline style since Tailwind config doesn't have standard loading animations */}
      <style>{`
        @keyframes loading {
          0% { background-position: 0 0; }
          100% { background-position: 1rem 0; }
        }
      `}</style>
    </div>
  );
};

export default PipelineAnimation;
