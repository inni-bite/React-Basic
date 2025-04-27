import { useState } from 'react';
import { useAtom } from 'jotai';
import { campGridAtom, equipmentsAtom, selectedEquipmentAtom, Equipment } from '@/jotai/atoms';
import toast from 'react-simple-toasts';

const CampGrid: React.FC = () => {
  // 툴팁 상태
  const [tooltip, setTooltip] = useState<{ text: string, x: number, y: number } | null>(null);
  
  // jotai hooks 사용
  const [grid, setGrid] = useAtom(campGridAtom);
  const [selectedEquipment] = useAtom(selectedEquipmentAtom);
  const [equipments] = useAtom(equipmentsAtom);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    flex: '1',
    backgroundColor: '#F0FFF4', // 연한 녹색 배경 (잔디 느낌)
    position: 'relative'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    gap: '2px',
    width: '500px',
    height: '500px',
    backgroundColor: '#2F855A', // 어두운 녹색 테두리
    padding: '4px',
    borderRadius: '4px'
  };

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C6F6D5', // 밝은 녹색 배경 (잔디 느낌)
    border: '1px solid #68D391', // 연한 녹색 테두리
    fontSize: '32px',
    cursor: 'pointer',
    borderRadius: '2px'
  };

  const getEquipmentById = (id: string | null): Equipment | undefined => {
    if (!id) return undefined;
    return equipments.find(equipment => equipment.id === id);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!selectedEquipment) {
      // 선택된 장비가 없을 때 알림
      toast('장비를 먼저 선택해주세요', {
        position: 'top-center',
        duration: 2000,
      });
      return;
    }

    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = {
      ...newGrid[rowIndex][colIndex],
      equipmentId: selectedEquipment.id
    };

    setGrid(newGrid);
  };

  const handleCellRightClick = (e: React.MouseEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault();
    
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = {
      ...newGrid[rowIndex][colIndex],
      equipmentId: null
    };

    setGrid(newGrid);
  };

  // 마우스 오버 핸들러
  const handleMouseOver = (e: React.MouseEvent, rowIndex: number, colIndex: number) => {
    const equipment = getEquipmentById(grid[rowIndex][colIndex].equipmentId);
    if (equipment) {
      setTooltip({
        text: equipment.name,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#2D3748'
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    left: tooltip ? `${tooltip.x + 10}px` : 0,
    top: tooltip ? `${tooltip.y + 10}px` : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
    zIndex: 1000
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>캠프 그리드</h2>
      <div id="camp-grid" style={gridStyle}>
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const equipment = getEquipmentById(cell.equipmentId);
            
            return (
              <div
                key={cell.id}
                style={cellStyle}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                onMouseOver={(e) => handleMouseOver(e, rowIndex, colIndex)}
                onMouseOut={handleMouseOut}
              >
                {equipment?.icon || ''}
              </div>
            );
          })
        ))}
      </div>
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#718096' }}>
        * 클릭: 선택한 장비 배치 / 우클릭: 장비 제거
      </div>
      
      {tooltip && (
        <div style={tooltipStyle}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default CampGrid;