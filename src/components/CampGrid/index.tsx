import { useAtom } from 'jotai';
import { campGridAtom, equipmentsAtom, selectedEquipmentAtom, Equipment } from '@/jotai/atoms'

const CampGrid: React.FC = () => {
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
    backgroundColor: '#F0FFF4' // 연한 녹색 배경 (잔디 느낌)
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
    if (!selectedEquipment) return;

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

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#2D3748'
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
    </div>
  );
};

export default CampGrid;