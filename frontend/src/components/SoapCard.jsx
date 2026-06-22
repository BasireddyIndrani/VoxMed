import { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

const SoapCard = ({ soapNote }) => {
  const [activeTab, setActiveTab] = useState('subjective');
  const [copied, setCopied] = useState(false);

  if (!soapNote) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400 bg-white border border-dashed border-slate-200 rounded-3xl h-full min-h-[300px]">
        <BookOpen className="w-10 h-10 mb-3 stroke-[1.25] text-slate-300" />
        <p className="text-sm text-center">SOAP Notes will be compiled here once processing completes.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'subjective', label: 'Subjective (S)', text: soapNote.subjective, tooltip: 'Patient statements, history, and chief complaints.' },
    { id: 'objective', label: 'Objective (O)', text: soapNote.objective, tooltip: 'Observable signs, vital reports, physical states.' },
    { id: 'assessment', label: 'Assessment (A)', text: soapNote.assessment, tooltip: 'Diagnoses, conditions, clinical justifications.' },
    { id: 'plan', label: 'Plan (P)', text: soapNote.plan, tooltip: 'Treatments, prescriptions, follow-ups, and actions.' }
  ];

  const handleCopy = () => {
    const textToCopy = tabs.map(t => `${t.label.toUpperCase()}:\n${t.text}`).join('\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeContent = tabs.find(t => t.id === activeTab)?.text || '';

  return (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-premium overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50 bg-slate-50/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-medical-50 text-medical-600 flex items-center justify-center">
            <BookOpen className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-800 text-sm">Clinical SOAP Chart</h3>
            <p className="text-[10px] text-slate-400">Structured Medical Format</p>
          </div>
        </div>
        
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200
            ${copied 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
              : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }
          `}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Chart' : 'Copy All'}</span>
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-100 bg-slate-50/10 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            title={tab.tooltip}
            className={`
              flex-1 py-3 text-xs font-bold border-b-2 text-center transition-all duration-200 focus:outline-none
              ${activeTab === tab.id
                ? 'border-medical-500 text-medical-500'
                : 'border-transparent text-slate-400 hover:text-slate-600'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6 overflow-y-auto min-h-[220px]">
        <div className="whitespace-pre-line text-sm text-slate-600 leading-relaxed font-sans animate-[fadeIn_0.2s_ease-out]">
          {activeContent || <span className="text-slate-400 italic">No notes captured for this section.</span>}
        </div>
      </div>
      
      {/* Styles for simple animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SoapCard;
