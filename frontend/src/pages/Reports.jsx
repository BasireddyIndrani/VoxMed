import { useState } from 'react';
import { Search, Eye, FileDown, Calendar, Languages, Trash2, FileText, AlertCircle, HelpCircle } from 'lucide-react';
import SoapCard from '../components/SoapCard';
import { downloadConsultationPDF } from '../utils/pdfGenerator';

const Reports = ({ reports, onDeleteReport }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  // Filter reports
  const filteredReports = reports.filter((rep) => {
    const query = searchQuery.toLowerCase();
    return (
      rep.patient_id.toLowerCase().includes(query) ||
      rep.language.toLowerCase().includes(query) ||
      (rep.triage?.condition || '').toLowerCase().includes(query)
    );
  });

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-50 text-red-600 border border-red-100';
      case 'Moderate': return 'bg-amber-50 text-amber-600 border border-amber-100';
      case 'Low': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border border-slate-100';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports by Patient ID, language, or symptoms..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-semibold focus:outline-none focus:border-medical-500 transition-colors shadow-premium"
          />
        </div>
        
        <div className="text-xs font-bold text-slate-400 self-end md:self-center">
          Showing {filteredReports.length} of {reports.length} Records
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Reports Table Panel */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl shadow-premium overflow-hidden">
          {filteredReports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Patient ID</th>
                    <th className="px-6 py-4">Language</th>
                    <th className="px-6 py-4">Date/Time</th>
                    <th className="px-6 py-4">Urgency</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredReports.map((report) => (
                    <tr 
                      key={report._id} 
                      className={`
                        hover:bg-slate-50/40 transition-colors group cursor-pointer
                        ${selectedReport?._id === report._id ? 'bg-medical-50/10' : ''}
                      `}
                      onClick={() => setSelectedReport(report)}
                    >
                      {/* Patient ID */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-800">{report.patient_id}</span>
                            <span className="block text-[9px] text-slate-400 mt-0.5 truncate max-w-[120px]">
                              {report.triage?.condition || 'General symptoms'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Language */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                          <Languages className="w-3.5 h-3.5 text-slate-400" />
                          <span>{report.language}</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500 font-medium">
                          {formatDate(report.created_at)}
                        </span>
                      </td>

                      {/* Urgency */}
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${getUrgencyBadge(report.triage?.urgency)}`}>
                          {report.triage?.urgency || 'Low'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedReport(report)}
                            title="View report details"
                            className="p-2 text-slate-400 hover:text-medical-500 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => downloadConsultationPDF(report)}
                            title="Download PDF"
                            className="p-2 text-slate-400 hover:text-healthgreen-500 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <FileDown className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => onDeleteReport(report._id)}
                            title="Delete record"
                            className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 flex flex-col items-center justify-center text-slate-400 text-center space-y-3">
              <AlertCircle className="w-10 h-10 stroke-[1.25] text-slate-350" />
              <div>
                <h5 className="font-bold text-xs text-slate-700">No Reports Found</h5>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] leading-relaxed mx-auto">
                  Try adjusting your search criteria or record new consultations to populate the list.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Report Details Panel */}
        <div className="space-y-6">
          {selectedReport ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-premium space-y-6 max-h-[calc(100vh-140px)] overflow-y-auto">
              
              {/* Header Details */}
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Report</span>
                  <h3 className="font-display font-bold text-slate-800 text-base mt-0.5">{selectedReport.patient_id}</h3>
                </div>
                <button
                  onClick={() => downloadConsultationPDF(selectedReport)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-slate-600 transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* Triage / Condition box */}
              <div className="space-y-1 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Diagnosis Overview</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className={`text-[8px] font-extrabold px-1 py-0.2 rounded uppercase ${
                    selectedReport.triage?.urgency === 'High' ? 'bg-red-500 text-white' :
                    selectedReport.triage?.urgency === 'Moderate' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {selectedReport.triage?.urgency || 'Low'}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-800 mt-1">{selectedReport.triage?.condition || 'General Review'}</h4>
                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 mt-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(selectedReport.created_at)}</span>
                </p>
              </div>

              {/* Translation records */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Transcripts</h4>
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[8px] font-bold text-slate-400 block mb-1">Original ({selectedReport.language})</span>
                    <p className="text-xs text-slate-700 leading-normal italic">"{selectedReport.transcript}"</p>
                  </div>
                  <div className="p-3.5 bg-medical-50/20 border border-medical-100/20 rounded-xl">
                    <span className="text-[8px] font-bold text-medical-500 block mb-1">English Translation</span>
                    <p className="text-xs text-slate-700 leading-normal font-medium">"{selectedReport.translation}"</p>
                  </div>
                </div>
              </div>

              {/* SOAP Note Tabs */}
              <SoapCard soapNote={selectedReport.soap_note} />

            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center text-slate-400 shadow-premium flex flex-col items-center justify-center min-h-[300px]">
              <HelpCircle className="w-10 h-10 mb-3 text-slate-350 stroke-[1.25]" />
              <h5 className="font-bold text-xs text-slate-700">Detailed Report Viewer</h5>
              <p className="text-[10px] text-slate-400 mt-1.5 max-w-[200px] leading-relaxed mx-auto">
                Select a report from the table to preview clinical summaries, translation, and triage assessments.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Reports;
