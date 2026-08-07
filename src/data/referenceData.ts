import { DischargeSummaryData, ProcedureType } from '../types/discharge';

export const SAMPLE_PATIENTS_LIST = [
  {
    patientName: "Mrs. Anitha Raj",
    uhid: "UHID-2026-90412",
    ipNumber: "IP-48912",
    ageYears: 29,
    gender: "Female" as const,
    bedNumber: "Room 304 (Single Suite)",
    admissionDateTime: "2026-07-21T09:30",
    dischargeDateTime: "2026-07-25T11:00",
    lengthOfStay: "4 Days, 1 Hour",
    attendingDoctor: "Dr. A. Parvathy, MD, DNB (OBG)",
    department: "Gynecological Surgery & ART",
    procedureType: "Cervical Cerclage" as const
  },
  {
    patientName: "Mrs. Priya Sharma",
    uhid: "UHID-2026-88123",
    ipNumber: "IP-48110",
    ageYears: 32,
    gender: "Female" as const,
    bedNumber: "Room 208 (Day Care Bed 2)",
    admissionDateTime: "2026-07-24T08:00",
    dischargeDateTime: "2026-07-24T18:00",
    lengthOfStay: "10 Hours",
    attendingDoctor: "Dr. S. Meenakshi, MS (OBG)",
    department: "Reproductive Medicine",
    procedureType: "Dilation & Curettage (D&C)" as const
  },
  {
    patientName: "Mrs. Sunitha Sundaram",
    uhid: "UHID-2026-91044",
    ipNumber: "IP-49021",
    ageYears: 35,
    gender: "Female" as const,
    bedNumber: "Suite 401",
    admissionDateTime: "2026-07-23T10:00",
    dischargeDateTime: "2026-07-25T12:00",
    lengthOfStay: "2 Days, 2 Hours",
    attendingDoctor: "Dr. R. Shalini, MD (OBG), FRM",
    department: "Endoscopic Surgery & IVF",
    procedureType: "Hysteroscopy" as const
  },
  {
    patientName: "Mrs. Lakshmi Devi",
    uhid: "UHID-2026-95400",
    ipNumber: "IP-49502",
    ageYears: 41,
    gender: "Female" as const,
    bedNumber: "Room 112 (Special Ward)",
    admissionDateTime: "2026-07-20T14:30",
    dischargeDateTime: "2026-07-24T10:00",
    lengthOfStay: "3 Days, 19 Hours",
    attendingDoctor: "Dr. K. Vasanth, MS (Gen Surg)",
    department: "General & Laparoscopic Surgery",
    procedureType: "General Procedure" as const
  }
];

