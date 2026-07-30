import React from 'react';
import { Stethoscope, Heart, Baby, Sparkles } from 'lucide-react';
import { ObstetricFertilityDetails } from '../../types/discharge';

interface DiagnosisSectionProps {
  admittingDiagnosis: string;
  dischargeDiagnosis: string;
  icd10Codes: string;
  obstetricFertility: ObstetricFertilityDetails;
  onAdmittingChange: (val: string) => void;
  onDischargeChange: (val: string) => void;
  onIcd10Change: (val: string) => void;
  onObstetricChange: (val: ObstetricFertilityDetails) => void;
}

export const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({
  admittingDiagnosis,
  dischargeDiagnosis,
  icd10Codes,
  obstetricFertility,
  onAdmittingChange,
  onDischargeChange,
  onIcd10Change,
  onObstetricChange
}) => {
  const handleObsChange = (field: keyof ObstetricFertilityDetails, value: any) => {
    onObstetricChange({ ...obstetricFertility, [field]: value });
  };

  return (
    <div className="his-card" id="diagnosis-fertility">
      <div className="his-card-header">
        <h3>
          <Stethoscope className="text-sky-600" size={20} /> Section 2: Clinical Diagnoses & Specialty / ART Details
        </h3>
      </div>

      <div className="his-card-body">
        {/* Main Diagnoses */}
        <div className="form-group full-width" style={{ marginBottom: '16px' }}>
          <label className="form-label">
            Pre-Operative / Admitting Diagnosis <span className="required">*</span>
          </label>
          <textarea
            className="form-control"
            value={admittingDiagnosis}
            onChange={(e) => onAdmittingChange(e.target.value)}
            placeholder="Primary condition or reason for admission..."
            rows={2}
          />
        </div>

        <div className="form-group full-width" style={{ marginBottom: '16px' }}>
          <label className="form-label">
            Post-Operative / Final Discharge Diagnosis <span className="required">*</span>
          </label>
          <textarea
            className="form-control"
            value={dischargeDiagnosis}
            onChange={(e) => onDischargeChange(e.target.value)}
            placeholder="Confirmed diagnosis upon discharge..."
            rows={2}
          />
        </div>

        <div className="form-group full-width" style={{ marginBottom: '20px' }}>
          <label className="form-label">
            ICD-10 Coding & Classification
          </label>
          <input
            type="text"
            className="form-control"
            value={icd10Codes}
            onChange={(e) => onIcd10Change(e.target.value)}
            placeholder="e.g. N88.3 (Cervical Incompetence), O34.3"
          />
        </div>

        {/* Specialized Obstetric & Fertility Module Box (Merged from Cerclage & ASCAS Fertility References) */}
        <div style={{
          background: 'var(--primary-50)',
          border: '1px solid var(--primary-200)',
          borderRadius: 'var(--radius-md)',
          padding: '18px',
          marginTop: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Baby size={18} className="text-pink-500" /> Obstetric & Fertility Center Speciality Data
            </h4>
            <label className="checkbox-label" style={{ fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={obstetricFertility.isObstetricOrFertilityCase}
                onChange={(e) => handleObsChange('isObstetricOrFertilityCase', e.target.checked)}
              />
              Enable Obstetric / ART Fertility Fields
            </label>
          </div>

          {obstetricFertility.isObstetricOrFertilityCase && (
            <div>
              {/* Gestational Age & EDD */}
              <div className="form-grid-4" style={{ marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Gestational Age (Weeks)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={obstetricFertility.gestationalWeeks || ''}
                    onChange={(e) => handleObsChange('gestationalWeeks', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 16"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gestational Age (Days)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={obstetricFertility.gestationalDays || ''}
                    onChange={(e) => handleObsChange('gestationalDays', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 4"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">EDD (Estimated Due Date)</label>
                  <input
                    type="date"
                    className="form-control"
                    value={obstetricFertility.edd || ''}
                    onChange={(e) => handleObsChange('edd', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Indication Category</label>
                  <select
                    className="form-control"
                    value={obstetricFertility.indicationType || 'Ultrasound-indicated'}
                    onChange={(e) => handleObsChange('indicationType', e.target.value as any)}
                  >
                    <option value="History-indicated">History-indicated</option>
                    <option value="Ultrasound-indicated">Ultrasound-indicated (short cervix)</option>
                    <option value="Exam-indicated (rescue)">Exam-indicated (rescue)</option>
                  </select>
                </div>
              </div>

              {/* Obstetric History G P A L */}
              <div className="form-grid-4" style={{ marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Gravida (G)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={obstetricFertility.obstetricGravida || ''}
                    onChange={(e) => handleObsChange('obstetricGravida', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Para (P)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={obstetricFertility.obstetricPara || ''}
                    onChange={(e) => handleObsChange('obstetricPara', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Abortions (A)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={obstetricFertility.obstetricAbortions || ''}
                    onChange={(e) => handleObsChange('obstetricAbortions', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Living (L)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={obstetricFertility.obstetricLiving || ''}
                    onChange={(e) => handleObsChange('obstetricLiving', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Cervical Length & Prior Losses */}
              <div className="form-grid-3" style={{ marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Cervical Length (mm)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={obstetricFertility.cervicalLengthMm || ''}
                    onChange={(e) => handleObsChange('cervicalLengthMm', parseFloat(e.target.value) || 0)}
                    placeholder="e.g. 18 mm"
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Prior Losses / PTB Details</label>
                  <input
                    type="text"
                    className="form-control"
                    value={obstetricFertility.priorLossesOrPTB || ''}
                    onChange={(e) => handleObsChange('priorLossesOrPTB', e.target.value)}
                    placeholder="e.g. 1 Spontaneous abortion at 18 weeks"
                  />
                </div>
              </div>

              {/* ART / IVF Package Details (ASCAS Fertility Master Sheet integration) */}
              <div style={{ borderTop: '1px dashed var(--primary-300)', paddingTop: '12px', marginTop: '12px' }}>
                <h5 style={{ fontSize: '0.88rem', color: 'var(--primary-800)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} className="text-amber-500" /> ART / IVF / ICSI Treatment Parameters
                </h5>

                <div className="form-grid-4">
                  <div className="form-group">
                    <label className="form-label">ART Protocol / Package</label>
                    <input
                      type="text"
                      className="form-control"
                      value={obstetricFertility.artProtocol || ''}
                      onChange={(e) => handleObsChange('artProtocol', e.target.value)}
                      placeholder="e.g. ICSI Basic / FET HRT"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Embryo Transfer Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={obstetricFertility.etDate || ''}
                      onChange={(e) => handleObsChange('etDate', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Embryo Grade / Stage</label>
                    <input
                      type="text"
                      className="form-control"
                      value={obstetricFertility.embryoGrade || ''}
                      onChange={(e) => handleObsChange('embryoGrade', e.target.value)}
                      placeholder="e.g. 4AA Blastocyst"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cryolocks Count</label>
                    <input
                      type="number"
                      className="form-control"
                      value={obstetricFertility.cryolocksUsedCount || ''}
                      onChange={(e) => handleObsChange('cryolocksUsedCount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
