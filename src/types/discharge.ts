export type ProcedureType = 'General Procedure' | 'Dilation & Curettage (D&C)' | 'Hysteroscopy' | 'Cervical Cerclage' | 'Other';

export type DischargeStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Finalized' | 'Discharged';
export type SaveStatus = 'Saved' | 'Saving...' | 'Unsaved Changes';

export interface PatientInfo {
  hospitalName: string;
  hospitalTagline: string;
  hospitalLogoUrl: string;
  patientName: string;
  uhid: string;
  ipNumber: string;
  ageYears: number;
  ageMonths?: number;
  gender: 'Female' | 'Male' | 'Other';
  bedNumber: string;
  admissionDateTime: string;
  dischargeDateTime: string;
  lengthOfStay: string; // Auto-calculated
  attendingDoctor: string;
  assistantDoctor: string;
  department: string;
  currentStatus: DischargeStatus;
  saveStatus: SaveStatus;
  lastSavedAt?: string;
  procedureType: ProcedureType; // Dynamic Procedure Selection
}

export interface ObstetricFertilityDetails {
  isObstetricOrFertilityCase: boolean;
  gestationalWeeks?: number;
  gestationalDays?: number;
  edd?: string; // Estimated Due Date
  obstetricGravida?: number;
  obstetricPara?: number;
  obstetricAbortions?: number;
  obstetricLiving?: number;
  priorLossesOrPTB?: string;
  indicationType?: 'History-indicated' | 'Ultrasound-indicated' | 'Exam-indicated (rescue)';
  cervicalLengthMm?: number;
  artProtocol?: string;
  opuDate?: string; // Ova Pick Up
  etDate?: string;  // Embryo Transfer
  embryosTransferredCount?: number;
  embryoGrade?: string;
  cryolocksUsedCount?: number;
  lutealSupportMeds?: string;
}

export interface ProcedureDetails {
  proceduresPerformed: string;
  procedureDate: string;
  surgeon: string;
  assistantSurgeon: string;
  anaesthetist: string;
  anaesthesiaType: 'General' | 'Regional' | 'Spinal' | 'Epidural' | 'MAC/sedation' | 'Local' | 'Local/paracervical' | 'None';
  estimatedBloodLossMl: string;
  operativeTimeMinutes: string;
  preOpFetalHeartRate?: string;
  postOpFetalHeartRate?: string;

  // Cerclage Specific
  cerclageType?: 'McDonald cerclage' | 'Shirodkar cerclage';
  sutureMaterial?: 'Mersilene tape' | 'Other';

  // Hysteroscopy Specific
  hysteroscopySubtypes?: {
    diagnostic: boolean;
    polypectomy: boolean;
    myomectomy: boolean;
    septumResection: boolean;
    adhesiolysis: boolean;
    endometrialAblation: boolean;
    dcPerformed: boolean;
  };
  distensionMedium?: string;
  fluidDeficitMl?: string;

  complicationsOption: 'None' | 'See below';
  complicationsDetails: string;
  specimensOption: 'None' | 'Sent';
  specimenDetails: string; // Products of conception, Endometrial curettings, Karyotype/genetics sent, etc.
  rhStatus: 'Positive' | 'Negative';
  rhImmunoglobinGiven: 'Yes' | 'No' | 'N/A';
  descriptionOfProcedure: string;
}

export interface MedicationItem {
  id: string;
  selected: boolean;
  medicationName: string;
  genericName: string;
  strength: string;
  dosage: string;
  frequencyMAN: string; // e.g. 1-0-1, 1-1-1, 1-0-0
  durationDays: string;
  route: 'Oral' | 'IV' | 'IM' | 'SC' | 'Topical' | 'Vaginal' | 'Inhalation';
  foodTiming: 'Before Food' | 'After Food' | 'With Food' | 'Empty Stomach';
  instructions: string;
  statusType: 'Continued' | 'New' | 'Stopped';
}

export interface InvestigationItem {
  id: string;
  investigationName: string;
  resultValue: string;
  referenceRange: string;
  status: 'Normal' | 'Abnormal' | 'Critical' | 'Pending';
  remarks: string;
}

export interface ProcedureItem {
  id: string;
  procedureName: string;
  date: string;
  surgeon: string;
  assistant: string;
  anaesthetist: string;
  remarks: string;
}

export interface ImplantDeviceItem {
  id: string;
  deviceName: string;
  serialNumber: string;
  manufacturer: string;
  siteLocation: string;
  expiryDate: string;
}

export interface BloodTransfusionItem {
  id: string;
  bloodProduct: 'PRBC' | 'FFP' | 'Platelets' | 'Whole Blood' | 'Cryoprecipitate';
  unitsTransfused: number;
  transfusionDateTime: string;
  reactionsOrRemarks: string;
}

export interface ConsultationItem {
  id: string;
  department: string;
  consultantDoctor: string;
  consultationDate: string;
  recommendations: string;
}

export interface InpatientCourseDetails {
  hospitalCourse: string;
  dailyProgressNotes: string;
  icuStayRequired: boolean;
  icuDaysCount?: number;
  mechanicalVentilationDays?: number;
  inotropesUsed?: string;
  linesAndTubes?: string;
  surgicalDrains?: string;
  nursingNotes?: string;
  physiotherapyAdvice?: string;
}

export interface ProcedureSpecificInstructions {
  whatToExpect: string[];
  painRelief: string[];
  callImmediatelySigns: string[];
}

export interface DischargeInstructionsSummary {
  conditionAtDischarge: {
    stable: boolean;
    ambulating: boolean;
    toleratingPO: boolean;
    voiding: boolean;
    painControlled: boolean;
    afebrile: boolean;
  };
  dietAdvice: 'Regular' | 'Diabetic' | 'Low Salt' | 'Soft Diet' | 'High Protein' | 'Other';
  dietAdviceDetails: string;
  activityLevel: 'As tolerated' | 'Pelvic rest' | 'Modified activity' | 'Strict Bed Rest';
  activityDetails: string;
  woundPelvicCare: string;
  warningSigns: {
    fever: boolean;
    heavyBleeding: boolean;
    severePain: boolean;
    woundRednessDrainage: boolean;
    vomiting: boolean;
    shortnessOfBreath: boolean;
    chestPain: boolean;
    foulVaginalDischarge: boolean;
    suddenFluidGush: boolean;
    reducedFetalMovement: boolean;
  };
  customInstructionsText?: string;
  pendingResultsOption: 'None' | 'Pathology' | 'Labs' | 'Both';
  pendingResultsDetails: string;
  pendingFollowupDoctor: string;
  followupAppointmentDate: string;
  followupAppointmentTime: string;
  followupDoctor: string;
  followupDepartment: string;
  clinicPhone: string;
  afterHoursOnCallPhone: string;
}

export interface ApprovalsAndSignatures {
  consultantApproval: boolean;
  consultantDoctorName: string;
  consultantRegNo: string;
  consultantSignedAt?: string;
  consultantSignatureImage?: string;

  medicalSuperintendentApproval: boolean;
  superintendentName?: string;
  superintendentSignedAt?: string;
  superintendentSignatureImage?: string;

  nurseConfirmation: boolean;
  nurseName: string;
  nurseConfirmedAt?: string;

  finalizedBy?: string;
  finalizedAt?: string;
  finalRemarks: string;
}

export interface AuditLogEntry {
  id: string;
  version: string;
  action: string;
  modifiedBy: string;
  timestamp: string;
  summaryOfChanges: string;
}

export interface DischargeSummaryData {
  patientInfo: PatientInfo;
  admittingDiagnosis: string;
  dischargeDiagnosis: string;
  icd10Codes: string;
  obstetricFertility: ObstetricFertilityDetails;
  procedureDetails: ProcedureDetails;
  inpatientCourse: InpatientCourseDetails;
  medications: MedicationItem[];
  investigations: InvestigationItem[];
  pastProcedures: ProcedureItem[];
  implants: ImplantDeviceItem[];
  transfusions: BloodTransfusionItem[];
  consultations: ConsultationItem[];
  instructions: DischargeInstructionsSummary;
  approvals: ApprovalsAndSignatures;
  auditHistory: AuditLogEntry[];
}