export const PROCEDURE_INSTRUCTIONS_TEMPLATES: Record<ProcedureType, {
  whatToExpect: string[];
  painRelief: string[];
  callImmediatelySigns: string[];
  defaultDiet: string;
  defaultActivity: string;
  defaultWoundCare: string;
}> = {
  'General Procedure': {
    whatToExpect: [
      "Mild discomfort or soreness near the procedure site for 1-3 days — this is normal.",
      "Gradual return to normal energy levels over 3-7 days as recovery progresses."
    ],
    painRelief: [
      "Take pain medication as prescribed on your discharge medication list.",
      "Rest adequately and avoid straining."
    ],
    callImmediatelySigns: [
      "Fever ≥ 100.4°F (38°C) or chills",
      "Heavy bleeding, severe or worsening pain not relieved by medication",
      "Wound redness, swelling, or purulent drainage",
      "Vomiting, shortness of breath, or chest pain — return to Emergency Department"
    ],
    defaultDiet: "Regular healthy diet with high fiber and adequate oral fluid intake.",
    defaultActivity: "As tolerated. Avoid heavy lifting (>5 kg) or strenuous exertion for 1-2 weeks.",
    defaultWoundCare: "Keep incision clean and dry. Change dressing as advised by your physician."
  },
  'Dilation & Curettage (D&C)': {
    whatToExpect: [
      "Cramping like a period for 1–3 days — this is normal.",
      "Light bleeding or spotting for up to 2 weeks. It may stop and start.",
      "Your next period usually comes in 4–6 weeks. Ovulation can happen as early as 2 weeks — use contraception if you do not wish to become pregnant."
    ],
    painRelief: [
      "Take the pain medication prescribed on your discharge medication list.",
      "A heating pad on the lower abdomen helps with cramps."
    ],
    callImmediatelySigns: [
      "Heavy bleeding: soaking one full pad per hour for 2 hours in a row, or passing clots larger than a golf ball",
      "Fever of 100.4°F (38°C) or higher, or chills",
      "Severe or worsening abdominal pain not relieved by medication",
      "Foul-smelling vaginal discharge",
      "Dizziness, fainting, or shortness of breath",
      "No period within 6–8 weeks (and a negative pregnancy test)"
    ],
    defaultDiet: "Regular diet. Stay well hydrated.",
    defaultActivity: "Pelvic rest (no sexual intercourse, no tampons, no douching) until cleared by doctor at follow-up.",
    defaultWoundCare: "Maintain good perineal hygiene. Use sanitary pads instead of tampons."
  },
  'Hysteroscopy': {
    whatToExpect: [
      "Mild cramping for 24–48 hours.",
      "Light spotting or watery, pink discharge for up to 1 week (leftover fluid from the procedure).",
      "Bloating or shoulder-tip discomfort for about a day if gas or fluid was used — walking helps."
    ],
    painRelief: [
      "Take the pain medication prescribed on your discharge medication list.",
      "A heating pad on the lower abdomen helps with cramps."
    ],
    callImmediatelySigns: [
      "Heavy bleeding: soaking one full pad per hour for 2 hours in a row",
      "Fever of 100.4°F (38°C) or higher, or chills",
      "Severe or worsening abdominal pain not relieved by medication",
      "Foul-smelling vaginal discharge",
      "Trouble urinating or burning with urination that worsens",
      "Shortness of breath, chest pain, or severe nausea/vomiting"
    ],
    defaultDiet: "Regular diet as tolerated.",
    defaultActivity: "Pelvic rest until watery discharge subsides. Light ambulation recommended.",
    defaultWoundCare: "Use sanitary pads. No vaginal douching or tampons until cleared."
  },
  'Cervical Cerclage': {
    whatToExpect: [
      "Light spotting for 1–2 days and mild cramping for 1–2 days — this is normal.",
      "A small amount of increased vaginal discharge can be normal for the rest of pregnancy.",
      "The stitch is usually removed around 36–37 weeks, in the office or hospital."
    ],
    painRelief: [
      "Continue prenatal vitamins and current pregnancy medications, including progesterone if prescribed.",
      "Rest in bed or modified activity as instructed."
    ],
    callImmediatelySigns: [
      "Contractions or cramping that comes regularly (more than 4–6 per hour) or is getting stronger",
      "Leaking of fluid from the vagina, or a sudden gush of fluid (Rupture of Membranes)",
      "Vaginal bleeding heavier than light spotting",
      "Fever of 100.4°F (38°C) or higher, or chills",
      "Foul-smelling vaginal discharge",
      "Pelvic pressure or a feeling that something is 'bulging' in the vagina",
      "Decreased movement of your baby (if you are far enough along to feel movement)"
    ],
    defaultDiet: "High fiber diet with adequate hydration to prevent constipation and straining.",
    defaultActivity: "Strict pelvic rest (no intercourse). No restriction beyond pelvic rest / modified activity as specified.",
    defaultWoundCare: "Pelvic rest until cleared. Cervical surveillance scan scheduled in 1-2 weeks."
  },
  'Other': {
    whatToExpect: [
      "Follow specific recovery guidelines as instructed by your surgeon.",
      "Rest and recover as advised."
    ],
    painRelief: [
      "Take prescribed medications as directed."
    ],
    callImmediatelySigns: [
      "Fever or chills",
      "Severe pain not relieved by medication",
      "Heavy bleeding or abnormal discharge",
      "Any sudden shortness of breath or chest pain"
    ],
    defaultDiet: "Regular or as tolerated.",
    defaultActivity: "Rest as tolerated. Avoid strenuous activities.",
    defaultWoundCare: "Keep wound/site clean and dry."
  }
};

