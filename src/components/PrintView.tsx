import React from 'react';
import { DischargeSummaryData, ProcedureType, DischargeInstructionsSummary, MedicationItem } from '../types/discharge';
import { PROCEDURE_INSTRUCTIONS_TEMPLATES } from '../data/referenceData';

interface PrintViewProps {
  data: DischargeSummaryData;
  isEditMode?: boolean;
  isPdfExporting?: boolean;
  onUpdate?: (updatedData: DischargeSummaryData) => void;
}

export const PrintView: React.FC<PrintViewProps> = ({
  data,
  isEditMode = false,
  isPdfExporting = false,
  onUpdate
}) => {
  const {
    patientInfo,
    admittingDiagnosis,
    dischargeDiagnosis,
    obstetricFertility,
    procedureDetails,
    inpatientCourse,
    medications,
    instructions,
    approvals
  } = data;

  const procedureType: ProcedureType = patientInfo.procedureType || 'Hysteroscopy';
  const instructionsTemplate = PROCEDURE_INSTRUCTIONS_TEMPLATES[procedureType] || PROCEDURE_INSTRUCTIONS_TEMPLATES['General Procedure'];

  const handleTextChange = (path: string[], value: string) => {
    if (!onUpdate) return;
    const newData = JSON.parse(JSON.stringify(data));
    let curr: any = newData;
    for (let i = 0; i < path.length - 1; i++) {
      curr = curr[path[i]];
    }
    curr[path[path.length - 1]] = value;
    onUpdate(newData);
  };

  // Helper for big, clear, clickable tick boxes
  const renderTickBox = (checked: boolean, label: string, onClick?: () => void) => {
    if ((!isEditMode || isPdfExporting) && !checked) {
      return null;
    }
    return (
      <span
        className={`tickbox-option ${!checked ? 'unchecked-box-print-hide' : ''}`}
        onClick={isEditMode ? onClick : undefined}
        style={{
          cursor: isEditMode ? 'pointer' : 'default',
          userSelect: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginRight: '12px'
        }}
      >
        <span style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: checked ? '#0284c7' : '#64748b',
          lineHeight: '1',
          verticalAlign: 'middle'
        }}>
          {checked ? '☑' : '☐'}
        </span>
        <span>{label}</span>
      </span>
    );
  };

  // Procedure Details State Toggles
  const handleHysteroscopyToggle = (key: keyof NonNullable<typeof procedureDetails.hysteroscopySubtypes>) => {
    if (!onUpdate) return;
    const current = procedureDetails.hysteroscopySubtypes || {
      diagnostic: true,
      polypectomy: false,
      myomectomy: false,
      septumResection: false,
      adhesiolysis: false,
      endometrialAblation: false,
      dcPerformed: false
    };
    onUpdate({
      ...data,
      procedureDetails: {
        ...procedureDetails,
        hysteroscopySubtypes: {
          ...current,
          [key]: !current[key]
        }
      }
    });
  };

  const handleAnaesthesiaChange = (type: any) => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      procedureDetails: {
        ...procedureDetails,
        anaesthesiaType: type
      }
    });
  };

  const handleCerclageTypeToggle = (type: 'McDonald cerclage' | 'Shirodkar cerclage') => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      procedureDetails: {
        ...procedureDetails,
        cerclageType: type
      }
    });
  };

  const handleSutureToggle = (suture: 'Mersilene tape' | 'Other') => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      procedureDetails: {
        ...procedureDetails,
        sutureMaterial: suture
      }
    });
  };

  const handleRhStatusToggle = (status: 'Positive' | 'Negative') => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      procedureDetails: {
        ...procedureDetails,
        rhStatus: status
      }
    });
  };

  const handleRhIgToggle = (ig: 'Yes' | 'No' | 'N/A') => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      procedureDetails: {
        ...procedureDetails,
        rhImmunoglobinGiven: ig
      }
    });
  };

  const handleComplicationsToggle = (option: 'None' | 'See below', details?: string) => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      procedureDetails: {
        ...procedureDetails,
        complicationsOption: option,
        complicationsDetails: details !== undefined ? details : procedureDetails.complicationsDetails
      }
    });
  };

  const handleSpecimensToggle = (option: 'None' | 'Sent', details?: string) => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      procedureDetails: {
        ...procedureDetails,
        specimensOption: option,
        specimenDetails: details !== undefined ? details : procedureDetails.specimenDetails
      }
    });
  };

  // Standard 10 reference medications from the uploaded PDF form
  const standardMedList = [
    { name: "T. Taxim", generic: "Cefixime", defaultDose: "200 mg", defaultFreq: "1-0-1" },
    { name: "T. Ceftum", generic: "Cefuroxime", defaultDose: "500 mg", defaultFreq: "1-0-1" },
    { name: "T. Pan", generic: "Pantoprazole", defaultDose: "40 mg", defaultFreq: "1-0-1" },
    { name: "T. Acton-OR", generic: "Paracetamol ER", defaultDose: "1 gm", defaultFreq: "1-1-1" },
    { name: "T. Novelon", generic: "Desogestrel + ethinylestradiol", defaultDose: "0.15mg+0.03mg", defaultFreq: "0-0-1" },
    { name: "T. Freedase", generic: "Trypsin + bromelain + rutoside", defaultDose: "Standard", defaultFreq: "0-0-1" },
    { name: "T. Progynova / T. Endofert", generic: "Estradiol valerate / estradiol", defaultDose: "2 mg", defaultFreq: "1-0-1" },
    { name: "T. Meprate / T. Nortas CR", generic: "Medroxyprogesterone / norethisterone", defaultDose: "10 mg", defaultFreq: "1-0-1" },
    { name: "T. Thyronorm (empty stomach)", generic: "Levothyroxine", defaultDose: "50 mcg", defaultFreq: "1-0-0" },
    { name: "T. Glycomet SR", generic: "Metformin SR", defaultDose: "500 mg", defaultFreq: "1-0-1" },
  ];

  const handleToggleMedication = (stdName: string, stdGeneric: string, stdDose: string, stdFreq: string) => {
    if (!onUpdate) return;
    const searchKey = stdName.split('/')[0].trim().toLowerCase();
    const existingIndex = medications.findIndex(m =>
      !m.id.startsWith('other-') &&
      !m.id.startsWith('custom-') && (
        m.medicationName.toLowerCase().includes(searchKey) ||
        stdName.toLowerCase().includes(m.medicationName.toLowerCase())
      )
    );

    let updatedMeds = [...medications];
    if (existingIndex >= 0) {
      updatedMeds[existingIndex] = {
        ...updatedMeds[existingIndex],
        selected: !updatedMeds[existingIndex].selected
      };
    } else {
      updatedMeds.push({
        id: `med-${Date.now()}`,
        selected: true,
        medicationName: stdName,
        genericName: stdGeneric,
        strength: stdDose,
        dosage: '1 Tab',
        frequencyMAN: stdFreq,
        durationDays: '5',
        route: 'Oral',
        foodTiming: 'After Food',
        instructions: '',
        statusType: 'New'
      });
    }
    onUpdate({ ...data, medications: updatedMeds });
  };

  const handleToggleCustomMedication = (id: string) => {
    if (!onUpdate) return;
    const existingIndex = medications.findIndex(m => m.id === id);
    if (existingIndex >= 0) {
      const updatedMeds = [...medications];
      updatedMeds[existingIndex] = {
        ...updatedMeds[existingIndex],
        selected: !updatedMeds[existingIndex].selected
      };
      onUpdate({ ...data, medications: updatedMeds });
    }
  };

  const handleDeleteCustomMedication = (id: string) => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      medications: medications.filter(m => m.id !== id)
    });
  };

  const handleUpdateMedicationField = (medId: string, field: keyof MedicationItem, value: string) => {
    if (!onUpdate) return;
    
    if (medId.startsWith('std-')) {
      const stdName = medId.replace('std-', '');
      const std = standardMedList.find(s => s.name === stdName);
      if (std) {
        const newMed: MedicationItem = {
          id: `med-${Date.now()}`,
          selected: true,
          medicationName: std.name,
          genericName: std.generic,
          strength: std.defaultDose,
          dosage: '1 Tab',
          frequencyMAN: std.defaultFreq,
          durationDays: '5',
          route: 'Oral',
          foodTiming: 'After Food',
          instructions: '',
          statusType: 'New',
          [field]: value
        };
        onUpdate({ ...data, medications: [...medications, newMed] });
      }
      return;
    }

    const existingIndex = medications.findIndex(m => m.id === medId);
    if (existingIndex >= 0) {
      const updatedMeds = [...medications];
      updatedMeds[existingIndex] = {
        ...updatedMeds[existingIndex],
        [field]: value
      };
      onUpdate({ ...data, medications: updatedMeds });
    }
  };

  // Find or create "Other:" medication item in state
  const otherMedIndex = medications.findIndex(m => m.id.startsWith('other-') || m.medicationName.toLowerCase().startsWith('other'));
  const otherMed: MedicationItem = otherMedIndex >= 0 ? medications[otherMedIndex] : {
    id: `other-${Date.now()}`,
    selected: false,
    medicationName: '',
    genericName: '',
    strength: '',
    dosage: '1 Tab',
    frequencyMAN: '1-0-1',
    durationDays: '',
    route: 'Oral',
    foodTiming: 'After Food',
    instructions: '',
    statusType: 'New'
  };

  const handleToggleOtherMed = () => {
    if (!onUpdate) return;
    let updatedMeds = [...medications];
    if (otherMedIndex >= 0) {
      updatedMeds[otherMedIndex] = {
        ...updatedMeds[otherMedIndex],
        selected: !updatedMeds[otherMedIndex].selected
      };
    } else {
      updatedMeds.push({
        ...otherMed,
        selected: true
      });
    }
    onUpdate({ ...data, medications: updatedMeds });
  };

  const handleOtherMedFieldChange = (field: keyof MedicationItem, value: string) => {
    if (!onUpdate) return;
    let updatedMeds = [...medications];
    if (otherMedIndex >= 0) {
      updatedMeds[otherMedIndex] = {
        ...updatedMeds[otherMedIndex],
        [field]: value,
        selected: true // Auto check when typed
      };
    } else {
      updatedMeds.push({
        ...otherMed,
        [field]: value,
        selected: true
      });
    }
    onUpdate({ ...data, medications: updatedMeds });
  };

  const handleAddCustomRow = () => {
    if (!onUpdate) return;
    const newMed: MedicationItem = {
      id: `custom-${Date.now()}`,
      selected: true,
      medicationName: 'Custom Medication',
      genericName: 'Generic Name',
      strength: '500 mg',
      dosage: '1 Tab',
      frequencyMAN: '1-0-1',
      durationDays: '5',
      route: 'Oral',
      foodTiming: 'After Food',
      instructions: '',
      statusType: 'New'
    };
    onUpdate({ ...data, medications: [...medications, newMed] });
  };

  const handleToggleCondition = (key: keyof DischargeInstructionsSummary['conditionAtDischarge']) => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      instructions: {
        ...instructions,
        conditionAtDischarge: {
          ...instructions.conditionAtDischarge,
          [key]: !instructions.conditionAtDischarge[key]
        }
      }
    });
  };

  // Build standard 10 medication rows
  const allMedications = standardMedList.map(std => {
    const matched = medications.find(m => 
      !m.id.startsWith('other-') &&
      !m.id.startsWith('custom-') && (
        m.medicationName.toLowerCase().includes(std.name.split('/')[0].trim().toLowerCase()) ||
        std.name.toLowerCase().includes(m.medicationName.toLowerCase())
      )
    );
    if (matched) {
      return {
        ...matched,
        isSelected: matched.selected !== false,
        durationDisplay: matched.durationDays || '____'
      };
    }
    return {
      id: `std-${std.name}`,
      selected: false,
      isSelected: false,
      medicationName: std.name,
      genericName: std.generic,
      strength: std.defaultDose,
      dosage: '1 Tab',
      frequencyMAN: std.defaultFreq,
      durationDays: '',
      durationDisplay: '____',
      route: 'Oral' as const,
      foodTiming: 'After Food' as const,
      instructions: '',
      statusType: 'New' as const
    };
  });

  // Custom added medications
  const customAddedMeds = medications.filter(m => 
    m.id.startsWith('custom-')
  );

  // Filter ONLY selected medications if generating PDF or in print mode
  const displayMedications = isPdfExporting
    ? allMedications.filter(m => m.isSelected)
    : allMedications;

  const displayCustomMeds = isPdfExporting
    ? customAddedMeds.filter(m => m.selected)
    : customAddedMeds;

  const isOtherSelected = otherMed.selected && (isPdfExporting ? !!otherMed.medicationName : true);

  const getSubtitle = () => {
    switch (procedureType) {
      case 'Hysteroscopy': return 'Hysteroscopy (diagnostic / operative)';
      case 'Cervical Cerclage': return 'Cervical Cerclage';
      case 'Dilation & Curettage (D&C)': return 'Dilation and Curettage (D&C)';
      case 'General Procedure': return 'General procedure / hospital discharge';
      case 'Other': return 'Manual Discharge Summary';
      default: return procedureType;
    }
  };

  return (
    <div className={`print-view-container ${isPdfExporting ? 'pdf-export-active' : ''}`} style={{ background: '#f8fafc', padding: '10px 0' }}>
      {/* PAGE 1: CLINICAL DISCHARGE SUMMARY */}
      <div className="paper-page" style={{
        background: '#ffffff',
        color: '#000000',
        fontFamily: "'Segoe UI', Arial, sans-serif",
        fontSize: '12px',
        lineHeight: '1.45',
        padding: '36px 40px',
        maxWidth: '850px',
        margin: '0 auto 30px auto',
        border: '1px solid #cbd5e1',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        position: 'relative'
      }}>
        {/* Hospital Branding Letterhead */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '18px', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px' }}>
          <img src="/logo.jpg" alt="ASCAS Logo" style={{ height: '75px', width: '75px', objectFit: 'contain' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 2px 0', letterSpacing: '0.5px', color: '#000000' }}>
              ASCAS FERTILITY AND WOMEN'S CENTRE
            </div>
            <div style={{ fontSize: '11px', color: '#333333', margin: '2px 0' }}>
              No. 14, Arunachalam Road, next to VB World, Saligramam, Chennai – 600093
            </div>
            <div style={{ fontSize: '11px', color: '#333333', margin: '2px 0' }}>
              Tel: 093452 93609 | Email: accumedspecialityclinic@gmail.com
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '18px', borderBottom: '2px solid #000000', paddingBottom: '10px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 2px 0', letterSpacing: '1px', textTransform: 'uppercase', color: '#000000' }}>
            DISCHARGE SUMMARY
          </h1>
          <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#333333', fontWeight: 500 }}>
            {getSubtitle()}
          </div>
        </div>

        {/* Patient Header Fields */}
        <div className="patient-header-grid">
          <div>
            <strong>Patient name:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['patientInfo', 'patientName'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none', fontWeight: 600 }}>
              {patientInfo.patientName || '____________________________________'}
            </span>
          </div>
          <div>
            <strong>UHID:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['patientInfo', 'uhid'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none', fontWeight: 600 }}>
              {patientInfo.uhid || '__________________'}
            </span>
          </div>

          <div>
            <strong>Date of procedure:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'procedureDate'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
              {procedureDetails.procedureDate ? new Date(procedureDetails.procedureDate).toLocaleDateString() : '__________________'}
            </span>
          </div>
          <div>
            <strong>Admission date/time:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['patientInfo', 'admissionDateTime'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
              {patientInfo.admissionDateTime ? new Date(patientInfo.admissionDateTime).toLocaleString() : '__________________'}
            </span>
          </div>

          <div>
            <strong>Discharge date/time:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['patientInfo', 'dischargeDateTime'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
              {patientInfo.dischargeDateTime ? new Date(patientInfo.dischargeDateTime).toLocaleString() : '__________________'}
            </span>
          </div>
          <div />

          <div>
            <strong>Attending surgeon:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['patientInfo', 'attendingDoctor'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
              {patientInfo.attendingDoctor || '____________________________________'}
            </span>
          </div>
          <div>
            <strong>Assistant:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['patientInfo', 'assistantDoctor'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
              {patientInfo.assistantDoctor || '__________________'}
            </span>
          </div>
        </div>

        {/* SECTION: DIAGNOSES / INDICATION */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #94a3b8', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {procedureType === 'Cervical Cerclage' ? 'DIAGNOSES / INDICATION' : 'DIAGNOSES'}
          </div>

          {procedureType === 'Cervical Cerclage' ? (
            <div style={{ paddingLeft: '4px', fontSize: '11.5px', lineHeight: '1.6' }}>
              <div className="inline-field-group" style={{ marginBottom: '4px' }}>
                <span className="inline-field-item">
                  <strong>Gestational age:</strong> <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['obstetricFertility', 'gestationalWeeks'], e.currentTarget.textContent || '')}>{obstetricFertility.gestationalWeeks || '____'}</span> weeks <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['obstetricFertility', 'gestationalDays'], e.currentTarget.textContent || '')}>{obstetricFertility.gestationalDays || '____'}</span> days
                </span>
                <span className="inline-field-item">
                  <strong>EDD:</strong> <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['obstetricFertility', 'edd'], e.currentTarget.textContent || '')}>{obstetricFertility.edd || '__________________'}</span>
                </span>
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Indication:</strong>{' '}
                {renderTickBox(obstetricFertility.indicationType === 'History-indicated', 'History-indicated', () => handleTextChange(['obstetricFertility', 'indicationType'], 'History-indicated'))}
                {renderTickBox(obstetricFertility.indicationType === 'Ultrasound-indicated', `Ultrasound-indicated (short cervix ${obstetricFertility.cervicalLengthMm || '____'} mm)`, () => handleTextChange(['obstetricFertility', 'indicationType'], 'Ultrasound-indicated'))}
                {renderTickBox(obstetricFertility.indicationType === 'Exam-indicated (rescue)', 'Exam-indicated (rescue)', () => handleTextChange(['obstetricFertility', 'indicationType'], 'Exam-indicated (rescue)'))}
              </div>
              <div className="inline-field-group">
                <span className="inline-field-item">
                  <strong>Obstetric history:</strong> G <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['obstetricFertility', 'obstetricGravida'], e.currentTarget.textContent || '')}>{obstetricFertility.obstetricGravida ?? '____'}</span> P <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['obstetricFertility', 'obstetricPara'], e.currentTarget.textContent || '')}>{obstetricFertility.obstetricPara ?? '____'}</span>
                </span>
                <span className="inline-field-item">
                  <strong>Prior losses/PTB:</strong> <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['obstetricFertility', 'priorLossesOrPTB'], e.currentTarget.textContent || '')}>{obstetricFertility.priorLossesOrPTB || '____________________________________'}</span>
                </span>
              </div>
            </div>
          ) : (
            <div style={{ paddingLeft: '4px', fontSize: '11.5px', lineHeight: '1.6' }}>
              <div>
                <strong>Pre-operative diagnosis:</strong>{' '}
                <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['admittingDiagnosis'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                  {admittingDiagnosis || '_______________________________________________________________________________'}
                </span>
              </div>
              <div>
                <strong>Post-operative diagnosis:</strong>{' '}
                <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['dischargeDiagnosis'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                  {dischargeDiagnosis || '_______________________________________________________________________________'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SECTION: PROCEDURE DETAILS (EDITABLE & BIG TICKBOXES) */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #94a3b8', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>PROCEDURE DETAILS</span>
            {isEditMode && (
              <span className="no-print" style={{ fontSize: '10.5px', color: '#0284c7', textTransform: 'none', fontWeight: 'normal' }}>
                💡 Click any tickbox ☐ to toggle | Click text to edit
              </span>
            )}
          </div>

          {/* HYSTEROSCOPY PROCEDURE DETAILS */}
          {procedureType === 'Hysteroscopy' && (
            <div style={{ paddingLeft: '4px', fontSize: '11.5px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '6px' }}>
                <strong>Procedure:</strong>{' '}
                {renderTickBox(procedureDetails.hysteroscopySubtypes?.diagnostic ?? true, 'Diagnostic hysteroscopy', () => handleHysteroscopyToggle('diagnostic'))}
                {renderTickBox(procedureDetails.hysteroscopySubtypes?.polypectomy ?? false, 'Polypectomy', () => handleHysteroscopyToggle('polypectomy'))}
                {renderTickBox(procedureDetails.hysteroscopySubtypes?.myomectomy ?? false, 'Myomectomy', () => handleHysteroscopyToggle('myomectomy'))}
                {renderTickBox(procedureDetails.hysteroscopySubtypes?.septumResection ?? false, 'Septum resection', () => handleHysteroscopyToggle('septumResection'))}
                {renderTickBox(procedureDetails.hysteroscopySubtypes?.adhesiolysis ?? false, 'Adhesiolysis', () => handleHysteroscopyToggle('adhesiolysis'))}
                {renderTickBox(procedureDetails.hysteroscopySubtypes?.endometrialAblation ?? false, 'Endometrial ablation', () => handleHysteroscopyToggle('endometrialAblation'))}
                {renderTickBox(procedureDetails.hysteroscopySubtypes?.dcPerformed ?? false, 'D&C also performed', () => handleHysteroscopyToggle('dcPerformed'))}
              </div>
              <div style={{ marginBottom: '6px' }}>
                <strong>Anesthesia:</strong>{' '}
                {renderTickBox(procedureDetails.anaesthesiaType === 'General', 'General', () => handleAnaesthesiaChange('General'))}
                {renderTickBox(procedureDetails.anaesthesiaType === 'MAC/sedation', 'MAC/sedation', () => handleAnaesthesiaChange('MAC/sedation'))}
                {renderTickBox(procedureDetails.anaesthesiaType === 'Local', 'Local', () => handleAnaesthesiaChange('Local'))}
              </div>
              <div className="inline-field-group">
                <span className="inline-field-item">
                  <strong>Distension medium:</strong>{' '}
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'distensionMedium'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.distensionMedium || 'Normal saline'}
                  </span>
                </span>
                <span className="inline-field-item">
                  <strong>Fluid deficit:</strong>{' '}
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'fluidDeficitMl'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.fluidDeficitMl || '________'}
                  </span> mL
                </span>
                <span className="inline-field-item">
                  <strong>Estimated blood loss:</strong>{' '}
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'estimatedBloodLossMl'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.estimatedBloodLossMl || '________'}
                  </span> mL
                </span>
                <span className="inline-field-item">
                  <strong>Operative time:</strong>{' '}
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'operativeTimeMinutes'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.operativeTimeMinutes || '________'}
                  </span> min
                </span>
              </div>
            </div>
          )}

          {/* CERVICAL CERCLAGE PROCEDURE DETAILS */}
          {procedureType === 'Cervical Cerclage' && (
            <div style={{ paddingLeft: '4px', fontSize: '11.5px', lineHeight: '1.7' }}>
              <div className="inline-field-group" style={{ marginBottom: '6px' }}>
                <span className="inline-field-item">
                  <strong>Procedure:</strong>{' '}
                  {renderTickBox(procedureDetails.cerclageType !== 'Shirodkar cerclage', 'McDonald cerclage', () => handleCerclageTypeToggle('McDonald cerclage'))}
                  {renderTickBox(procedureDetails.cerclageType === 'Shirodkar cerclage', 'Shirodkar cerclage', () => handleCerclageTypeToggle('Shirodkar cerclage'))}
                </span>
                <span className="inline-field-item">
                  <strong>Suture:</strong>{' '}
                  {renderTickBox(procedureDetails.sutureMaterial !== 'Other', 'Mersilene tape', () => handleSutureToggle('Mersilene tape'))}
                  {renderTickBox(procedureDetails.sutureMaterial === 'Other', 'Other', () => handleSutureToggle('Other'))}
                </span>
              </div>
              <div className="inline-field-group" style={{ marginBottom: '6px' }}>
                <span className="inline-field-item">
                  <strong>Anesthesia:</strong>{' '}
                  {renderTickBox(procedureDetails.anaesthesiaType === 'Spinal', 'Spinal', () => handleAnaesthesiaChange('Spinal'))}
                  {renderTickBox(procedureDetails.anaesthesiaType === 'Epidural', 'Epidural', () => handleAnaesthesiaChange('Epidural'))}
                  {renderTickBox(procedureDetails.anaesthesiaType === 'General', 'General', () => handleAnaesthesiaChange('General'))}
                </span>
                <span className="inline-field-item">
                  <strong>Estimated blood loss:</strong>{' '}
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'estimatedBloodLossMl'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.estimatedBloodLossMl || '________'}
                  </span> mL
                </span>
              </div>
              <div style={{ marginBottom: '6px' }}>
                <strong>Fetal heart tones:</strong> Pre-op: <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'preOpFetalHeartRate'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>{procedureDetails.preOpFetalHeartRate || '________'}</span> bpm &nbsp;&nbsp; Post-op: <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'postOpFetalHeartRate'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>{procedureDetails.postOpFetalHeartRate || '________'}</span> bpm
              </div>
              <div>
                <strong>Complications:</strong>{' '}
                {renderTickBox(procedureDetails.complicationsOption === 'None', 'None', () => handleComplicationsToggle('None'))}
                {renderTickBox(procedureDetails.complicationsDetails?.includes('Membrane') ?? false, 'Membrane rupture', () => handleComplicationsToggle('See below', 'Membrane rupture'))}
                {renderTickBox(procedureDetails.complicationsDetails?.includes('Bleeding') ?? false, 'Bleeding', () => handleComplicationsToggle('See below', 'Bleeding'))}
                {renderTickBox(procedureDetails.complicationsOption !== 'None' && !procedureDetails.complicationsDetails?.includes('Membrane'), 'Other', () => handleComplicationsToggle('See below', 'Other'))}
              </div>
            </div>
          )}

          {/* D&C PROCEDURE DETAILS */}
          {procedureType === 'Dilation & Curettage (D&C)' && (
            <div style={{ paddingLeft: '4px', fontSize: '11.5px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '6px' }}>
                <strong>Procedure:</strong>{' '}
                <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'proceduresPerformed'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                  {procedureDetails.proceduresPerformed || 'Suction & Sharp D&C'}
                </span>
              </div>
              <div className="inline-field-group" style={{ marginBottom: '6px' }}>
                <span className="inline-field-item">
                  <strong>Anesthesia:</strong>{' '}
                  {renderTickBox(procedureDetails.anaesthesiaType === 'General', 'General', () => handleAnaesthesiaChange('General'))}
                  {renderTickBox(procedureDetails.anaesthesiaType === 'MAC/sedation', 'MAC/sedation', () => handleAnaesthesiaChange('MAC/sedation'))}
                  {renderTickBox(procedureDetails.anaesthesiaType === 'Local/paracervical' || procedureDetails.anaesthesiaType === 'Local', 'Local/paracervical', () => handleAnaesthesiaChange('Local/paracervical'))}
                </span>
                <span className="inline-field-item">
                  <strong>Estimated blood loss:</strong>{' '}
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'estimatedBloodLossMl'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.estimatedBloodLossMl || '________'}
                  </span> mL
                </span>
              </div>
              <div style={{ marginBottom: '6px' }}>
                <strong>Specimens:</strong>{' '}
                {renderTickBox(procedureDetails.specimenDetails?.includes('Products') ?? false, 'Products of conception to pathology', () => handleSpecimensToggle('Sent', 'Products of conception to pathology'))}
                {renderTickBox(procedureDetails.specimenDetails?.includes('Endometrial') ?? false, 'Endometrial curettings to pathology', () => handleSpecimensToggle('Sent', 'Endometrial curettings to pathology'))}
                {renderTickBox(procedureDetails.specimenDetails?.includes('genetics') ?? false, 'Karyotype/genetics sent', () => handleSpecimensToggle('Sent', 'Karyotype/genetics sent'))}
                {renderTickBox(procedureDetails.specimensOption === 'None', 'None', () => handleSpecimensToggle('None'))}
              </div>
              <div className="inline-field-group">
                <span className="inline-field-item">
                  <strong>Rh status:</strong>{' '}
                  {renderTickBox(procedureDetails.rhStatus === 'Positive', 'Positive', () => handleRhStatusToggle('Positive'))}
                  {renderTickBox(procedureDetails.rhStatus === 'Negative', 'Negative', () => handleRhStatusToggle('Negative'))}
                </span>
                <span className="inline-field-item">
                  <strong>Rh immune globulin given:</strong>{' '}
                  {renderTickBox(procedureDetails.rhImmunoglobinGiven === 'Yes', 'Yes', () => handleRhIgToggle('Yes'))}
                  {renderTickBox(procedureDetails.rhImmunoglobinGiven === 'No', 'No', () => handleRhIgToggle('No'))}
                  {renderTickBox(procedureDetails.rhImmunoglobinGiven === 'N/A', 'N/A', () => handleRhIgToggle('N/A'))}
                </span>
              </div>
            </div>
          )}

          {/* GENERAL PROCEDURE DETAILS */}
          {(procedureType === 'General Procedure' || procedureType === 'Other') && (
            <div style={{ paddingLeft: '4px', fontSize: '11.5px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '6px' }}>
                <strong>Procedure(s) performed:</strong>{' '}
                <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'proceduresPerformed'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                  {procedureDetails.proceduresPerformed || '_______________________________________________________________'}
                </span>
              </div>
              <div style={{ marginBottom: '6px' }}>
                <strong>Anesthesia:</strong>{' '}
                {renderTickBox(procedureDetails.anaesthesiaType === 'General', 'General', () => handleAnaesthesiaChange('General'))}
                {renderTickBox(procedureDetails.anaesthesiaType === 'Regional', 'Regional', () => handleAnaesthesiaChange('Regional'))}
                {renderTickBox(procedureDetails.anaesthesiaType === 'MAC/sedation', 'MAC/sedation', () => handleAnaesthesiaChange('MAC/sedation'))}
                {renderTickBox(procedureDetails.anaesthesiaType === 'Local', 'Local', () => handleAnaesthesiaChange('Local'))}
                {renderTickBox(procedureDetails.anaesthesiaType === 'None', 'None', () => handleAnaesthesiaChange('None'))}
              </div>
              <div className="inline-field-group" style={{ marginBottom: '6px' }}>
                <span className="inline-field-item">
                  <strong>Estimated blood loss:</strong>{' '}
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'estimatedBloodLossMl'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.estimatedBloodLossMl || '________'}
                  </span> mL
                </span>
                <span className="inline-field-item">
                  <strong>Operative time:</strong>{' '}
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'operativeTimeMinutes'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.operativeTimeMinutes || '________'}
                  </span> min
                </span>
              </div>
              <div style={{ marginBottom: '6px' }}>
                <strong>Complications:</strong>{' '}
                {renderTickBox(procedureDetails.complicationsOption === 'None', 'None', () => handleComplicationsToggle('None'))}
                {renderTickBox(procedureDetails.complicationsOption !== 'None', 'See below', () => handleComplicationsToggle('See below'))}
                {procedureDetails.complicationsOption !== 'None' && (
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'complicationsDetails'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.complicationsDetails || '____________________________________'}
                  </span>
                )}
              </div>
              <div>
                <strong>Specimens / pathology:</strong>{' '}
                {renderTickBox(procedureDetails.specimensOption === 'None', 'None', () => handleSpecimensToggle('None'))}
                {renderTickBox(procedureDetails.specimensOption === 'Sent', 'Sent', () => handleSpecimensToggle('Sent'))}
                {procedureDetails.specimensOption === 'Sent' && (
                  <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'specimenDetails'], e.currentTarget.textContent || '')} style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}>
                    {procedureDetails.specimenDetails || '____________________________________'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* DESCRIPTION OF PROCEDURE */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #94a3b8', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            DESCRIPTION OF PROCEDURE
          </div>
          <div
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange(['procedureDetails', 'descriptionOfProcedure'], e.currentTarget.textContent || '')}
            style={{
              paddingLeft: '4px',
              fontSize: '11.5px',
              textAlign: 'justify',
              lineHeight: '1.5',
              whiteSpace: 'pre-line',
              outline: isEditMode ? '1px dashed #0284c7' : 'none'
            }}
          >
            {procedureDetails.descriptionOfProcedure}
          </div>
        </div>

        {/* HOSPITAL COURSE */}
        {inpatientCourse.hospitalCourse && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #94a3b8', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              HOSPITAL COURSE
            </div>
            <div
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange(['inpatientCourse', 'hospitalCourse'], e.currentTarget.textContent || '')}
              style={{
                paddingLeft: '4px',
                fontSize: '11.5px',
                lineHeight: '1.5',
                whiteSpace: 'pre-line',
                outline: isEditMode ? '1px dashed #0284c7' : 'none'
              }}
            >
              {inpatientCourse.hospitalCourse}
            </div>
          </div>
        )}

        {/* SECTION: DISCHARGE MEDICATIONS */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #94a3b8', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>DISCHARGE MEDICATIONS</span>
            {isEditMode && !isPdfExporting && (
              <span className="no-print" style={{ fontSize: '10.5px', color: '#0284c7', textTransform: 'none', fontWeight: 'normal' }}>
                💡 Click any tickbox ☐ to toggle prescription on/off
              </span>
            )}
          </div>

          <div className="table-responsive-wrapper">
            <table className="medication-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #000000' }}>
                  <th className="no-print-checkbox" style={{ border: '1px solid #000000', padding: '4px', width: '36px', textAlign: 'center', fontSize: '15px' }}>☐</th>
                  <th style={{ border: '1px solid #000000', padding: '4px', textAlign: 'left', width: '28%' }}>Medication</th>
                  <th style={{ border: '1px solid #000000', padding: '4px', textAlign: 'left', width: '32%' }}>Generic</th>
                  <th style={{ border: '1px solid #000000', padding: '4px', textAlign: 'center', width: '14%' }}>Dose</th>
                  <th style={{ border: '1px solid #000000', padding: '4px', textAlign: 'center', width: '13%' }}>Freq (M-A-N)</th>
                  <th style={{ border: '1px solid #000000', padding: '4px', textAlign: 'center', width: '13%' }}>Duration</th>
                  {isEditMode && !isPdfExporting && (
                    <th className="no-print" style={{ border: '1px solid #000000', padding: '4px', width: '50px', textAlign: 'center' }}>Delete</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* 10 STANDARD MEDICATIONS */}
                {displayMedications.map((med, index) => (
                  <tr 
                    key={med.id || index} 
                    className={!med.isSelected ? 'unselected-med-row' : ''}
                    style={{ background: med.isSelected ? '#f0f9ff' : 'transparent' }}
                  >
                    <td 
                      className="no-print-checkbox"
                      onClick={() => handleToggleMedication(med.medicationName, med.genericName, med.strength, med.frequencyMAN)}
                      title={isEditMode ? "Click to toggle prescription box" : undefined}
                      style={{
                        border: '1px solid #000000',
                        padding: '4px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: isEditMode ? 'pointer' : 'default',
                        userSelect: 'none',
                        color: med.isSelected ? '#0284c7' : '#64748b'
                      }}
                    >
                      {med.isSelected ? '☑' : '☐'}
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px 6px', fontWeight: med.isSelected ? 'bold' : 'normal' }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'medicationName', e.currentTarget.textContent || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.medicationName}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px 6px' }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'genericName', e.currentTarget.textContent || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.genericName}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'strength', e.currentTarget.textContent || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.strength || '______'}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center', fontWeight: 600 }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'frequencyMAN', e.currentTarget.textContent || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.frequencyMAN || '________'}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'durationDays', e.currentTarget.textContent?.replace(/ days/g, '') || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.durationDisplay || '____'}
                      </span> days
                    </td>
                    {isEditMode && !isPdfExporting && (
                      <td className="no-print" style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}></td>
                    )}
                  </tr>
                ))}

                {/* CUSTOM ADDED MEDICATIONS */}
                {displayCustomMeds.map((med, idx) => (
                  <tr 
                    key={med.id || `custom-${idx}`} 
                    className={!med.selected ? 'unselected-med-row' : ''}
                    style={{ background: med.selected ? '#f0f9ff' : 'transparent' }}
                  >
                    <td 
                      className="no-print-checkbox"
                      onClick={() => handleToggleCustomMedication(med.id)}
                      title={isEditMode ? "Click to toggle prescription box" : undefined}
                      style={{
                        border: '1px solid #000000',
                        padding: '4px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: isEditMode ? 'pointer' : 'default',
                        userSelect: 'none',
                        color: med.selected ? '#0284c7' : '#64748b'
                      }}
                    >
                      {med.selected ? '☑' : '☐'}
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px 6px', fontWeight: med.selected ? 'bold' : 'normal' }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'medicationName', e.currentTarget.textContent || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.medicationName}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px 6px' }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'genericName', e.currentTarget.textContent || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.genericName}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'strength', e.currentTarget.textContent || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.strength}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center', fontWeight: 600 }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'frequencyMAN', e.currentTarget.textContent || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.frequencyMAN}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}>
                      <span 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => handleUpdateMedicationField(med.id, 'durationDays', e.currentTarget.textContent?.replace(/ days/g, '') || '')}
                        style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                      >
                        {med.durationDays}
                      </span> days
                    </td>
                    {isEditMode && !isPdfExporting && (
                      <td className="no-print" style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomMedication(med.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            padding: '2px 6px'
                          }}
                          title="Delete medication row"
                        >
                          ✕
                        </button>
                      </td>
                    )}
                  </tr>
                ))}

                {/* 11TH ROW: "OTHER:" MEDICATIONS */}
                <tr 
                  className={!isOtherSelected ? 'unselected-med-row' : ''}
                  style={{ background: isOtherSelected ? '#f0f9ff' : 'transparent' }}
                >
                  <td 
                    className="no-print-checkbox"
                    onClick={handleToggleOtherMed}
                    title={isEditMode ? "Click to toggle prescription box" : undefined}
                    style={{
                      border: '1px solid #000000',
                      padding: '4px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      cursor: isEditMode ? 'pointer' : 'default',
                      userSelect: 'none',
                      color: isOtherSelected ? '#0284c7' : '#64748b'
                    }}
                  >
                    {isOtherSelected ? '☑' : '☐'}
                  </td>
                  <td style={{ border: '1px solid #000000', padding: '3px 6px', fontWeight: 'bold' }}>
                    Other:{' '}
                    <span 
                      contentEditable={isEditMode} 
                      suppressContentEditableWarning 
                      onBlur={(e) => handleOtherMedFieldChange('medicationName', e.currentTarget.textContent || '')} 
                      style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none', minWidth: '80px', display: 'inline-block' }}
                    >
                      {otherMed.medicationName || '______________'}
                    </span>
                  </td>
                  <td style={{ border: '1px solid #000000', padding: '3px 6px' }}>
                    <span 
                      contentEditable={isEditMode} 
                      suppressContentEditableWarning 
                      onBlur={(e) => handleOtherMedFieldChange('genericName', e.currentTarget.textContent || '')} 
                      style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none', minWidth: '80px', display: 'inline-block' }}
                    >
                      {otherMed.genericName || '__________________'}
                    </span>
                  </td>
                  <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}>
                    <span 
                      contentEditable={isEditMode} 
                      suppressContentEditableWarning 
                      onBlur={(e) => handleOtherMedFieldChange('strength', e.currentTarget.textContent || '')} 
                      style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                    >
                      {otherMed.strength || '______'}
                    </span>
                  </td>
                  <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center', fontWeight: 600 }}>
                    <span 
                      contentEditable={isEditMode} 
                      suppressContentEditableWarning 
                      onBlur={(e) => handleOtherMedFieldChange('frequencyMAN', e.currentTarget.textContent || '')} 
                      style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                    >
                      {otherMed.frequencyMAN || '________'}
                    </span>
                  </td>
                  <td style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}>
                    <span 
                      contentEditable={isEditMode} 
                      suppressContentEditableWarning 
                      onBlur={(e) => handleOtherMedFieldChange('durationDays', e.currentTarget.textContent || '')} 
                      style={{ outline: isEditMode ? '1px dashed #0284c7' : 'none' }}
                    >
                      {otherMed.durationDays ? `${otherMed.durationDays} days` : '____ days'}
                    </span>
                  </td>
                  {isEditMode && !isPdfExporting && (
                    <td className="no-print" style={{ border: '1px solid #000000', padding: '3px', textAlign: 'center' }}></td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick button to add extra custom medication rows */}
          {isEditMode && !isPdfExporting && (
            <div className="no-print" style={{ marginTop: '6px', textAlign: 'right' }}>
              <button
                type="button"
                onClick={handleAddCustomRow}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#0284c7',
                  cursor: 'pointer'
                }}
              >
                + Add Another Medication Row
              </button>
            </div>
          )}
        </div>

        {/* SECTION: PLAN / FOLLOW-UP */}
        <div style={{ marginBottom: '16px' }}>
          {procedureType === 'Cervical Cerclage' ? (
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #94a3b8', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
                PLAN
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', lineHeight: '1.6' }}>
                <li>Continue prenatal vitamins and current pregnancy medications, including progesterone if prescribed</li>
                <li>
                  Pelvic rest until cleared. Activity:{' '}
                  {renderTickBox(instructions.activityLevel === 'As tolerated', 'No restriction beyond pelvic rest', () => handleTextChange(['instructions', 'activityLevel'], 'As tolerated'))}
                  {renderTickBox(instructions.activityLevel !== 'As tolerated', `Modified activity: ${instructions.activityDetails || ''}`, () => handleTextChange(['instructions', 'activityLevel'], 'Modified activity'))}
                </li>
                <li>Follow-up in 1–2 weeks (<span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['instructions', 'followupAppointmentDate'], e.currentTarget.textContent || '')}>{instructions.followupAppointmentDate || 'Date: ____________'}</span>); continue routine prenatal care ± cervical length surveillance</li>
                <li>Planned cerclage removal at 36–37 weeks, or earlier for labor / rupture of membranes</li>
              </ul>
            </div>
          ) : (
            <div style={{ fontSize: '11.5px' }}>
              <strong>Follow-up:</strong> Office visit in <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['instructions', 'followupAppointmentDate'], e.currentTarget.textContent || '')}>{instructions.followupAppointmentDate || '1–2 weeks'}</span>; pathology results to be reviewed.
            </div>
          )}
        </div>

        {/* SIGN-OFF SECTION WITH BIG CLICKABLE CONDITION CHECKBOXES */}
        <div style={{ borderTop: '1px solid #94a3b8', paddingTop: '10px', marginTop: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '11.5px', marginBottom: '6px' }}>SIGN-OFF</div>
          
          <div style={{ fontSize: '11.5px', marginBottom: '14px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <strong>Condition at discharge:</strong>{' '}
            {renderTickBox(instructions.conditionAtDischarge.stable, 'Stable', () => handleToggleCondition('stable'))}
            {renderTickBox(instructions.conditionAtDischarge.ambulating, 'Ambulating', () => handleToggleCondition('ambulating'))}
            {renderTickBox(instructions.conditionAtDischarge.toleratingPO, 'Tolerating PO', () => handleToggleCondition('toleratingPO'))}
            {renderTickBox(instructions.conditionAtDischarge.voiding, 'Voiding', () => handleToggleCondition('voiding'))}
            {renderTickBox(instructions.conditionAtDischarge.painControlled, 'Pain controlled', () => handleToggleCondition('painControlled'))}
          </div>

          <div className="signoff-container">
            <div>
              <strong>Physician signature:</strong>{' '}
              {approvals.consultantSignatureImage ? (
                <img src={approvals.consultantSignatureImage} alt="Sig" style={{ height: '35px', verticalAlign: 'middle', marginLeft: '8px' }} />
              ) : (
                <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['approvals', 'consultantDoctorName'], e.currentTarget.textContent || '')}>_____________________________</span>
              )}
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['patientInfo', 'attendingDoctor'], e.currentTarget.textContent || '')}>
                  {approvals.consultantDoctorName || patientInfo.attendingDoctor}
                </span>
              </div>
            </div>

            <div>
              <strong>Date/time:</strong>{' '}
              <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['approvals', 'consultantSignedAt'], e.currentTarget.textContent || '')}>
                {approvals.consultantSignedAt || new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 2: PATIENT DISCHARGE INSTRUCTIONS */}
      <div className="paper-page" style={{
        background: '#ffffff',
        color: '#000000',
        fontFamily: "'Segoe UI', Arial, sans-serif",
        fontSize: '12px',
        lineHeight: '1.5',
        padding: '36px 40px',
        maxWidth: '850px',
        margin: '0 auto',
        border: '1px solid #cbd5e1',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        pageBreakBefore: 'always'
      }}>
        {/* Hospital Branding Letterhead */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '18px', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px' }}>
          <img src="/logo.jpg" alt="ASCAS Logo" style={{ height: '75px', width: '75px', objectFit: 'contain' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 2px 0', letterSpacing: '0.5px', color: '#000000' }}>
              ASCAS FERTILITY AND WOMEN'S CENTRE
            </div>
            <div style={{ fontSize: '11px', color: '#333333', margin: '2px 0' }}>
              No. 14, Arunachalam Road, next to VB World, Saligramam, Chennai – 600093
            </div>
            <div style={{ fontSize: '11px', color: '#333333', margin: '2px 0' }}>
              Tel: 093452 93609 | Email: accumedspecialityclinic@gmail.com
            </div>
          </div>
        </div>

        {/* Document Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #000000', paddingBottom: '10px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 2px 0', letterSpacing: '1px', textTransform: 'uppercase', color: '#000000' }}>
            PATIENT DISCHARGE INSTRUCTIONS
          </h1>
          <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#333333' }}>
            {procedureType === 'Hysteroscopy' && 'After your hysteroscopy'}
            {procedureType === 'Cervical Cerclage' && 'After your cervical cerclage (cervical stitch)'}
            {procedureType === 'Dilation & Curettage (D&C)' && 'After your D&C (dilation and curettage)'}
            {procedureType === 'General Procedure' && 'After your surgical procedure / hospital stay'}
          </div>
        </div>

        {/* Patient Info */}
        <div style={{ marginBottom: '18px', fontSize: '12px', lineHeight: '1.6' }}>
          <div>
            <strong>Patient name:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['patientInfo', 'patientName'], e.currentTarget.textContent || '')} style={{ fontWeight: 600 }}>
              {patientInfo.patientName || '____________________________________'}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </div>
          <div>
            <strong>Procedure performed:</strong>{' '}
            <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['procedureDetails', 'proceduresPerformed'], e.currentTarget.textContent || '')}>
              {procedureDetails.proceduresPerformed || procedureType}
            </span>
          </div>
        </div>

        {/* WHAT TO EXPECT */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
            WHAT TO EXPECT
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', lineHeight: '1.6' }}>
            {instructionsTemplate.whatToExpect.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* PAIN RELIEF */}
        {instructionsTemplate.painRelief && instructionsTemplate.painRelief.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
              PAIN RELIEF
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', lineHeight: '1.6' }}>
              {instructionsTemplate.painRelief.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* CALL US IMMEDIATELY */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase', color: '#b91c1c' }}>
            CALL US IMMEDIATELY / GO TO THE EMERGENCY DEPARTMENT IF YOU HAVE
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', lineHeight: '1.6' }}>
            {instructionsTemplate.callImmediatelySigns.map((item, i) => (
              <li key={i} style={{ marginBottom: '2px' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* FOLLOW-UP & CONTACT */}
        <div style={{ borderTop: '1px solid #000000', paddingTop: '12px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase' }}>
            FOLLOW-UP & CONTACT
          </div>
          <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
            <div>
              <strong>Follow-up appointment: Date:</strong>{' '}
              <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['instructions', 'followupAppointmentDate'], e.currentTarget.textContent || '')}>
                {instructions.followupAppointmentDate || '______________'}
              </span>{' '}
              <strong>Time:</strong>{' '}
              <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['instructions', 'followupAppointmentTime'], e.currentTarget.textContent || '')}>
                {instructions.followupAppointmentTime || '__________'}
              </span>{' '}
              <strong>With:</strong>{' '}
              <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['instructions', 'followupDoctor'], e.currentTarget.textContent || '')}>
                {instructions.followupDoctor || '______________________'}
              </span>
            </div>
            <div>
              <strong>Clinic phone:</strong>{' '}
              <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['instructions', 'clinicPhone'], e.currentTarget.textContent || '')}>
                {instructions.clinicPhone || '____________________'}
              </span>{' '}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <strong>After-hours/on-call:</strong>{' '}
              <span contentEditable={isEditMode} suppressContentEditableWarning onBlur={(e) => handleTextChange(['instructions', 'afterHoursOnCallPhone'], e.currentTarget.textContent || '')}>
                {instructions.afterHoursOnCallPhone || '____________________'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
