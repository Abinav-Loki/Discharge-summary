import React, { useState } from 'react';
import { Pill, Plus, Trash2, Search, Check } from 'lucide-react';
import { MedicationItem } from '../../types/discharge';
import { PRESET_MEDICATIONS } from '../../data/referenceData';

interface MedicationTableSectionProps {
  medications: MedicationItem[];
  onChange: (updated: MedicationItem[]) => void;
}

export const MedicationTableSection: React.FC<MedicationTableSectionProps> = ({
  medications,
  onChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCatalog, setShowCatalog] = useState(false);

  const handleCellChange = (id: string, field: keyof MedicationItem, value: any) => {
    const updated = medications.map(med => {
      if (med.id === id) {
        return { ...med, [field]: value };
      }
      return med;
    });
    onChange(updated);
  };

  const handleAddRow = () => {
    const newRow: MedicationItem = {
      id: `med-${Date.now()}`,
      selected: true,
      medicationName: '',
      genericName: '',
      strength: '',
      dosage: '1 Tab',
      frequencyMAN: '1-0-1',
      durationDays: '5',
      route: 'Oral',
      foodTiming: 'After Food',
      instructions: '',
      statusType: 'New'
    };
    onChange([...medications, newRow]);
  };

  const handleRemoveRow = (id: string) => {
    onChange(medications.filter(med => med.id !== id));
  };

  const handleSelectFromPreset = (preset: typeof PRESET_MEDICATIONS[0]) => {
    const newRow: MedicationItem = {
      id: `med-${Date.now()}`,
      selected: true,
      medicationName: preset.name,
      genericName: preset.generic,
      strength: preset.strength,
      dosage: preset.dosage,
      frequencyMAN: preset.frequency,
      durationDays: '5',
      route: preset.route as any,
      foodTiming: preset.foodTiming as any,
      instructions: '',
      statusType: 'New'
    };
    onChange([...medications, newRow]);
  };

  const filteredPresets = PRESET_MEDICATIONS.filter(
    p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.generic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="his-card" id="discharge-meds">
      <div className="his-card-header">
        <h3>
          <Pill className="text-sky-600" size={20} /> Section 5: Discharge Medications & Prescription Table
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowCatalog(!showCatalog)}
          >
            <Search size={14} /> {showCatalog ? 'Close Preset Catalog' : 'Quick Drug Lookup Catalog'}
          </button>
          <button
            type="button"
            className="btn btn-teal btn-sm"
            onClick={handleAddRow}
          >
            <Plus size={14} /> Add Medicine Row
          </button>
        </div>
      </div>

      <div className="his-card-body">
        {/* Quick Drug Lookup Drawer */}
        {showCatalog && (
          <div style={{
            background: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search reference drugs (e.g. Taxim, Ceftum, Pan, Progynova, Thyronorm)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '140px', overflowY: 'auto' }}>
              {filteredPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectFromPreset(preset)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--primary-300)',
                    borderRadius: '16px',
                    padding: '4px 12px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--primary-900)'
                  }}
                >
                  <Plus size={12} className="text-sky-600" />
                  <strong>{preset.name}</strong> ({preset.generic} {preset.strength})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Editable Medication Table */}
        <div className="his-table-container">
          <table className="his-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>Select</th>
                <th>Medication</th>
                <th>Generic Name</th>
                <th style={{ width: '90px' }}>Strength</th>
                <th style={{ width: '80px' }}>Dosage</th>
                <th style={{ width: '100px' }}>Freq (M-A-N)</th>
                <th style={{ width: '80px' }}>Duration</th>
                <th style={{ width: '90px' }}>Route</th>
                <th style={{ width: '120px' }}>Food Timing</th>
                <th>Instructions</th>
                <th style={{ width: '40px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {medications.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', color: 'var(--slate-500)', padding: '20px' }}>
                    No discharge medications added. Click "+ Add Medicine Row" above to add.
                  </td>
                </tr>
              ) : (
                medications.map((med) => (
                  <tr key={med.id}>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={med.selected}
                        onChange={(e) => handleCellChange(med.id, 'selected', e.target.checked)}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={med.medicationName}
                        onChange={(e) => handleCellChange(med.id, 'medicationName', e.target.value)}
                        placeholder="Trade Name"
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={med.genericName}
                        onChange={(e) => handleCellChange(med.id, 'genericName', e.target.value)}
                        placeholder="Generic Name"
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={med.strength}
                        onChange={(e) => handleCellChange(med.id, 'strength', e.target.value)}
                        placeholder="e.g. 200 mg"
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={med.dosage}
                        onChange={(e) => handleCellChange(med.id, 'dosage', e.target.value)}
                        placeholder="1 Tab"
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-800)' }}
                        value={med.frequencyMAN}
                        onChange={(e) => handleCellChange(med.id, 'frequencyMAN', e.target.value)}
                        placeholder="1-0-1"
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={med.durationDays}
                        onChange={(e) => handleCellChange(med.id, 'durationDays', e.target.value)}
                        placeholder="5 days"
                      />
                    </td>

                    <td>
                      <select
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={med.route}
                        onChange={(e) => handleCellChange(med.id, 'route', e.target.value)}
                      >
                        <option value="Oral">Oral</option>
                        <option value="IV">IV</option>
                        <option value="IM">IM</option>
                        <option value="SC">SC</option>
                        <option value="Topical">Topical</option>
                        <option value="Vaginal">Vaginal</option>
                        <option value="Inhalation">Inhalation</option>
                      </select>
                    </td>

                    <td>
                      <select
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={med.foodTiming}
                        onChange={(e) => handleCellChange(med.id, 'foodTiming', e.target.value)}
                      >
                        <option value="After Food">After Food</option>
                        <option value="Before Food">Before Food</option>
                        <option value="Empty Stomach">Empty Stomach</option>
                        <option value="With Food">With Food</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={med.instructions}
                        onChange={(e) => handleCellChange(med.id, 'instructions', e.target.value)}
                        placeholder="Special instructions"
                      />
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(med.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--danger-text)', cursor: 'pointer' }}
                        title="Delete Row"
                      >
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
  );
};
