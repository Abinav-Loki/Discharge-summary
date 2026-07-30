import express from 'express';
import cors from 'cors';
import { INITIAL_DISCHARGE_DATA, PRESET_MEDICATIONS } from '../src/data/referenceData.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory store for demo / HIS draft state
let currentDischargeSummary = { ...INITIAL_DISCHARGE_DATA };

// 1. Get Current Discharge Summary
app.get('/api/discharge-summary', (req, res) => {
  res.json({
    success: true,
    data: currentDischargeSummary,
    timestamp: new Date().toISOString()
  });
});

// 2. Save / Auto-Save Discharge Summary
app.post('/api/discharge-summary', (req, res) => {
  const updatedData = req.body;
  if (!updatedData || !updatedData.patientInfo) {
    return res.status(400).json({ success: false, message: 'Invalid payload' });
  }

  currentDischargeSummary = {
    ...updatedData,
    patientInfo: {
      ...updatedData.patientInfo,
      lastSavedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      saveStatus: 'Saved'
    }
  };

  res.json({
    success: true,
    message: 'Discharge summary auto-saved successfully',
    lastSavedAt: currentDischargeSummary.patientInfo.lastSavedAt
  });
});

// 3. Auto-populate patient info by UHID
app.get('/api/patients/:uhid', (req, res) => {
  const { uhid } = req.params;
  res.json({
    success: true,
    patient: {
      uhid: uhid.toUpperCase(),
      patientName: "Mrs. Anitha Raj",
      ipNumber: "IP-48912",
      ageYears: 29,
      gender: "Female",
      bedNumber: "Room 304 (Single Suite)",
      attendingDoctor: "Dr. A. Parvathy, MD, DNB (OBG)",
      department: "Gynecological Surgery & Reproductive Medicine"
    }
  });
});

// 4. Search Medical Master Database (ICD-10, Medicines, Procedures)
app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').toString().toLowerCase();
  const type = req.query.type || 'medication';

  if (type === 'medication') {
    const results = PRESET_MEDICATIONS.filter(
      m => m.name.toLowerCase().includes(query) || m.generic.toLowerCase().includes(query)
    );
    return res.json({ success: true, results });
  }

  res.json({ success: true, results: [] });
});

// 5. Audit Trail & Version Logs
app.get('/api/audit-trail', (req, res) => {
  res.json({
    success: true,
    auditHistory: currentDischargeSummary.auditHistory || []
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', system: 'HIS Discharge Summary Module API v1.0' });
});

app.listen(PORT, () => {
  console.log(`[HIS Backend] Server running on http://localhost:${PORT}`);
});