export const INITIAL_DISCHARGE_DATA: DischargeSummaryData = {
  patientInfo: {
    hospitalName: "ASCAS FERTILITY & WOMEN'S CENTER",
    hospitalTagline: "Multi-Speciality Hospital & Advanced Reproductive Medicine",
    hospitalLogoUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=120&auto=format&fit=crop&q=80",
    patientName: "Mrs. Anitha Raj",
    uhid: "UHID-2026-90412",
    ipNumber: "IP-48912",
    ageYears: 29,
    ageMonths: 4,
    gender: "Female",
    bedNumber: "Room 304 (Single Suite)",
    admissionDateTime: "2026-07-21T09:30",
    dischargeDateTime: "2026-07-25T11:00",
    lengthOfStay: "4 Days, 1 Hour",
    attendingDoctor: "Dr. A. Parvathy, MD, DNB (OBG), FRM",
    assistantDoctor: "Dr. K. Srinivas, MS",
    department: "Gynecological Surgery & Reproductive Medicine",
    currentStatus: "Draft",
    saveStatus: "Saved",
    lastSavedAt: "Just now",
    procedureType: "Cervical Cerclage"
  },
  admittingDiagnosis: "G2 P0 A1 L0 at 16 weeks 4 days Gestation with Cervical Incompetence (Short Cervix 18 mm)",
  dischargeDiagnosis: "Post Cervical Cerclage (McDonald technique with Mersilene tape) - Single Live Intrauterine Pregnancy 16+4 weeks",
  icd10Codes: "N88.3 (Cervical Incompetence), O34.3 (Maternal care for cervical incompetence)",
  obstetricFertility: {
    isObstetricOrFertilityCase: true,
    gestationalWeeks: 16,
    gestationalDays: 4,
    edd: "2026-12-31",
    obstetricGravida: 2,
    obstetricPara: 0,
    obstetricAbortions: 1,
    obstetricLiving: 0,
    priorLossesOrPTB: "1 Spontaneous Abortion at 18 weeks (2025)",
    indicationType: "Ultrasound-indicated",
    cervicalLengthMm: 18,
    artProtocol: "FET Cycle (Hormone Replacement Therapy)",
    opuDate: "2026-05-10",
    etDate: "2026-06-02",
    embryosTransferredCount: 1,
    embryoGrade: "4AA Blastocyst",
    cryolocksUsedCount: 1,
    lutealSupportMeds: "T. Progynova 2mg 1-0-1, Inj. Susten 100mg IM Alternate Days"
  },
  procedureDetails: {
    proceduresPerformed: "McDonald Cervical Cerclage under Spinal Anesthesia",
    procedureDate: "2026-07-22T10:15",
    surgeon: "Dr. A. Parvathy",
    assistantSurgeon: "Dr. K. Srinivas",
    anaesthetist: "Dr. R. Varma, MD (Anaesth)",
    anaesthesiaType: "Spinal",
    estimatedBloodLossMl: "20 mL",
    operativeTimeMinutes: "35 min",
    preOpFetalHeartRate: "154 bpm",
    postOpFetalHeartRate: "152 bpm",
    cerclageType: "McDonald cerclage",
    sutureMaterial: "Mersilene tape",
    complicationsOption: "None",
    complicationsDetails: "Procedure completed uneventfully. No membrane rupture or active bleeding.",
    specimensOption: "None",
    specimenDetails: "N/A",
    rhStatus: "Positive",
    rhImmunoglobinGiven: "N/A",
    descriptionOfProcedure: `Under adequate spinal / epidural anesthesia in the dorsal lithotomy position, the patient was prepped and draped in sterile fashion and the bladder emptied. The cervix was exposed with a weighted speculum and retractors and grasped gently with ring forceps. A Mersilene tape was placed in purse-string fashion circumferentially around the cervix near the level of the internal os, taking bites at approximately 12, 9, 6, and 3 o'clock and avoiding the lateral vessels. The tape was drawn snug to close the internal os and tied posteriorly, with suture ends left long to facilitate later removal. Hemostasis was confirmed. The patient tolerated the procedure well and was shifted to recovery in stable condition, with no contractions, rupture of membranes, or significant bleeding observed.`
  },
  inpatientCourse: {
    hospitalCourse: "Patient was admitted electively and pre-operative workup including investigations and anesthesia fitness were completed. Post-operatively, patient was hemodynamically stable, tolerated orally, pain managed, and was discharged in satisfactory condition with medications and follow-up advice.",
    dailyProgressNotes: "Day 1 (21/07): Admitted, pre-op workup completed. Vital signs stable.\nDay 2 (22/07): McDonald cerclage performed under Spinal Anesthesia. FHT 152 bpm. Pain managed with oral analgesics.\nDay 3 (23/07): Afebrile, no spotting, fetal heart tones 150 bpm. Ambulating well.\nDay 4 (24/07): Stable, voiding clear, cleared for discharge with discharge medication and pelvic rest instructions.",
    icuStayRequired: false,
    icuDaysCount: 0,
    mechanicalVentilationDays: 0,
    inotropesUsed: "None",
    linesAndTubes: "Peripheral IV Line (Removed prior to discharge)",
    surgicalDrains: "None",
    nursingNotes: "Patient educated regarding pelvic rest, activity restriction, and warning signs. All discharge medications explained.",
    physiotherapyAdvice: "Light ambulation only; avoid heavy lifting (>5 kg) or strenuous exercise."
  },
  medications: [
    {
      id: "med-1",
      selected: true,
      medicationName: "T. Taxim",
      genericName: "Cefixime",
      strength: "200 mg",
      dosage: "1 Tab",
      frequencyMAN: "1-0-1",
      durationDays: "5",
      route: "Oral",
      foodTiming: "After Food",
      instructions: "Complete the full antibiotic course",
      statusType: "New"
    },
    {
      id: "med-2",
      selected: true,
      medicationName: "T. Pan",
      genericName: "Pantoprazole",
      strength: "40 mg",
      dosage: "1 Tab",
      frequencyMAN: "1-0-1",
      durationDays: "5",
      route: "Oral",
      foodTiming: "Before Food",
      instructions: "Take 30 mins before food",
      statusType: "New"
    },
    {
      id: "med-3",
      selected: true,
      medicationName: "T. Acton-OR",
      genericName: "Paracetamol ER",
      strength: "1 gm",
      dosage: "1 Tab",
      frequencyMAN: "1-1-1",
      durationDays: "3",
      route: "Oral",
      foodTiming: "After Food",
      instructions: "For mild pain / cramps as needed",
      statusType: "New"
    },
    {
      id: "med-4",
      selected: true,
      medicationName: "T. Progynova",
      genericName: "Estradiol valerate",
      strength: "2 mg",
      dosage: "1 Tab",
      frequencyMAN: "1-0-1",
      durationDays: "30",
      route: "Oral",
      foodTiming: "After Food",
      instructions: "Continue ongoing pregnancy medication",
      statusType: "Continued"
    },
    {
      id: "med-5",
      selected: true,
      medicationName: "T. Meprate",
      genericName: "Medroxyprogesterone",
      strength: "10 mg",
      dosage: "1 Tab",
      frequencyMAN: "1-0-1",
      durationDays: "14",
      route: "Oral",
      foodTiming: "After Food",
      instructions: "Take regularly at same time daily",
      statusType: "Continued"
    }
  ],
  investigations: [
    {
      id: "inv-1",
      investigationName: "Hemoglobin (Hb)",
      resultValue: "11.8 g/dL",
      referenceRange: "11.5 - 15.0 g/dL",
      status: "Normal",
      remarks: "Satisfactory pre-op Hb"
    },
    {
      id: "inv-2",
      investigationName: "Transvaginal Ultrasound (Cervical Length)",
      resultValue: "18 mm (Internal os closed post-cerclage)",
      referenceRange: "> 25 mm",
      status: "Abnormal",
      remarks: "Short cervix prior to procedure; closed post-stitch"
    },
    {
      id: "inv-3",
      investigationName: "Urine Routine & Culture",
      resultValue: "No Pus Cells / Sterile",
      referenceRange: "Sterile",
      status: "Normal",
      remarks: "UTI ruled out"
    }
  ],
  pastProcedures: [
    {
      id: "proc-1",
      procedureName: "McDonald Cervical Cerclage",
      date: "2026-07-22",
      surgeon: "Dr. A. Parvathy",
      assistant: "Dr. K. Srinivas",
      anaesthetist: "Dr. R. Varma",
      remarks: "Purse string Mersilene tape placed at internal os"
    }
  ],
  implants: [
    {
      id: "imp-1",
      deviceName: "5mm Mersilene Tape (Ethicon)",
      serialNumber: "LOT-99214A",
      manufacturer: "Johnson & Johnson",
      siteLocation: "Cervix Internal Os",
      expiryDate: "2029-11"
    }
  ],
  transfusions: [],
  consultations: [
    {
      id: "con-1",
      department: "Anesthesiology",
      consultantDoctor: "Dr. R. Varma",
      consultationDate: "2026-07-21",
      recommendations: "Fit for Spinal Anesthesia (ASA Grade I)"
    }
  ],
  instructions: {
    conditionAtDischarge: {
      stable: true,
      ambulating: true,
      toleratingPO: true,
      voiding: true,
      painControlled: true,
      afebrile: true
    },
    dietAdvice: "Regular",
    dietAdviceDetails: "High fiber diet with plenty of oral fluids to prevent constipation and straining.",
    activityLevel: "Pelvic rest",
    activityDetails: "Strict pelvic rest (no sexual intercourse, no douching, no tampons). Avoid strenuous physical exercise or lifting heavy weights.",
    woundPelvicCare: "Maintain good perineal hygiene. Light spotting or mild cramping for 1-2 days is expected. Planned cerclage removal at 36-37 weeks.",
    warningSigns: {
      fever: true,
      heavyBleeding: true,
      severePain: true,
      woundRednessDrainage: false,
      vomiting: false,
      shortnessOfBreath: false,
      chestPain: false,
      foulVaginalDischarge: true,
      suddenFluidGush: true,
      reducedFetalMovement: true
    },
    pendingResultsOption: "None",
    pendingResultsDetails: "Routine pathology clearance obtained",
    pendingFollowupDoctor: "Dr. A. Parvathy",
    followupAppointmentDate: "2026-08-01",
    followupAppointmentTime: "10:30 AM",
    followupDoctor: "Dr. A. Parvathy",
    followupDepartment: "Reproductive Medicine Clinic",
    clinicPhone: "+91 44 2819 0000 / +91 98400 12345",
    afterHoursOnCallPhone: "+91 44 2819 0999 (Emergency Triage)"
  },
  approvals: {
    consultantApproval: true,
    consultantDoctorName: "Dr. A. Parvathy, MD, DNB (OBG)",
    consultantRegNo: "TN-MMC-74910",
    consultantSignedAt: "2026-07-24 10:45 AM",
    consultantSignatureImage: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60' viewBox='0 0 200 60'><path d='M10 40 Q30 10 50 35 T90 20 T130 40 T170 15' stroke='%230284c7' stroke-width='2.5' fill='none'/><text x='10' y='55' font-family='sans-serif' font-size='10' fill='%2364748b'>Signed Digitally (Reg: TN-MMC-74910)</text></svg>",

    medicalSuperintendentApproval: true,
    superintendentName: "Dr. V. Ramanathan, MS, MCh (Medical Supt)",
    superintendentSignedAt: "2026-07-24 11:15 AM",

    nurseConfirmation: true,
    nurseName: "Sr. Deepa Thomas, RN",
    nurseConfirmedAt: "2026-07-24 11:30 AM",

    finalizedBy: "Dr. A. Parvathy",
    finalizedAt: "2026-07-24 11:35 AM",
    finalRemarks: "Patient cleared for discharge with complete instructions provided to patient and relative."
  },
  auditHistory: [
    {
      id: "aud-1",
      version: "1.0",
      action: "Initial Summary Created",
      modifiedBy: "Dr. K. Srinivas (Resident Doctor)",
      timestamp: "2026-07-24 09:15 AM",
      summaryOfChanges: "Draft created from admission & operative records"
    },
    {
      id: "aud-2",
      version: "1.1",
      action: "Medications & Instructions Updated",
      modifiedBy: "Dr. A. Parvathy (Consultant)",
      timestamp: "2026-07-24 10:30 AM",
      summaryOfChanges: "Added post-op medication schedule and cerclage removal review date"
    },
    {
      id: "aud-3",
      version: "1.2",
      action: "Finalized & Approved",
      modifiedBy: "Dr. A. Parvathy",
      timestamp: "2026-07-24 11:35 AM",
      summaryOfChanges: "Digital signature attached. Status set to Finalized."
    }
  ]
};

