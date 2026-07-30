import React from 'react';
import { FileCheck2, CheckCircle2, ShieldCheck, User, Sparkles } from 'lucide-react';
import { ApprovalsAndSignatures } from '../../types/discharge';

interface ApprovalSignatureSectionProps {
  approvals: ApprovalsAndSignatures;
  onChange: (updated: ApprovalsAndSignatures) => void;
}

export const ApprovalSignatureSection: React.FC<ApprovalSignatureSectionProps> = ({
  approvals,
  onChange
}) => {
  const handleChange = (field: keyof ApprovalsAndSignatures, value: any) => {
    onChange({ ...approvals, [field]: value });
  };

  const handleSignConsultant = () => {
    const now = new Date().toLocaleString();
    onChange({
      ...approvals,
      consultantApproval: true,
      consultantSignedAt: now
    });
  };

  const handleSignSuperintendent = () => {
    const now = new Date().toLocaleString();
    onChange({
      ...approvals,
      medicalSuperintendentApproval: true,
      superintendentSignedAt: now
    });
  };

  return (
    <div className="his-card" id="approvals-signatures">
      <div className="his-card-header">
        <h3>
          <FileCheck2 className="text-sky-600" size={20} /> Section 9: Doctor Approvals, Nurse Confirmation & Digital Signatures
        </h3>
        <span className="badge badge-success">Hospital Sign-off Lock</span>
      </div>

      <div className="his-card-body">
        {/* Approvals Grid */}
        <div className="form-grid-3" style={{ gap: '20px', marginBottom: '20px' }}>
          {/* 1. Consultant Doctor Card */}
          <div style={{
            background: approvals.consultantApproval ? 'var(--success-bg)' : 'var(--slate-50)',
            border: approvals.consultantApproval ? '1px solid var(--success-border)' : '1px solid var(--slate-200)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-900)' }}>
                  1. Consultant Physician / Surgeon
                </span>
                {approvals.consultantApproval ? (
                  <span className="badge badge-success">Approved</span>
                ) : (
                  <span className="badge badge-warning">Pending</span>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Doctor Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={approvals.consultantDoctorName}
                  onChange={(e) => handleChange('consultantDoctorName', e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Medical Reg. Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={approvals.consultantRegNo}
                  onChange={(e) => handleChange('consultantRegNo', e.target.value)}
                  placeholder="e.g. TN-MMC-74910"
                />
              </div>
            </div>

            {approvals.consultantSignatureImage && (
              <div style={{ background: '#ffffff', border: '1px dashed var(--slate-300)', padding: '6px', textAlign: 'center', marginBottom: '10px', borderRadius: '4px' }}>
                <img src={approvals.consultantSignatureImage} alt="Consultant Digital Signature" style={{ maxHeight: '45px', margin: '0 auto' }} />
              </div>
            )}

            <button
              type="button"
              className={`btn ${approvals.consultantApproval ? 'btn-secondary' : 'btn-primary'}`}
              style={{ width: '100%' }}
              onClick={handleSignConsultant}
            >
              <CheckCircle2 size={16} /> {approvals.consultantApproval ? 'Re-Sign / Update Timestamp' : 'Approve & Attach Digital Signature'}
            </button>
          </div>

          {/* 2. Medical Superintendent Card */}
          <div style={{
            background: approvals.medicalSuperintendentApproval ? 'var(--success-bg)' : 'var(--slate-50)',
            border: approvals.medicalSuperintendentApproval ? '1px solid var(--success-border)' : '1px solid var(--slate-200)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-900)' }}>
                  2. Medical Superintendent (Optional)
                </span>
                {approvals.medicalSuperintendentApproval ? (
                  <span className="badge badge-success">Approved</span>
                ) : (
                  <span className="badge badge-draft">Optional</span>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Superintendent Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={approvals.superintendentName || ''}
                  onChange={(e) => handleChange('superintendentName', e.target.value)}
                  placeholder="e.g. Dr. V. Ramanathan, MS (Med Supt)"
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={handleSignSuperintendent}
            >
              <ShieldCheck size={16} /> {approvals.medicalSuperintendentApproval ? 'Superintendent Approved' : 'Countersign (Superintendent)'}
            </button>
          </div>

          {/* 3. Nurse Confirmation Card */}
          <div style={{
            background: approvals.nurseConfirmation ? 'var(--success-bg)' : 'var(--slate-50)',
            border: approvals.nurseConfirmation ? '1px solid var(--success-border)' : '1px solid var(--slate-200)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-900)' }}>
                  3. In-charge Nurse Discharge Clearance
                </span>
                {approvals.nurseConfirmation ? (
                  <span className="badge badge-success">Cleared</span>
                ) : (
                  <span className="badge badge-warning">Pending</span>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Staff Nurse Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={approvals.nurseName}
                  onChange={(e) => handleChange('nurseName', e.target.value)}
                  placeholder="e.g. Sr. Deepa Thomas, RN"
                />
              </div>
            </div>

            <label className="checkbox-label" style={{ fontWeight: 600, padding: '8px', background: '#ffffff', borderRadius: '4px', border: '1px solid var(--slate-200)' }}>
              <input
                type="checkbox"
                checked={approvals.nurseConfirmation}
                onChange={(e) => handleChange('nurseConfirmation', e.target.checked)}
              />
              Confirm Patient Discharge Education Delivered
            </label>
          </div>
        </div>

        {/* Doctor Final Remarks */}
        <div className="form-group full-width">
          <label className="form-label">Doctor Final Remarks & Special Notes</label>
          <textarea
            className="form-control"
            value={approvals.finalRemarks}
            onChange={(e) => handleChange('finalRemarks', e.target.value)}
            rows={2}
            placeholder="Final clinical summary remarks prior to printing..."
          />
        </div>
      </div>
    </div>
  );
};
