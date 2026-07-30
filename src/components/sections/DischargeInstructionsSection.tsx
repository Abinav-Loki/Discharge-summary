import React, { useEffect } from 'react';
import { AlertTriangle, CheckSquare, Calendar, PhoneCall, ShieldAlert, HeartHandshake, Info, Pill } from 'lucide-react';
import { DischargeInstructionsSummary, ProcedureType } from '../../types/discharge';
import { PROCEDURE_INSTRUCTIONS_TEMPLATES } from '../../data/referenceData';

interface DischargeInstructionsSectionProps {
  procedureType: ProcedureType;
  instructions: DischargeInstructionsSummary;
  onChange: (updated: DischargeInstructionsSummary) => void;
}

export const DischargeInstructionsSection: React.FC<DischargeInstructionsSectionProps> = ({
  procedureType,
  instructions,
  onChange
}) => {
  const template = PROCEDURE_INSTRUCTIONS_TEMPLATES[procedureType] || PROCEDURE_INSTRUCTIONS_TEMPLATES['General Procedure'];

  // Automatically sync procedure-specific default diet and activity when procedure type changes
  useEffect(() => {
    if (template) {
      onChange({
        ...instructions,
        dietAdviceDetails: instructions.dietAdviceDetails || template.defaultDiet,
        activityDetails: instructions.activityDetails || template.defaultActivity,
        woundPelvicCare: instructions.woundPelvicCare || template.defaultWoundCare
      });
    }
  }, [procedureType]);

  const handleConditionToggle = (key: keyof DischargeInstructionsSummary['conditionAtDischarge']) => {
    onChange({
      ...instructions,
      conditionAtDischarge: {
        ...instructions.conditionAtDischarge,
        [key]: !instructions.conditionAtDischarge[key]
      }
    });
  };

  const handleChange = (field: keyof DischargeInstructionsSummary, value: any) => {
    onChange({ ...instructions, [field]: value });
  };

  return (
    <div className="his-card" id="discharge-instructions">
      <div className="his-card-header">
        <h3>
          <AlertTriangle className="text-sky-600" size={20} /> Section 8: {procedureType} Patient Discharge Instructions & Red Flag Warnings
        </h3>
        <span className="badge badge-warning">{procedureType} Instruction Set</span>
      </div>

      <div className="his-card-body">
        {/* Procedure Specific Instructions Card */}
        <div style={{
          background: 'var(--primary-50)',
          border: '1px solid var(--primary-300)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Info size={18} className="text-sky-600" /> PATIENT INSTRUCTION TEMPLATE: {procedureType.toUpperCase()}
          </h4>

          {/* WHAT TO EXPECT */}
          <div style={{ marginBottom: '14px' }}>
            <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '6px' }}>
              WHAT TO EXPECT
            </h5>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--slate-700)' }}>
              {template.whatToExpect.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* PAIN RELIEF */}
          <div style={{ marginBottom: '14px' }}>
            <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Pill size={15} className="text-sky-600" /> PAIN RELIEF & MEDICATIONS
            </h5>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--slate-700)' }}>
              {template.painRelief.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* EMERGENCY WARNING SIGNS */}
          <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--danger-text)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={16} /> CALL US IMMEDIATELY / GO TO EMERGENCY DEPARTMENT IF YOU HAVE:
            </h5>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--danger-text)' }}>
              {template.callImmediatelySigns.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '4px', fontWeight: 600 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Condition at Discharge */}
        <div style={{ marginBottom: '20px', background: 'var(--slate-50)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
          <label className="form-label" style={{ marginBottom: '8px' }}>
            <CheckSquare size={16} className="text-emerald-600" /> Patient Clinical Condition at Discharge
          </label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={instructions.conditionAtDischarge.stable}
                onChange={() => handleConditionToggle('stable')}
              />
              Hemodynamically Stable
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={instructions.conditionAtDischarge.ambulating}
                onChange={() => handleConditionToggle('ambulating')}
              />
              Ambulating Independently
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={instructions.conditionAtDischarge.toleratingPO}
                onChange={() => handleConditionToggle('toleratingPO')}
              />
              Tolerating Oral Diet (PO)
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={instructions.conditionAtDischarge.voiding}
                onChange={() => handleConditionToggle('voiding')}
              />
              Voiding Urine Satisfactorily
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={instructions.conditionAtDischarge.painControlled}
                onChange={() => handleConditionToggle('painControlled')}
              />
              Pain Adequately Controlled
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={instructions.conditionAtDischarge.afebrile}
                onChange={() => handleConditionToggle('afebrile')}
              />
              Afebrile (No Fever)
            </label>
          </div>
        </div>

        {/* Diet & Activity Advice */}
        <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div className="form-group">
            <label className="form-label">Dietary Prescriptions & Advice</label>
            <select
              className="form-control"
              style={{ marginBottom: '8px' }}
              value={instructions.dietAdvice}
              onChange={(e) => handleChange('dietAdvice', e.target.value as any)}
            >
              <option value="Regular">Regular Diet</option>
              <option value="Diabetic">Diabetic Diet</option>
              <option value="Low Salt">Low Salt Diet</option>
              <option value="Soft Diet">Soft / Light Diet</option>
              <option value="High Protein">High Protein Diet</option>
              <option value="Other">Custom / Other</option>
            </select>
            <textarea
              className="form-control"
              value={instructions.dietAdviceDetails}
              onChange={(e) => handleChange('dietAdviceDetails', e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Physical Activity & Pelvic Rest Guidance</label>
            <select
              className="form-control"
              style={{ marginBottom: '8px' }}
              value={instructions.activityLevel}
              onChange={(e) => handleChange('activityLevel', e.target.value as any)}
            >
              <option value="As tolerated">As Tolerated</option>
              <option value="Pelvic rest">Strict Pelvic Rest (No intercourse/douching/tampons)</option>
              <option value="Modified activity">Modified Activity (No heavy lifting &gt;5kg)</option>
              <option value="Strict Bed Rest">Strict Bed Rest</option>
            </select>
            <textarea
              className="form-control"
              value={instructions.activityDetails}
              onChange={(e) => handleChange('activityDetails', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Wound & Pelvic Care */}
        <div className="form-group full-width" style={{ marginBottom: '16px' }}>
          <label className="form-label">Wound & Pelvic Care / Post-op Plan</label>
          <textarea
            className="form-control"
            value={instructions.woundPelvicCare}
            onChange={(e) => handleChange('woundPelvicCare', e.target.value)}
            rows={2}
          />
        </div>

        {/* Follow-up Scheduling */}
        <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-300)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Calendar size={18} className="text-sky-600" /> Structured Follow-Up Scheduling & Emergency Contacts
          </h4>

          <div className="form-grid-4" style={{ marginBottom: '12px' }}>
            <div className="form-group">
              <label className="form-label">Review Date</label>
              <input
                type="date"
                className="form-control"
                value={instructions.followupAppointmentDate}
                onChange={(e) => handleChange('followupAppointmentDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Review Time</label>
              <input
                type="text"
                className="form-control"
                value={instructions.followupAppointmentTime}
                onChange={(e) => handleChange('followupAppointmentTime', e.target.value)}
                placeholder="e.g. 10:30 AM"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Follow-up Doctor</label>
              <input
                type="text"
                className="form-control"
                value={instructions.followupDoctor}
                onChange={(e) => handleChange('followupDoctor', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Clinic / OPD Department</label>
              <input
                type="text"
                className="form-control"
                value={instructions.followupDepartment}
                onChange={(e) => handleChange('followupDepartment', e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Clinic OPD Phone</label>
              <input
                type="text"
                className="form-control"
                value={instructions.clinicPhone}
                onChange={(e) => handleChange('clinicPhone', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">24/7 After-Hours Emergency Contact</label>
              <input
                type="text"
                className="form-control"
                value={instructions.afterHoursOnCallPhone}
                onChange={(e) => handleChange('afterHoursOnCallPhone', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
