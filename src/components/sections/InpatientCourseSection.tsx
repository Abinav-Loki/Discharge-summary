import React from 'react';
import { BedDouble, Activity, ShieldAlert } from 'lucide-react';
import { InpatientCourseDetails } from '../../types/discharge';

interface InpatientCourseSectionProps {
  inpatientCourse: InpatientCourseDetails;
  onChange: (updated: InpatientCourseDetails) => void;
}

export const InpatientCourseSection: React.FC<InpatientCourseSectionProps> = ({
  inpatientCourse,
  onChange
}) => {
  const handleChange = (field: keyof InpatientCourseDetails, value: any) => {
    onChange({ ...inpatientCourse, [field]: value });
  };

  return (
    <div className="his-card" id="inpatient-course">
      <div className="his-card-header">
        <h3>
          <BedDouble className="text-sky-600" size={20} /> Section 4: Hospital Course, ICU Details & Daily Progress
        </h3>
      </div>

      <div className="his-card-body">
        {/* Hospital Course Narrative */}
        <div className="form-group full-width" style={{ marginBottom: '16px' }}>
          <label className="form-label">
            Hospital Course Narrative <span className="required">*</span>
          </label>
          <textarea
            className="form-control"
            value={inpatientCourse.hospitalCourse}
            onChange={(e) => handleChange('hospitalCourse', e.target.value)}
            rows={4}
            placeholder="Comprehensive narrative of inpatient stay, clinical progression, treatments, and recovery..."
          />
        </div>

        {/* Daily Progress */}
        <div className="form-group full-width" style={{ marginBottom: '20px' }}>
          <label className="form-label">
            Daily Progress Log
          </label>
          <textarea
            className="form-control"
            value={inpatientCourse.dailyProgressNotes}
            onChange={(e) => handleChange('dailyProgressNotes', e.target.value)}
            rows={3}
            placeholder="Day-by-day clinical progress summary..."
          />
        </div>

        {/* ICU & Intensive Care Module */}
        <div style={{
          background: inpatientCourse.icuStayRequired ? 'var(--warning-bg)' : 'var(--slate-50)',
          border: inpatientCourse.icuStayRequired ? '1px solid var(--warning-border)' : '1px solid var(--slate-200)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} className={inpatientCourse.icuStayRequired ? "text-amber-600" : "text-slate-500"} /> ICU / HDU Intensive Care Details
            </h4>
            <label className="checkbox-label" style={{ fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={inpatientCourse.icuStayRequired}
                onChange={(e) => handleChange('icuStayRequired', e.target.checked)}
              />
              ICU Stay Required
            </label>
          </div>

          {inpatientCourse.icuStayRequired && (
            <div className="form-grid-4">
              <div className="form-group">
                <label className="form-label">ICU Days</label>
                <input
                  type="number"
                  className="form-control"
                  value={inpatientCourse.icuDaysCount || 0}
                  onChange={(e) => handleChange('icuDaysCount', parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ventilation Days</label>
                <input
                  type="number"
                  className="form-control"
                  value={inpatientCourse.mechanicalVentilationDays || 0}
                  onChange={(e) => handleChange('mechanicalVentilationDays', parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inotropes Support</label>
                <input
                  type="text"
                  className="form-control"
                  value={inpatientCourse.inotropesUsed || ''}
                  onChange={(e) => handleChange('inotropesUsed', e.target.value)}
                  placeholder="e.g. Noradrenaline / None"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Lines & Tubes</label>
                <input
                  type="text"
                  className="form-control"
                  value={inpatientCourse.linesAndTubes || ''}
                  onChange={(e) => handleChange('linesAndTubes', e.target.value)}
                  placeholder="e.g. Central line, Foley Catheter"
                />
              </div>
            </div>
          )}
        </div>

        {/* Nursing & Physiotherapy */}
        <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Nursing Notes</label>
            <textarea
              className="form-control"
              value={inpatientCourse.nursingNotes || ''}
              onChange={(e) => handleChange('nursingNotes', e.target.value)}
              rows={2}
              placeholder="Wound dressing, nursing observations..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Physiotherapy & Rehab Advice</label>
            <textarea
              className="form-control"
              value={inpatientCourse.physiotherapyAdvice || ''}
              onChange={(e) => handleChange('physiotherapyAdvice', e.target.value)}
              rows={2}
              placeholder="Mobilization plan, breathing exercises..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
