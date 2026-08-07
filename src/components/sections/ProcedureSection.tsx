import React from 'react';
import { Scissors, FileCode, Activity, Sparkles, CheckSquare } from 'lucide-react';
import { ProcedureDetails, ProcedureType } from '../../types/discharge';
import { PRESET_PROCEDURE_TEMPLATES } from '../../data/referenceData';

interface ProcedureSectionProps {
  procedureType: ProcedureType;
  procedureDetails: ProcedureDetails;
  onChange: (updated: ProcedureDetails) => void;
}

export const ProcedureSection: React.FC<ProcedureSectionProps> = ({
  procedureType,
  procedureDetails,
  onChange
}) => {
  const handleChange = (field: keyof ProcedureDetails, value: any) => {
    onChange({ ...procedureDetails, [field]: value });
  };

  const handleHysteroscopyToggle = (key: keyof NonNullable<ProcedureDetails['hysteroscopySubtypes']>) => {
    const current = procedureDetails.hysteroscopySubtypes || {
      diagnostic: true,
      polypectomy: false,
      myomectomy: false,
      septumResection: false,
      adhesiolysis: false,
      endometrialAblation: false,
      dcPerformed: false
    };
    onChange({
      ...procedureDetails,
      hysteroscopySubtypes: {
        ...current,
        [key]: !current[key]
      }
    });
  };

  const handleApplyTemplate = () => {
    const text = PRESET_PROCEDURE_TEMPLATES[procedureType];
    onChange({ ...procedureDetails, descriptionOfProcedure: text });
  };

  return (
    <div className="his-card" id="procedure-details">
      <div className="his-card-header">
        <h3>
          <Scissors className="text-sky-600" size={20} /> Section 3: Procedure & Operative Details ({procedureType})
        </h3>
        <span className="badge badge-saved">Dynamic Template Active</span>
      </div>

      <div className="his-card-body">
        {/* Procedure Title & Date */}
        <div className="form-grid-3" style={{ marginBottom: '16px' }}>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">
              Procedure(s) Performed <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={procedureDetails.proceduresPerformed}
              onChange={(e) => handleChange('proceduresPerformed', e.target.value)}
              placeholder="e.g. Diagnostic Hysteroscopy / McDonald Cerclage / D&C"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date & Time of Procedure</label>
            <input
              type="datetime-local"
              className="form-control"
              value={procedureDetails.procedureDate}
              onChange={(e) => handleChange('procedureDate', e.target.value)}
            />
          </div>
        </div>

        {/* HYSTEROSCOPY SPECIFIC FIELDS */}
        {procedureType === 'Hysteroscopy' && (
          <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-200)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
            <label className="form-label" style={{ marginBottom: '8px', color: 'var(--primary-900)' }}>
              <CheckSquare size={16} /> Hysteroscopy Procedure Subtypes & Interventions
            </label>
            <div className="checkbox-group" style={{ marginBottom: '12px' }}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={procedureDetails.hysteroscopySubtypes?.diagnostic ?? true}
                  onChange={() => handleHysteroscopyToggle('diagnostic')}
                />
                Diagnostic Hysteroscopy
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={procedureDetails.hysteroscopySubtypes?.polypectomy ?? false}
                  onChange={() => handleHysteroscopyToggle('polypectomy')}
                />
                Polypectomy
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={procedureDetails.hysteroscopySubtypes?.myomectomy ?? false}
                  onChange={() => handleHysteroscopyToggle('myomectomy')}
                />
                Myomectomy
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={procedureDetails.hysteroscopySubtypes?.septumResection ?? false}
                  onChange={() => handleHysteroscopyToggle('septumResection')}
                />
                Septum Resection
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={procedureDetails.hysteroscopySubtypes?.adhesiolysis ?? false}
                  onChange={() => handleHysteroscopyToggle('adhesiolysis')}
                />
                Adhesiolysis
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={procedureDetails.hysteroscopySubtypes?.endometrialAblation ?? false}
                  onChange={() => handleHysteroscopyToggle('endometrialAblation')}
                />
                Endometrial Ablation
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={procedureDetails.hysteroscopySubtypes?.dcPerformed ?? false}
                  onChange={() => handleHysteroscopyToggle('dcPerformed')}
                />
                D&C Also Performed
              </label>
            </div>

            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Distension Medium</label>
                <input
                  type="text"
                  className="form-control"
                  value={procedureDetails.distensionMedium || 'Normal saline'}
                  onChange={(e) => handleChange('distensionMedium', e.target.value)}
                  placeholder="e.g. Normal saline"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Fluid Deficit (mL)</label>
                <input
                  type="text"
                  className="form-control"
                  value={procedureDetails.fluidDeficitMl || '150 mL'}
                  onChange={(e) => handleChange('fluidDeficitMl', e.target.value)}
                  placeholder="e.g. 150 mL"
                />
              </div>
            </div>
          </div>
        )}

        {/* CERVICAL CERCLAGE SPECIFIC FIELDS */}
        {procedureType === 'Cervical Cerclage' && (
          <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-200)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
            <div className="form-grid-4">
              <div className="form-group">
                <label className="form-label">Cerclage Procedure</label>
                <select
                  className="form-control"
                  value={procedureDetails.cerclageType || 'McDonald cerclage'}
                  onChange={(e) => handleChange('cerclageType', e.target.value as any)}
                >
                  <option value="McDonald cerclage">McDonald Cerclage</option>
                  <option value="Shirodkar cerclage">Shirodkar Cerclage</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Suture Type</label>
                <select
                  className="form-control"
                  value={procedureDetails.sutureMaterial || 'Mersilene tape'}
                  onChange={(e) => handleChange('sutureMaterial', e.target.value as any)}
                >
                  <option value="Mersilene tape">Mersilene Tape (5mm)</option>
                  <option value="Other">Other Suture</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Pre-Op Fetal Heart Rate</label>
                <input
                  type="text"
                  className="form-control"
                  value={procedureDetails.preOpFetalHeartRate || ''}
                  onChange={(e) => handleChange('preOpFetalHeartRate', e.target.value)}
                  placeholder="e.g. 154 bpm"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Post-Op Fetal Heart Rate</label>
                <input
                  type="text"
                  className="form-control"
                  value={procedureDetails.postOpFetalHeartRate || ''}
                  onChange={(e) => handleChange('postOpFetalHeartRate', e.target.value)}
                  placeholder="e.g. 152 bpm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Surgical Team & Anaesthesia */}
        <div className="form-grid-4" style={{ marginBottom: '16px' }}>
          <div className="form-group">
            <label className="form-label">Anesthesiologist</label>
            <input
              type="text"
              className="form-control"
              value={procedureDetails.surgeon}
              onChange={(e) => handleChange('surgeon', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Assistant Surgeon</label>
            <input
              type="text"
              className="form-control"
              value={procedureDetails.assistantSurgeon}
              onChange={(e) => handleChange('assistantSurgeon', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Anaesthetist</label>
            <input
              type="text"
              className="form-control"
              value={procedureDetails.anaesthetist}
              onChange={(e) => handleChange('anaesthetist', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Anaesthesia Type</label>
            <select
              className="form-control"
              value={procedureDetails.anaesthesiaType}
              onChange={(e) => handleChange('anaesthesiaType', e.target.value as any)}
            >
              <option value="General">General</option>
              <option value="Regional">Regional</option>
              <option value="Spinal">Spinal</option>
              <option value="Epidural">Epidural</option>
              <option value="MAC/sedation">MAC / Sedation</option>
              <option value="Local">Local</option>
              <option value="Local/paracervical">Local / Paracervical</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        {/* EBL & Operative Time */}
        <div className="form-grid-4" style={{ marginBottom: '16px' }}>
          <div className="form-group">
            <label className="form-label">Estimated Blood Loss (mL)</label>
            <input
              type="text"
              className="form-control"
              value={procedureDetails.estimatedBloodLossMl}
              onChange={(e) => handleChange('estimatedBloodLossMl', e.target.value)}
              placeholder="e.g. 20 mL"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Operative Time (Minutes)</label>
            <input
              type="text"
              className="form-control"
              value={procedureDetails.operativeTimeMinutes}
              onChange={(e) => handleChange('operativeTimeMinutes', e.target.value)}
              placeholder="e.g. 35 min"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Complications</label>
            <select
              className="form-control"
              value={procedureDetails.complicationsOption}
              onChange={(e) => handleChange('complicationsOption', e.target.value as any)}
            >
              <option value="None">None</option>
              <option value="See below">See below</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Complications Details</label>
            <input
              type="text"
              className="form-control"
              value={procedureDetails.complicationsDetails}
              onChange={(e) => handleChange('complicationsDetails', e.target.value)}
              placeholder="Describe if any"
            />
          </div>
        </div>

        {/* D&C / Pathology Specimen & Rh Status (Merged from D&C reference) */}
        {(procedureType === 'Dilation & Curettage (D&C)' || procedureType === 'General Procedure' || procedureType === 'Other') && (
          <div className="form-grid-3" style={{ marginBottom: '16px', background: 'var(--slate-50)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
            <div className="form-group">
              <label className="form-label">Specimens / Pathology Sent</label>
              <input
                type="text"
                className="form-control"
                value={procedureDetails.specimenDetails}
                onChange={(e) => handleChange('specimenDetails', e.target.value)}
                placeholder="Products of conception / Endometrial curettings / Karyotype sent"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Maternal Rh Status</label>
              <select
                className="form-control"
                value={procedureDetails.rhStatus}
                onChange={(e) => handleChange('rhStatus', e.target.value as any)}
              >
                <option value="Positive">Rh Positive (+)</option>
                <option value="Negative">Rh Negative (-)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Rh Immune Globulin Given</label>
              <select
                className="form-control"
                value={procedureDetails.rhImmunoglobinGiven}
                onChange={(e) => handleChange('rhImmunoglobinGiven', e.target.value as any)}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </div>
        )}

        {/* Description of Procedure with Template Fast-Fill */}
        <div className="form-group full-width">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label className="form-label">
              Detailed Operative Description & Surgical Notes
            </label>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleApplyTemplate}
            >
              <FileCode size={13} /> Load Standard {procedureType} Narrative
            </button>
          </div>

          <textarea
            className="form-control"
            value={procedureDetails.descriptionOfProcedure}
            onChange={(e) => handleChange('descriptionOfProcedure', e.target.value)}
            rows={5}
            placeholder={`Detailed narrative for ${procedureType}...`}
          />
        </div>
      </div>
    </div>
  );
};
