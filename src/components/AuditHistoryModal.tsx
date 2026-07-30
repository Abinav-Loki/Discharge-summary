import React from 'react';
import { History, X, Clock, User, FileText } from 'lucide-react';
import { AuditLogEntry } from '../types/discharge';

interface AuditHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditHistory: AuditLogEntry[];
}

export const AuditHistoryModal: React.FC<AuditHistoryModalProps> = ({
  isOpen,
  onClose,
  auditHistory
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        maxWidth: '650px',
        width: '100%',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--slate-200)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--slate-50)'
        }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={20} className="text-sky-600" /> Audit Trail & Document Revision History
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-500)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {auditHistory.map((entry) => (
              <div
                key={entry.id}
                style={{
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  background: 'var(--slate-50)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge badge-saved" style={{ fontWeight: 700 }}>
                    Version {entry.version}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {entry.timestamp}
                  </span>
                </div>

                <div style={{ fontWeight: 600, color: 'var(--slate-900)', fontSize: '0.9rem', marginBottom: '4px' }}>
                  {entry.action}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={13} /> Editor: {entry.modifiedBy}
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--slate-700)', background: '#ffffff', padding: '8px', borderRadius: '4px', border: '1px solid var(--slate-200)' }}>
                  <strong>Summary of Changes:</strong> {entry.summaryOfChanges}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--slate-200)', background: 'var(--slate-50)', textAlign: 'right' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