// Full Preset Record Map for Instant Patient Switch
export const PATIENT_RECORD_DATABASE: Record<string, DischargeSummaryData> = {
  "UHID-2026-90412": INITIAL_DISCHARGE_DATA,
  "UHID-2026-88123": {
    ...INITIAL_DISCHARGE_DATA,
    patientInfo: {
      ...INITIAL_DISCHARGE_DATA.patientInfo,
      patientName: "Mrs. Priya Sharma",
      uhid: "UHID-2026-88123",
      ipNumber: "IP-48110",
      ageYears: 32,
      gender: "Female",
      bedNumber: "Room 208 (Day Care Bed 2)",
      admissionDateTime: "2026-07-24T08:00",
      dischargeDateTime: "2026-07-24T18:00",
      lengthOfStay: "10 Hours",
      attendingDoctor: "Dr. S. Meenakshi, MS (OBG)",
      department: "Reproductive Medicine",
      procedureType: "Dilation & Curettage (D&C)"
    },
    admittingDiagnosis: "G1 P0 A1 at 8 weeks Gestation with Retained Products of Conception (Incomplete Miscarriage)",
    dischargeDiagnosis: "Post Suction & Sharp Dilation and Curettage (D&C) - Products of Conception Evacuated Completely",
    icd10Codes: "O03.4 (Incomplete abortion without complication)",
    procedureDetails: {
      ...INITIAL_DISCHARGE_DATA.procedureDetails,
      proceduresPerformed: "Suction & Sharp Dilation and Curettage (D&C)",
      procedureDate: "2026-07-24T10:30",
      surgeon: "Dr. S. Meenakshi",
      assistantSurgeon: "Dr. N. Rajesh",
      anaesthetist: "Dr. R. Varma",
      anaesthesiaType: "MAC/sedation",
      estimatedBloodLossMl: "35 mL",
      operativeTimeMinutes: "20 min",
      specimensOption: "Sent",
      specimenDetails: "Products of conception sent to histopathology & genetics",
      rhStatus: "Positive",
      rhImmunoglobinGiven: "N/A",
      descriptionOfProcedure: `Under adequate MAC sedation in the dorsal lithotomy position, the patient was prepped and draped in sterile fashion and the bladder emptied. Bimanual examination revealed an anteverted, 8-week sized uterus. The anterior lip of cervix was grasped with a single-tooth tenaculum and uterus sounded to 8 cm. Suction curettage using size 8 cannula followed by gentle sharp curettage was performed until the cavity was empty and a gritty texture was appreciated in all 4 quadrants. Good hemostasis achieved. Specimen sent to pathology. Patient shifted to recovery in stable condition.`
    },
    inpatientCourse: {
      ...INITIAL_DISCHARGE_DATA.inpatientCourse,
      hospitalCourse: "Patient was admitted electively and pre-operative workup including investigations and anesthesia fitness were completed. Post-operatively, patient was hemodynamically stable, tolerated orally, pain managed, and was discharged in satisfactory condition with medications and follow-up advice.",
      dailyProgressNotes: "Day 1 (24/07 08:00): Admitted for Day Care D&C.\nDay 1 (24/07 10:30): D&C completed cleanly under MAC sedation.\nDay 1 (24/07 18:00): Voiding clear, afebrile, minimal spotting. Discharged home."
    },
    medications: [
      {
        id: "med-d1",
        selected: true,
        medicationName: "T. Taxim",
        genericName: "Cefixime",
        strength: "200 mg",
        dosage: "1 Tab",
        frequencyMAN: "1-0-1",
        durationDays: "5",
        route: "Oral",
        foodTiming: "After Food",
        instructions: "Antibiotic prophylaxis",
        statusType: "New"
      },
      {
        id: "med-d2",
        selected: true,
        medicationName: "T. Acton-OR",
        genericName: "Paracetamol ER",
        strength: "1 gm",
        dosage: "1 Tab",
        frequencyMAN: "1-1-1",
        durationDays: "3",
        route: "Oral",
        foodTiming: "After Food",
        instructions: "For uterine cramps as needed",
        statusType: "New"
      },
      {
        id: "med-d3",
        selected: true,
        medicationName: "T. Pan",
        genericName: "Pantoprazole",
        strength: "40 mg",
        dosage: "1 Tab",
        frequencyMAN: "1-0-1",
        durationDays: "5",
        route: "Oral",
        foodTiming: "Before Food",
        instructions: "Gastroprotection",
        statusType: "New"
      }
    ],
    instructions: {
      ...INITIAL_DISCHARGE_DATA.instructions,
      dietAdvice: "Regular",
      dietAdviceDetails: "Regular diet. Drink plenty of water.",
      activityLevel: "Pelvic rest",
      activityDetails: "Strict pelvic rest (no intercourse, no tampons, no douching) until 2-week follow-up.",
      woundPelvicCare: "Use sanitary pads. Light cramping for 1-3 days is normal.",
      followupAppointmentDate: "2026-08-05",
      followupDoctor: "Dr. S. Meenakshi"
    }
  },
  "UHID-2026-91044": {
    ...INITIAL_DISCHARGE_DATA,
    patientInfo: {
      ...INITIAL_DISCHARGE_DATA.patientInfo,
      patientName: "Mrs. Sunitha Sundaram",
      uhid: "UHID-2026-91044",
      ipNumber: "IP-49021",
      ageYears: 35,
      gender: "Female",
      bedNumber: "Suite 401",
      admissionDateTime: "2026-07-23T10:00",
      dischargeDateTime: "2026-07-25T12:00",
      lengthOfStay: "2 Days, 2 Hours",
      attendingDoctor: "Dr. R. Shalini, MD (OBG), FRM",
      department: "Endoscopic Surgery & IVF",
      procedureType: "Hysteroscopy"
    },
    admittingDiagnosis: "Primary Infertility with Endometrial Polyp (1.5 cm) on Transvaginal Sonography",
    dischargeDiagnosis: "Post Diagnostic & Operative Hysteroscopy with Polypectomy — Cavity Normal Post-Resection",
    icd10Codes: "N84.0 (Polyp of corpus uteri), N97.0 (Female infertility)",
    procedureDetails: {
      ...INITIAL_DISCHARGE_DATA.procedureDetails,
      proceduresPerformed: "Diagnostic Hysteroscopy & Hysteroscopic Polypectomy",
      procedureDate: "2026-07-24T09:15",
      surgeon: "Dr. R. Shalini",
      assistantSurgeon: "Dr. K. Srinivas",
      anaesthetist: "Dr. R. Varma",
      anaesthesiaType: "General",
      distensionMedium: "Normal saline",
      fluidDeficitMl: "120 mL",
      estimatedBloodLossMl: "15 mL",
      operativeTimeMinutes: "25 min",
      specimensOption: "Sent",
      specimenDetails: "Endometrial polyp tissue sent to histopathology",
      hysteroscopySubtypes: {
        diagnostic: true,
        polypectomy: true,
        myomectomy: false,
        septumResection: false,
        adhesiolysis: false,
        endometrialAblation: false,
        dcPerformed: true
      },
      descriptionOfProcedure: `Under adequate general anesthesia in the dorsal lithotomy position, the patient was prepped and draped in sterile fashion and the bladder emptied. The cervix was dilated to admit the 4mm operative hysteroscope. The hysteroscope was introduced under direct vision with Normal Saline distension. Systematic inspection revealed a 1.5 cm fundal endometrial polyp. Both tubal ostia were clear. Using hysteroscopic scissors and resectoscope, the polyp was completely excised at its base and retrieved. Good hemostasis verified. Fluid deficit recorded as 120 mL. Patient shifted to recovery in stable condition.`
    },
    medications: [
      {
        id: "med-h1",
        selected: true,
        medicationName: "T. Ceftum",
        genericName: "Cefuroxime",
        strength: "500 mg",
        dosage: "1 Tab",
        frequencyMAN: "1-0-1",
        durationDays: "5",
        route: "Oral",
        foodTiming: "After Food",
        instructions: "Prophylactic antibiotic",
        statusType: "New"
      },
      {
        id: "med-h2",
        selected: true,
        medicationName: "T. Novelon",
        genericName: "Desogestrel + ethinylestradiol",
        strength: "0.15mg+0.03mg",
        dosage: "1 Tab",
        frequencyMAN: "0-0-1",
        durationDays: "21",
        route: "Oral",
        foodTiming: "After Food",
        instructions: "Take 1 tablet daily at bedtime",
        statusType: "New"
      }
    ]
  },
  "UHID-2026-95400": {
    ...INITIAL_DISCHARGE_DATA,
    patientInfo: {
      ...INITIAL_DISCHARGE_DATA.patientInfo,
      patientName: "Mrs. Lakshmi Devi",
      uhid: "UHID-2026-95400",
      ipNumber: "IP-49502",
      ageYears: 41,
      gender: "Female",
      bedNumber: "Room 112 (Special Ward)",
      admissionDateTime: "2026-07-20T14:30",
      dischargeDateTime: "2026-07-24T10:00",
      lengthOfStay: "3 Days, 19 Hours",
      attendingDoctor: "Dr. K. Vasanth, MS (Gen Surg)",
      department: "General & Laparoscopic Surgery",
      procedureType: "General Procedure"
    },
    admittingDiagnosis: "Acute Appendicitis with Localized Peritonitis",
    dischargeDiagnosis: "Post Laparoscopic Appendectomy — Uneventful Recovery",
    icd10Codes: "K35.80 (Unspecified acute appendicitis)",
    procedureDetails: {
      ...INITIAL_DISCHARGE_DATA.procedureDetails,
      proceduresPerformed: "Laparoscopic Appendectomy",
      procedureDate: "2026-07-20T18:00",
      surgeon: "Dr. K. Vasanth",
      assistantSurgeon: "Dr. N. Rajesh",
      anaesthetist: "Dr. R. Varma",
      anaesthesiaType: "General",
      estimatedBloodLossMl: "30 mL",
      operativeTimeMinutes: "45 min",
      specimensOption: "Sent",
      specimenDetails: "Inflamed appendix specimen sent to pathology",
      descriptionOfProcedure: `Under general anesthesia with endotracheal intubation, patient prepped and draped in supine position. Umbilical 10mm port created. Pneumoperitoneum established. Inflamed appendix identified at cecal base, base doubly ligated with Endo-loops and transected. Hemostasis verified. Gas evacuated and port sites closed in layers.`
    }
  }
};

