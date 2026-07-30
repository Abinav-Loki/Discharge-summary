import React from 'react';
import { 
  UserCheck, 
  Stethoscope, 
  Scissors, 
  BedDouble, 
  Pill, 
  FlaskConical, 
  AlertTriangle, 
  FileCheck2,
  ListChecks,
  ChevronRight
} from 'lucide-react';

interface SectionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isComplete: boolean;
}

interface NavigationProgressProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  sectionStatus: Record<string, boolean>;
}

export const NavigationProgress: React.FC<NavigationProgressProps> = ({
  activeSection,
  onSelectSection,
  sectionStatus
}) => {
  const sections: SectionItem[] = [
    { id: 'patient-info', label: '1. Patient & Admission', icon: <UserCheck size={16} />, isComplete: !!sectionStatus['patient-info'] },
    { id: 'diagnosis-fertility', label: '2. Diagnoses & ART/Fertility', icon: <Stethoscope size={16} />, isComplete: !!sectionStatus['diagnosis-fertility'] },
    { id: 'procedure-details', label: '3. Procedure & Operative', icon: <Scissors size={16} />, isComplete: !!sectionStatus['procedure-details'] },
    { id: 'inpatient-course', label: '4. Hospital Course & ICU', icon: <BedDouble size={16} />, isComplete: !!sectionStatus['inpatient-course'] },
    { id: 'discharge-meds', label: '5. Discharge Medications', icon: <Pill size={16} />, isComplete: !!sectionStatus['discharge-meds'] },
    { id: 'investigations', label: '6. Lab Investigations', icon: <FlaskConical size={16} />, isComplete: !!sectionStatus['investigations'] },
    { id: 'procedures-implants', label: '7. Procedures & Implants', icon: <ListChecks size={16} />, isComplete: !!sectionStatus['procedures-implants'] },
    { id: 'discharge-instructions', label: '8. Instructions & Red Flags', icon: <AlertTriangle size={16} />, isComplete: !!sectionStatus['discharge-instructions'] },
    { id: 'approvals-signatures', label: '9. Approvals & Signatures', icon: <FileCheck2 size={16} />, isComplete: !!sectionStatus['approvals-signatures'] },
  ];

  const totalSections = sections.length;
  const completedCount = sections.filter(s => s.isComplete).length;
  const percentage = Math.round((completedCount / totalSections) * 100);

  return (
    <aside className="his-sidebar no-print" style={{ width: '100%' }}>
      <div className="his-card" style={{ position: 'sticky', top: '20px' }}>
        <div className="his-card-header" style={{ background: 'var(--primary-50)' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--primary-900)' }}>
              Navigation & Progress
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
              {completedCount} of {totalSections} Sections Complete ({percentage}%)
            </span>
          </div>
        </div>

        {/* Section List */}
        <div style={{ padding: '8px 0' }}>
          {sections.map(section => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  background: isActive ? 'var(--primary-50)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '4px solid var(--primary-600)' : '4px solid transparent',
                  color: isActive ? 'var(--primary-900)' : 'var(--slate-700)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: isActive ? 'var(--primary-600)' : 'var(--slate-500)' }}>
                    {section.icon}
                  </span>
                  <span>{section.label}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {section.isComplete ? (
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10b981'
                    }} title="Complete" />
                  ) : (
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--slate-300)'
                    }} title="Incomplete" />
                  )}
                  <ChevronRight size={14} style={{ opacity: isActive ? 1 : 0.4 }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Info Box */}
        <div style={{ padding: '12px 16px', background: 'var(--slate-50)', borderTop: '1px solid var(--slate-200)', fontSize: '0.75rem', color: 'var(--slate-600)' }}>
          💡 <strong>Tip:</strong> Changes auto-save every 5s. Mandatory fields are highlighted in red.
        </div>
      </div>
    </aside>
  );
};
