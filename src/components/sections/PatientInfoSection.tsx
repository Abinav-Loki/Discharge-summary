import React, { useEffect } from 'react';
import { UserCheck, Calendar, Clock, Building, User, Search, Sparkles } from 'lucide-react';
import { PatientInfo } from '../../types/discharge';
import { SAMPLE_PATIENTS_LIST } from '../../data/referenceData';

interface PatientInfoSectionProps {
  patientInfo: PatientInfo;
  onChange: (updated: PatientInfo) => void;
  onSelectPatient?: (uhid: string) => void;
  onOpenPatientSearch?: () => void;
}

export const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({
  patientInfo,
  onChange,
  onSelectPatient,
  onOpenPatientSearch
}) => {
  // Auto-calculate length of stay whenever admission or discharge datetime changes
  useEffect(() => {
    if (patientInfo.admissionDateTime && patientInfo.dischargeDateTime) {
      const start = new Date(patientInfo.admissionDateTime).getTime();
      const end = new Date(patientInfo.dischargeDateTime).getTime();
      if (!isNaN(start) && !isNaN(end) && end >= start) {
        const diffMs = end - start;
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        const stayStr = days > 0 ? `${days} Day${days > 1 ? 's' : ''}, ${hours} Hour${hours !== 1 ? 's' : ''}` : `${hours} Hours`;
        if (stayStr !== patientInfo.lengthOfStay) {
          onChange({ ...patientInfo, lengthOfStay: stayStr });
        }
      }
    }
  }, [patientInfo.admissionDateTime, patientInfo.dischargeDateTime]);

  const handleChange = (field: keyof PatientInfo, value: any) => {
    onChange({ ...patientInfo, [field]: value });
  };

  const handleSelectSamplePatient = (uhid: string) => {
    if (onSelectPatient) {
      onSelectPatient(uhid);
    } else {
      const selected = SAMPLE_PATIENTS_LIST.find(p => p.uhid === uhid);
      if (selected) {
        onChange({
          ...patientInfo,
          patientName: selected.patientName,
          uhid: selected.uhid,
          ipNumber: selected.ipNumber,
          ageYears: selected.ageYears,
          gender: selected.gender,
          bedNumber: selected.bedNumber,
          admissionDateTime: selected.admissionDateTime,
          dischargeDateTime: selected.dischargeDateTime,
          lengthOfStay: selected.lengthOfStay,
          attendingDoctor: selected.attendingDoctor,
          department: selected.department,
          procedureType: selected.procedureType
        });
      }
    }
  };

  return (
    <div className="his-card" id="patient-info">
      <div className="his-card-header">
        <h3>
          <UserCheck className="text-sky-600" size={20} /> Section 1: Patient Information & IP Admission Details
        </h3>
        <span className="badge badge-saved">HIS Module Integrated</span>
      </div>

      <div className="his-card-body">
        {/* Quick Patient Switch / Search Selector */}
        <div style={{
          background: 'var(--primary-50)',
          border: '1px solid var(--primary-300)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '18px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={18} className="text-sky-600" />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-900)', textTransform: 'uppercase' }}>
                Quick Change Patient (Fetch from IP Billing / Admission Module)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                Search or select an admitted patient to load their clinical record, or edit details manually.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={patientInfo.uhid}
              onChange={(e) => handleSelectSamplePatient(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1px solid var(--primary-500)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--slate-900)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="">-- Select Admitted Patient --</option>
              {SAMPLE_PATIENTS_LIST.map((p) => (
                <option key={p.uhid} value={p.uhid}>
                  {p.patientName} ({p.uhid} - {p.ipNumber} | {p.procedureType})
                </option>
              ))}
            </select>

            {onOpenPatientSearch && (
              <button
                type="button"
                onClick={onOpenPatientSearch}
                className="btn btn-primary btn-sm"
                style={{ padding: '6px 14px' }}
              >
                <Search size={14} /> Search Bar
              </button>
            )}
          </div>
        </div>

        {/* Patient Input Fields */}
        <div className="form-grid-4" style={{ marginBottom: '16px' }}>
          <div className="form-group">
            <label className="form-label">
              Patient Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={patientInfo.patientName}
              onChange={(e) => handleChange('patientName', e.target.value)}
              placeholder="Type or edit patient name..."
              style={{ fontWeight: 700, fontSize: '0.95rem' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              UHID Number <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={patientInfo.uhid}
              onChange={(e) => handleChange('uhid', e.target.value)}
              placeholder="e.g. UHID-2026-90412"
              style={{ fontWeight: 600, color: 'var(--primary-800)' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              IP Admission Number <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={patientInfo.ipNumber}
              onChange={(e) => handleChange('ipNumber', e.target.value)}
              placeholder="e.g. IP-48912"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Bed / Room Category
            </label>
            <input
              type="text"
              className="form-control"
              value={patientInfo.bedNumber}
              onChange={(e) => handleChange('bedNumber', e.target.value)}
              placeholder="e.g. Room 304 (Single Suite)"
            />
          </div>
        </div>

        <div className="form-grid-4" style={{ marginBottom: '16px' }}>
          <div className="form-group">
            <label className="form-label">Age (Years)</label>
            <input
              type="number"
              className="form-control"
              value={patientInfo.ageYears || ''}
              onChange={(e) => handleChange('ageYears', parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={patientInfo.gender}
              onChange={(e) => handleChange('gender', e.target.value as any)}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Admission Date & Time <span className="required">*</span></label>
            <input
              type="datetime-local"
              className="form-control"
              value={patientInfo.admissionDateTime}
              onChange={(e) => handleChange('admissionDateTime', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Discharge Date & Time <span className="required">*</span></label>
            <input
              type="datetime-local"
              className="form-control"
              value={patientInfo.dischargeDateTime}
              onChange={(e) => handleChange('dischargeDateTime', e.target.value)}
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label">Length of Stay (Auto-Calculated)</label>
            <input
              type="text"
              className="form-control"
              value={patientInfo.lengthOfStay}
              onChange={(e) => handleChange('lengthOfStay', e.target.value)}
              style={{ fontWeight: 600, color: 'var(--primary-800)', background: '#ffffff' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Attending Consultant Doctor <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              value={patientInfo.attendingDoctor}
              onChange={(e) => handleChange('attendingDoctor', e.target.value)}
              placeholder="e.g. Dr. A. Parvathy, MD, DNB (OBG)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department / Speciality</label>
            <input
              type="text"
              className="form-control"
              value={patientInfo.department}
              onChange={(e) => handleChange('department', e.target.value)}
              placeholder="e.g. Gynecological Surgery & ART"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
