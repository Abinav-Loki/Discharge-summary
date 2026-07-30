import React, { useState, useRef } from 'react';
import { PrintView } from './components/PrintView';
import { INITIAL_DISCHARGE_DATA, PRESET_PROCEDURE_TEMPLATES, PATIENT_RECORD_DATABASE, SAMPLE_PATIENTS_LIST } from './data/referenceData';
import { DischargeSummaryData, ProcedureType } from './types/discharge';
import { Printer, Download, Check, User, Search, Edit3, Lock, Menu, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const App: React.FC = () => {
  const [data, setData] = useState<DischargeSummaryData>(INITIAL_DISCHARGE_DATA);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isPdfExporting, setIsPdfExporting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const printAreaRef = useRef<HTMLDivElement>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectPatient = (uhid: string) => {
    if (PATIENT_RECORD_DATABASE[uhid]) {
      setData(PATIENT_RECORD_DATABASE[uhid]);
      triggerToast(`Loaded record for: ${PATIENT_RECORD_DATABASE[uhid].patientInfo.patientName}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleProcedureTypeChange = (type: ProcedureType) => {
    const defaultNarrative = PRESET_PROCEDURE_TEMPLATES[type] || '';
    setData(prev => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        procedureType: type
      },
      procedureDetails: {
        ...prev.procedureDetails,
        proceduresPerformed: type,
        descriptionOfProcedure: defaultNarrative
      }
    }));
    triggerToast(`Template switched to: ${type}`);
    setIsMobileMenuOpen(false);
  };

  const handleToggleEditMode = () => {
    const nextMode = !isEditMode;
    setIsEditMode(nextMode);
    if (nextMode) {
      triggerToast('✏️ Edit Mode ON: Summary fields are now editable!');
    } else {
      triggerToast('🔒 Edit Mode OFF: Document locked (Read-Only)');
    }
  };

  // Generate & Download PDF (shows ONLY selected medications)
  const handleExportPDF = async () => {
    if (!printAreaRef.current) return;
    setIsPdfExporting(true);
    setIsMobileMenuOpen(false);
    triggerToast('Generating Hospital PDF (Selected Medications Only)...');

    // Small delay to allow React to render only selected medication rows
    await new Promise(resolve => setTimeout(resolve, 150));

    try {
      const canvas = await html2canvas(printAreaRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Discharge_Summary_${data.patientInfo.procedureType}_${data.patientInfo.uhid || 'Record'}.pdf`);
      triggerToast('PDF Downloaded Successfully!');
    } catch (err) {
      console.error('PDF Export Error:', err);
      window.print();
    } finally {
      setIsPdfExporting(false);
    }
  };

  const filteredPatients = SAMPLE_PATIENTS_LIST.filter(p => 
    p.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ipNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const templates: Array<{ type: ProcedureType; label: string; subtitle: string; icon: string; color: string }> = [
    { type: 'Hysteroscopy', label: 'Hysteroscopy', subtitle: 'Diagnostic / Operative', icon: '🔬', color: '#0284c7' },
    { type: 'Cervical Cerclage', label: 'Cervical Cerclage', subtitle: 'Cervical Stitch', icon: '🤰', color: '#ec4899' },
    { type: 'Dilation & Curettage (D&C)', label: 'D&C Procedure', subtitle: 'Dilation & Curettage', icon: '🩺', color: '#8b5cf6' },
    { type: 'General Procedure', label: 'General Discharge', subtitle: 'Hospital Summary', icon: '📋', color: '#10b981' }
  ];

  return (
    <div className="app-layout-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 4000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          <Check size={18} className="text-emerald-400" /> {toastMessage}
        </div>
      )}

      {/* MOBILE TOP NAVIGATION BAR (< 1024px) */}
      <div className="mobile-header-bar no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0284c7, #0369a1)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem'
          }}>
            A
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
              ASCAS HOSPITAL
            </div>
            <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>
              Discharge Summary
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleToggleEditMode}
            style={{
              background: isEditMode ? '#10b981' : '#334155',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isEditMode ? <Edit3 size={12} /> : <Lock size={12} />}
            {isEditMode ? 'Editing' : 'Locked'}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR OVERLAY BACKDROP */}
      <div 
        className={`sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* RESPONSIVE CONTROL SIDEBAR */}
      <aside className={`app-sidebar-container no-print ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Hospital Branding & Close Mobile Btn */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7, #0369a1)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem'
            }}>
              A
            </div>
            <div>
              <h1 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                ASCAS FERTILITY
              </h1>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                Discharge Summary Module
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              display: 'inline-flex',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* EDIT MODE TOGGLE OPTION */}
        <div style={{
          background: isEditMode ? '#ecfdf5' : '#f8fafc',
          border: isEditMode ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isEditMode ? '#047857' : '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isEditMode ? <Edit3 size={16} className="text-emerald-600" /> : <Lock size={16} className="text-slate-500" />}
              {isEditMode ? 'Edit Mode ON' : 'Edit Mode OFF'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
              {isEditMode ? 'Fields editable live' : 'Document locked'}
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleEditMode}
            style={{
              background: isEditMode ? '#10b981' : '#64748b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isEditMode ? <Lock size={13} /> : <Edit3 size={13} />}
            {isEditMode ? 'Lock' : 'Enable Edit'}
          </button>
        </div>

        {/* PATIENT SEARCH BAR */}
        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={14} /> Search & Select Patient:
          </div>

          <div style={{ position: 'relative', marginBottom: '8px' }}>
            <input
              type="text"
              placeholder="Search by name, UHID, IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '7px 10px 7px 30px',
                fontSize: '0.85rem',
                color: '#0f172a',
                outline: 'none'
              }}
            />
            <Search size={14} style={{ position: 'absolute', left: '9px', top: '10px', color: '#94a3b8' }} />
          </div>

          <select
            value={data.patientInfo.uhid}
            onChange={(e) => handleSelectPatient(e.target.value)}
            style={{
              width: '100%',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '8px 10px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#0f172a',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="">-- {filteredPatients.length} Patients Found --</option>
            {filteredPatients.map(p => (
              <option key={p.uhid} value={p.uhid}>
                {p.patientName} ({p.uhid})
              </option>
            ))}
          </select>
        </div>

        {/* PROCEDURE TEMPLATE SELECTOR */}
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            Procedure Template:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {templates.map(t => {
              const active = data.patientInfo.procedureType === t.type;
              return (
                <button
                  key={t.type}
                  onClick={() => handleProcedureTypeChange(t.type)}
                  style={{
                    background: active ? '#f0f9ff' : '#ffffff',
                    border: active ? `2px solid ${t.color}` : '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: active ? `0 4px 12px ${t.color}20` : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: active ? '#0f172a' : '#334155' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {t.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* EXPORT & PRINT ACTIONS */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => { setIsMobileMenuOpen(false); window.print(); }}
            style={{
              width: '100%',
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Printer size={16} /> Print Summary
          </button>

          <button
            onClick={handleExportPDF}
            style={{
              width: '100%',
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
            }}
          >
            <Download size={16} /> Generate PDF
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT: EDITABLE SUMMARY DOCUMENT */}
      <main className="app-main-container">
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <div className="no-print" style={{
            background: isEditMode ? '#ecfdf5' : '#f8fafc',
            border: isEditMode ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
            color: isEditMode ? '#047857' : '#475569',
            padding: '10px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.88rem',
            textAlign: 'center',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {isEditMode ? (
              <span>✏️ <strong>Edit Mode ON:</strong> Click on any field below to edit live. Checked medications (☑) will be included when generating PDF / Printing.</span>
            ) : (
              <span>🔒 <strong>Edit Mode OFF (Read-Only):</strong> Document locked. Click "Enable Edit" in top bar / menu to modify fields.</span>
            )}
          </div>

          <div ref={printAreaRef}>
            <PrintView
              data={data}
              isEditMode={isEditMode}
              isPdfExporting={isPdfExporting}
              onUpdate={(updated) => setData(updated)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