export const PRESET_MEDICATIONS = [
  { name: "T. Taxim", generic: "Cefixime", strength: "200 mg", dosage: "1 Tab", frequency: "1-0-1", route: "Oral", foodTiming: "After Food" },
  { name: "T. Ceftum", generic: "Cefuroxime", strength: "500 mg", dosage: "1 Tab", frequency: "1-0-1", route: "Oral", foodTiming: "After Food" },
  { name: "T. Pan", generic: "Pantoprazole", strength: "40 mg", dosage: "1 Tab", frequency: "1-0-1", route: "Oral", foodTiming: "Before Food" },
  { name: "T. Acton-OR", generic: "Paracetamol ER", strength: "1 gm", dosage: "1 Tab", frequency: "1-1-1", route: "Oral", foodTiming: "After Food" },
  { name: "T. Novelon", generic: "Desogestrel + ethinylestradiol", strength: "0.15mg+0.03mg", dosage: "1 Tab", frequency: "0-0-1", route: "Oral", foodTiming: "After Food" },
  { name: "T. Freedase", generic: "Trypsin + bromelain + rutoside", strength: "Standard", dosage: "1 Tab", frequency: "0-0-1", route: "Oral", foodTiming: "Before Food" },
  { name: "T. Progynova / Endofert", generic: "Estradiol valerate", strength: "2 mg", dosage: "1 Tab", frequency: "1-0-1", route: "Oral", foodTiming: "After Food" },
  { name: "T. Meprate / Nortas CR", generic: "Medroxyprogesterone / Norethisterone", strength: "10 mg", dosage: "1 Tab", frequency: "1-0-1", route: "Oral", foodTiming: "After Food" },
  { name: "T. Thyronorm", generic: "Levothyroxine", strength: "50 mcg", dosage: "1 Tab", frequency: "1-0-0", route: "Oral", foodTiming: "Empty Stomach" },
  { name: "T. Glycomet SR", generic: "Metformin SR", strength: "500 mg", dosage: "1 Tab", frequency: "1-0-1", route: "Oral", foodTiming: "After Food" }
];

export const PRESET_PROCEDURE_TEMPLATES: Record<ProcedureType, string> = {
  'General Procedure': `Under adequate anesthesia in sterile fashion, the procedure was performed without complications. Hemostasis was achieved. Patient shifted to recovery in stable condition.`,
  'Dilation & Curettage (D&C)': `Under adequate anesthesia in the dorsal lithotomy position, the patient was prepped and draped in sterile fashion and the bladder emptied. Examination under anesthesia revealed an anteverted, normal-sized uterus. The anterior lip of the cervix was grasped with a single-tooth tenaculum and the uterus sounded to 7 cm. Suction and/or gentle sharp curettage was performed until the cavity was empty and a gritty texture was appreciated in all quadrants. Instruments were removed with good hemostasis. Patient shifted to recovery in stable condition.`,
  'Hysteroscopy': `Under adequate anesthesia in the dorsal lithotomy position, the patient was prepped and draped in sterile fashion and the bladder emptied. The anterior lip of the cervix was grasped, the uterus sounded to 7 cm, and the cervix dilated to admit the 4 mm hysteroscope, which was introduced under direct vision with normal saline distension. A systematic survey of the endocervical canal and uterine cavity was performed; both tubal ostia were visualized and the endometrium appeared healthy. The hysteroscope was withdrawn with adequate hemostasis. Patient shifted to recovery in stable condition.`,
  'Cervical Cerclage': `Under adequate spinal / epidural anesthesia in the dorsal lithotomy position, the patient was prepped and draped in sterile fashion and the bladder emptied. The cervix was exposed with a weighted speculum and retractors and grasped gently with ring forceps. A Mersilene tape was placed in purse-string fashion circumferentially around the cervix near the level of the internal os, taking bites at approximately 12, 9, 6, and 3 o'clock and avoiding lateral vessels. The tape was drawn snug to close the internal os and tied posteriorly, with suture ends left long to facilitate later removal. Hemostasis was confirmed. Patient shifted to recovery in stable condition.`,
  'Other': `Under adequate anesthesia, the procedure was performed in sterile fashion. Good hemostasis achieved. Patient recovered well and shifted to ward.`
};

