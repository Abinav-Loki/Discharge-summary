import React from 'react';
import { ListChecks, Plus, Trash2, ShieldCheck, Droplet, UserCheck } from 'lucide-react';
import { ProcedureItem, ImplantDeviceItem, BloodTransfusionItem, ConsultationItem } from '../../types/discharge';

interface ProcedureHistorySectionProps {
  procedures: ProcedureItem[];
  implants: ImplantDeviceItem[];
  transfusions: BloodTransfusionItem[];
  consultations: ConsultationItem[];
  onProceduresChange: (updated: ProcedureItem[]) => void;
  onImplantsChange: (updated: ImplantDeviceItem[]) => void;
  onTransfusionsChange: (updated: BloodTransfusionItem[]) => void;
  onConsultationsChange: (updated: ConsultationItem[]) => void;
}

export const ProcedureHistorySection: React.FC<ProcedureHistorySectionProps> = ({
  procedures,
  implants,
  transfusions,
  consultations,
  onProceduresChange,
  onImplantsChange,
  onTransfusionsChange,
  onConsultationsChange
}) => {
  // Implants add/remove
  const handleAddImplant = () => {
    onImplantsChange([
      ...implants,
      {
        id: `imp-${Date.now()}`,
        deviceName: '',
        serialNumber: '',
        manufacturer: '',
        siteLocation: '',
        expiryDate: ''
      }
    ]);
  };

  const handleRemoveImplant = (id: string) => {
    onImplantsChange(implants.filter(i => i.id !== id));
  };

  // Transfusion add/remove
  const handleAddTransfusion = () => {
    onTransfusionsChange([
      ...transfusions,
      {
        id: `bt-${Date.now()}`,
        bloodProduct: 'PRBC',
        unitsTransfused: 1,
        transfusionDateTime: new Date().toISOString().substring(0, 16),
        reactionsOrRemarks: 'No adverse reactions'
      }
    ]);
  };

  const handleRemoveTransfusion = (id: string) => {
    onTransfusionsChange(transfusions.filter(t => t.id !== id));
  };

  return (
    <div className="his-card" id="procedures-implants">
      <div className="his-card-header">
        <h3>
          <ListChecks className="text-sky-600" size={20} /> Section 7: Procedures, Implants, Blood Transfusion & Consultations
        </h3>
      </div>

      <div className="his-card-body">
        {/* Implants & Devices */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} className="text-sky-600" /> Surgical Implants, Stents & Prosthetics
            </h4>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddImplant}>
              <Plus size={14} /> Add Device / Implant
            </button>
          </div>

          <div className="his-table-container">
            <table className="his-table">
              <thead>
                <tr>
                  <th>Device / Implant Name</th>
                  <th>Serial / Lot No</th>
                  <th>Manufacturer</th>
                  <th>Anatomical Site</th>
                  <th>Expiry Date</th>
                  <th style={{ width: '40px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {implants.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: 'var(--slate-500)', padding: '12px' }}>
                      No implants or devices recorded for this stay.
                    </td>
                  </tr>
                ) : (
                  implants.map((imp) => (
                    <tr key={imp.id}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={imp.deviceName}
                          onChange={(e) => {
                            const updated = implants.map(i => i.id === imp.id ? { ...i, deviceName: e.target.value } : i);
                            onImplantsChange(updated);
                          }}
                          placeholder="e.g. 5mm Mersilene Tape"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={imp.serialNumber}
                          onChange={(e) => {
                            const updated = implants.map(i => i.id === imp.id ? { ...i, serialNumber: e.target.value } : i);
                            onImplantsChange(updated);
                          }}
                          placeholder="LOT number"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={imp.manufacturer}
                          onChange={(e) => {
                            const updated = implants.map(i => i.id === imp.id ? { ...i, manufacturer: e.target.value } : i);
                            onImplantsChange(updated);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={imp.siteLocation}
                          onChange={(e) => {
                            const updated = implants.map(i => i.id === imp.id ? { ...i, siteLocation: e.target.value } : i);
                            onImplantsChange(updated);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={imp.expiryDate}
                          onChange={(e) => {
                            const updated = implants.map(i => i.id === imp.id ? { ...i, expiryDate: e.target.value } : i);
                            onImplantsChange(updated);
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button type="button" onClick={() => handleRemoveImplant(imp.id)} style={{ background: 'none', border: 'none', color: 'var(--danger-text)', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transfusion Details */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Droplet size={16} className="text-red-500" /> Blood Transfusion Log
            </h4>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddTransfusion}>
              <Plus size={14} /> Add Transfusion Log
            </button>
          </div>

          <div className="his-table-container">
            <table className="his-table">
              <thead>
                <tr>
                  <th>Blood Product</th>
                  <th>Units Transfused</th>
                  <th>Date & Time</th>
                  <th>Adverse Reactions / Remarks</th>
                  <th style={{ width: '40px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {transfusions.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--slate-500)', padding: '12px' }}>
                      No blood products transfused during hospital stay.
                    </td>
                  </tr>
                ) : (
                  transfusions.map((bt) => (
                    <tr key={bt.id}>
                      <td>
                        <select
                          className="form-control"
                          value={bt.bloodProduct}
                          onChange={(e) => {
                            const updated = transfusions.map(t => t.id === bt.id ? { ...t, bloodProduct: e.target.value as any } : t);
                            onTransfusionsChange(updated);
                          }}
                        >
                          <option value="PRBC">PRBC (Packed Red Cells)</option>
                          <option value="FFP">FFP (Fresh Frozen Plasma)</option>
                          <option value="Platelets">Platelets</option>
                          <option value="Whole Blood">Whole Blood</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={bt.unitsTransfused}
                          onChange={(e) => {
                            const updated = transfusions.map(t => t.id === bt.id ? { ...t, unitsTransfused: parseInt(e.target.value) || 0 } : t);
                            onTransfusionsChange(updated);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={bt.transfusionDateTime}
                          onChange={(e) => {
                            const updated = transfusions.map(t => t.id === bt.id ? { ...t, transfusionDateTime: e.target.value } : t);
                            onTransfusionsChange(updated);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={bt.reactionsOrRemarks}
                          onChange={(e) => {
                            const updated = transfusions.map(t => t.id === bt.id ? { ...t, reactionsOrRemarks: e.target.value } : t);
                            onTransfusionsChange(updated);
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button type="button" onClick={() => handleRemoveTransfusion(bt.id)} style={{ background: 'none', border: 'none', color: 'var(--danger-text)', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
