import React from 'react';
import { 
  Building2, 
  User, 
  Printer, 
  FileText, 
  History, 
  Sparkles,
  Edit3,
  Lock,
  Scissors,
  Check,
  Search,
  Layout,
  FileCheck2,
  Stethoscope,
  Baby,
  Activity,
  Heart
} from 'lucide-react';
import { PatientInfo, ProcedureType } from '../types/discharge';
import { SAMPLE_PATIENTS_LIST } from '../data/referenceData';

interface HeaderProps {
  patientInfo: PatientInfo;
  isEditMode: boolean;
  viewMode: 'paper' | 'form';
  onToggleViewMode: (mode: 'paper' | 'form') => void;
  onToggleEditMode: () => void;
  onProcedureTypeChange: (type: ProcedureType) => void;
  onSelectPatient: (uhid: string) => void;
  onOpenPatientSearch: () => void;
  onPrint: () => void;
  onSave: () => void;
  onFinalize: () => void;
  onExportPDF: () => void;
  onOpenAudit: () => void;
  onAutoFillSample: () => void;
  completionPercentage: number;
}

export const Header: React.FC<HeaderProps> = ({
  patientInfo,
  isEditMode,
  viewMode,
  onToggleViewMode,
  onToggleEditMode,
  onProcedureTypeChange,
  onSelectPatient,
  onOpenPatientSearch,
  onPrint,
  onSave,
  onFinalize,
  onExportPDF,
  onOpenAudit,
  onAutoFillSample
}) => {
  const procedureCards: Array<{ type: ProcedureType; title: string; subtitle: string; icon: any; color: string }> = [
    {
      type: 'Hysteroscopy',
      title: 'Hysteroscopy',
      subtitle: 'Diagnostic / Operative',
      icon: Stethoscope,
      color: '#0284c7'
    },
    {
      type: 'Cervical Cerclage',
      title: 'Cervical Cerclage',
      subtitle: 'Cervical Stitch',
      icon: Baby,
      color: '#ec4899'
    },
    {
      type: 'Dilation & Curettage (D&C)',
      title: 'D&C Procedure',
      subtitle: 'Dilation & Curettage',
      icon: Activity,
      color: '#8b5cf6'
    },
    {
      type: 'General Procedure',
      title: 'General Discharge',
      subtitle: 'Hospital Summary',
      icon: FileCheck2,
      color: '#10b981'
    },
    {
      type: 'Other',
      title: 'Other / Manual',
      subtitle: 'Manual Summary',
      icon: FileText,
      color: '#64748b'
    }
  ];

  return (
    <header className="no-print" style={{ background: '#ffffff', borderBottom: '1px solid var(--slate-200)' }}>
      {/* Top Utility Bar */}
      <div style={{ background: '#0f172a', color: '#ffffff', padding: '8px 24px', fontSize: '0.82rem' }} className="flex justify-between items-center">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 700 }}>
            <Building2 size={15} /> ASCAS FERTILITY & WOMEN'S HOSPITAL
          </span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#94a3b8' }}>Hospital Discharge Summary System</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={onAutoFillSample}
            style={{
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 600
            }}
          >
            <Sparkles size={13} /> Fill Sample Data
          </button>
          
          <button 
            onClick={onOpenAudit}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
          >
            <History size={14} /> Audit Trail
          </button>
        </div>
      </div>

      {/* Template Selection Cards (Super Clear & Accessible) */}
      <div style={{ background: '#f8fafc', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
          1. Select Discharge Summary Template:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {procedureCards.map((card) => {
            const Icon = card.icon;
            const isSelected = patientInfo.procedureType === card.type;
            return (
              <button
                key={card.type}
                type="button"
                onClick={() => onProcedureTypeChange(card.type)}
                style={{
                  background: isSelected ? '#ffffff' : '#ffffff',
                  border: isSelected ? `2px solid ${card.color}` : '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: isSelected ? `0 4px 14px ${card.color}25` : '0 1px 3px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: isSelected ? card.color : '#f1f5f9',
                  color: isSelected ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} />
                </div>

                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? '#0f172a' : '#334155' }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {card.subtitle}
                  </div>
                </div>

                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '10px',
                    background: card.color,
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px'
                  }}>
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Second Toolbar: View Switcher & Action Buttons */}
      <div style={{ padding: '12px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
        {/* View Mode Toggle Switch (Paper View vs Form Wizard) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>View Mode:</span>
          <div style={{ background: '#e2e8f0', borderRadius: '8px', padding: '3px', display: 'flex', gap: '4px' }}>
            <button
              type="button"
              onClick={() => onToggleViewMode('paper')}
              style={{
                background: viewMode === 'paper' ? '#0284c7' : 'transparent',
                color: viewMode === 'paper' ? '#ffffff' : '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Layout size={15} /> 📄 Interactive Document Mode
            </button>

            <button
              type="button"
              onClick={() => onToggleViewMode('form')}
              style={{
                background: viewMode === 'form' ? '#0284c7' : 'transparent',
                color: viewMode === 'form' ? '#ffffff' : '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Edit3 size={15} /> 📝 Guided Form Mode
            </button>
          </div>
        </div>

        {/* Quick Patient Selection & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Patient:</span>
          <select
            value={patientInfo.uhid}
            onChange={(e) => onSelectPatient(e.target.value)}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#0f172a',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {SAMPLE_PATIENTS_LIST.map((p) => (
              <option key={p.uhid} value={p.uhid}>
                {p.patientName} ({p.uhid})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onOpenPatientSearch}
            className="btn btn-secondary btn-sm"
          >
            <Search size={14} /> Search
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onToggleEditMode}
            className={`btn ${isEditMode ? 'btn-teal' : 'btn-primary'}`}
            style={{ padding: '7px 14px', fontWeight: 600, fontSize: '0.85rem' }}
          >
            {isEditMode ? <Lock size={15} /> : <Edit3 size={15} />}
            {isEditMode ? 'Lock Editing' : 'Enable Editing'}
          </button>

          <button onClick={onPrint} className="btn btn-secondary btn-sm">
            <Printer size={14} /> Print
          </button>

          <button onClick={onExportPDF} className="btn btn-primary btn-sm">
            <FileText size={14} /> Export PDF
          </button>
        </div>
      </div>
    </header>
  );
};
