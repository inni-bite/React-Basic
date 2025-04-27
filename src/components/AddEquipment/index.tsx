import { useState } from 'react';
import { useAtom } from 'jotai';
import { equipmentsAtom, Equipment } from '@/jotai/atoms';

const AddEquipment: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [equipmentName, setEquipmentName] = useState('');
  const [equipments, setEquipments] = useAtom(equipmentsAtom);
  
  // 기본 아이콘 목록
  const defaultIcons = ['🏕️', '🪑', '🔥', '🏮', '🌲', '🎒', '⛺', '🥾', '🧭', '🪓', '🍖', '🥫'];
  const [selectedIcon, setSelectedIcon] = useState(defaultIcons[0]);

  const handleAddEquipment = () => {
    if (!equipmentName.trim()) return;
    
    const newEquipment: Equipment = {
      id: `eq-${Date.now()}`,
      name: equipmentName.trim(),
      icon: selectedIcon
    };
    
    setEquipments([...equipments, newEquipment]);
    setEquipmentName('');
    setSelectedIcon(defaultIcons[0]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={() => setIsModalOpen(true)}
        style={{
          width: '100%',
          padding: '8px',
          margin: '0 0 16px 0',
          backgroundColor: '#4ADE80',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        + 새 장비 추가
      </button>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>새 장비 추가</h3>
            
            <input
              type="text"
              placeholder="장비 이름"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>아이콘 선택:</label>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '8px'
              }}>
                {defaultIcons.map((icon, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIcon(icon)}
                    style={{
                      width: '36px',
                      height: '36px',
                      fontSize: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: selectedIcon === icon ? '2px solid #4ADE80' : '1px solid #ccc',
                      borderRadius: '4px',
                      background: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f1f1f1',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
              <button
                onClick={handleAddEquipment}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4ADE80',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEquipment;