import React from 'react';
import { FlaskConical, Plus, Trash2 } from 'lucide-react';
import { InvestigationItem } from '../../types/discharge';

interface InvestigationSectionProps {
  investigations: InvestigationItem[];
  onChange: (updated: InvestigationItem[]) => void;
}

export const InvestigationSection: React.FC<InvestigationSectionProps> = ({
  investigations,
  onChange
}) => {
  const handleCellChange = (id: string, field: keyof InvestigationItem, value: any) => {
    const updated = investigations.map(inv => {
      if (inv.id === id) {
        return { ...inv, [field]: value };
      }
      return inv;
    });
    onChange(updated);
  };

  const handleAddRow = () => {
    const newRow: InvestigationItem = {
      id: `inv-${Date.now()}`,
      investigationName: '',
      resultValue: '',
      referenceRange: '',
      status: 'Normal',
      remarks: ''
    };
    onChange([...investigations, newRow]);
  };

  const handleRemoveRow = (id: string) => {
    onChange(investigations.filter(inv => inv.id !== id));
  };

  return (
    <div className="his-card" id="investigations">
      <div className="his-card-header">
        <h3>
          <FlaskConical className="text-sky-600" size={20} /> Section 6: Laboratory & Radiology Investigation Summary
        </h3>
        <button
          type="button"
          className="btn btn-teal btn-sm"
          onClick={handleAddRow}
        >
          <Plus size={14} /> Add Test Result
        </button>
      </div>

      <div className="his-card-body">
        <div className="his-table-container">
          <table className="his-table">
            <thead>
              <tr>
                <th>Investigation Test</th>
                <th>Result Value</th>
                <th>Reference Range</th>
                <th style={{ width: '130px' }}>Status</th>
                <th>Remarks / Notes</th>
                <th style={{ width: '40px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {investigations.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--slate-500)', padding: '20px' }}>
                    No investigation records added. Click "+ Add Test Result" to add lab findings.
                  </td>
                </tr>
              ) : (
                investigations.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={inv.investigationName}
                        onChange={(e) => handleCellChange(inv.id, 'investigationName', e.target.value)}
                        placeholder="e.g. Hemoglobin / Ultrasound"
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem', fontWeight: 600 }}
                        value={inv.resultValue}
                        onChange={(e) => handleCellChange(inv.id, 'resultValue', e.target.value)}
                        placeholder="Result value"
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={inv.referenceRange}
                        onChange={(e) => handleCellChange(inv.id, 'referenceRange', e.target.value)}
                        placeholder="Ref Range"
                      />
                    </td>

                    <td>
                      <select
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={inv.status}
                        onChange={(e) => handleCellChange(inv.id, 'status', e.target.value as any)}
                      >
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                        <option value="Critical">Critical</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ fontSize: '0.85rem' }}
                        value={inv.remarks}
                        onChange={(e) => handleCellChange(inv.id, 'remarks', e.target.value)}
                        placeholder="Clinical interpretation"
                      />
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(inv.id)}
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
