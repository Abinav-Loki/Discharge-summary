import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, Calendar, Scissors, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { SAMPLE_PATIENTS_LIST } from '../data/referenceData';

interface PatientSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (uhid: string) => void;
  currentUhid: string;
}

export const PatientSearchModal: React.FC<PatientSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPatient,
  currentUhid
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredPatients = SAMPLE_PATIENTS_LIST.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.patientName.toLowerCase().includes(q) ||
      p.uhid.toLowerCase().includes(q) ||
      p.ipNumber.toLowerCase().includes(q) ||
      p.procedureType.toLowerCase().includes(q) ||
      p.attendingDoctor.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q)
    );
  });

  const handleSelect = (uhid: string) => {
    onSelectPatient(uhid);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(4px)',
      zIndex: 3500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: '680px',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
        border: '1px solid var(--slate-200)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '85vh'
      }}>
        {/* Search Modal Header & Search Bar */}
        <div style={{
          padding: '20px',
          background: 'var(--slate-900)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={20} className="text-sky-400" /> HIS Patient Master Search
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input Box */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Patient Name, UHID, IP No, Procedure, or Doctor..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '8px',
                padding: '12px 14px 12px 42px',
                fontSize: '0.95rem',
                color: '#ffffff',
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--slate-300)',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Search Results List */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1, background: 'var(--slate-50)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Admitted Patients ({filteredPatients.length} Records Found)
          </div>

          {filteredPatients.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--slate-500)' }}>
              No admitted patients matched "<strong>{searchQuery}</strong>".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredPatients.map((patient) => {
                const isSelected = patient.uhid === currentUhid;
                return (
                  <div
                    key={patient.uhid}
                    onClick={() => handleSelect(patient.uhid)}
                    style={{
                      background: isSelected ? 'var(--primary-50)' : '#ffffff',
                      border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: 'var(--shadow-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px'
                    }}
                    className="hover:border-sky-500 hover:shadow-md"
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>
                          {patient.patientName}
                        </span>
                        <span className="badge badge-saved" style={{ fontSize: '0.75rem' }}>
                          {patient.gender}, {patient.ageYears} yrs
                        </span>
                        {isSelected && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--teal-700)', fontSize: '0.75rem', fontWeight: 700 }}>
                            <CheckCircle2 size={14} /> Active Record
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem', color: 'var(--slate-600)' }}>
                        <span><strong>UHID:</strong> {patient.uhid}</span>
                        <span><strong>IP No:</strong> {patient.ipNumber}</span>
                        <span><strong>Room:</strong> {patient.bedNumber}</span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem', color: 'var(--slate-600)' }}>
                        <span style={{ color: 'var(--primary-700)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Scissors size={13} /> {patient.procedureType}
                        </span>
                        <span><strong>Doctor:</strong> {patient.attendingDoctor}</span>
                      </div>
                    </div>

                    <button
                      className={`btn ${isSelected ? 'btn-teal' : 'btn-secondary'} btn-sm`}
                      style={{ flexShrink: 0, padding: '8px 14px' }}
                    >
                      {isSelected ? 'Active' : 'Switch Patient'} <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
