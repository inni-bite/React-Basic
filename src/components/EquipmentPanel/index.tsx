import { useAtom } from 'jotai';
import { equipmentsAtom, selectedEquipmentAtom, type Equipment } from '@/jotai/atoms';

const EquipmentPanel: React.FC = () => {
  const [equipments] = useAtom(equipmentsAtom);
  const [selectedEquipment, setSelectedEquipment] = useAtom(selectedEquipmentAtom);

  const panelStyle: React.CSSProperties = {
    width: '280px',
    padding: '20px',
    backgroundColor: 'white',
    borderRight: '1px solid #E2E8F0',
    height: '100%'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#4A5568'
  };

  const equipmentListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const equipmentItemStyle = (isSelected: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#EDF2F7' : 'transparent',
    border: isSelected ? '2px solid #4299E1' : '1px solid #CBD5E0',
    transition: 'all 0.2s'
  });

  const iconStyle: React.CSSProperties = {
    fontSize: '24px',
    marginRight: '8px'
  };

  const handleEquipmentSelect = (equipment: Equipment): void => {
    setSelectedEquipment(equipment);
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>캠핑 장비</h2>
      <div style={equipmentListStyle}>
        {equipments.map((equipment) => (
          <div
            key={equipment.id}
            style={equipmentItemStyle(selectedEquipment?.id === equipment.id)}
            onClick={() => handleEquipmentSelect(equipment)}
          >
            <span style={iconStyle}>{equipment.icon}</span>
            {equipment.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentPanel;