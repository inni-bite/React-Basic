import React from 'react';
import { useAtom } from 'jotai';
import { campGridAtom } from '@/jotai/atoms';
import html2canvas from 'html2canvas';
import toast from 'react-simple-toasts';

const SaveButton: React.FC = () => {
  const [grid] = useAtom(campGridAtom);

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4ADE80',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s',
    marginTop: '20px'
  };

  const handleSave = async () => {
    // 장비가 하나라도 배치되어 있는지 확인
    const hasEquipment = grid.some(row => row.some(cell => cell.equipmentId !== null));
    
    if (!hasEquipment) {
      toast('장비를 하나 이상 배치해야 저장할 수 있습니다', {
        position: 'top-center',
        duration: 3000,
      });
      return;
    }
    
    try {
      const gridElement = document.getElementById('camp-grid');
      
      if (!gridElement) {
        toast('캠프 그리드를 찾을 수 없습니다', {
          position: 'top-center',
          duration: 2000,
        });
        return;
      }
      
      const canvas = await html2canvas(gridElement, {
        backgroundColor: '#C6F6D5',
        scale: 2, // 더 높은 화질로 저장
      });
      
      // 캔버스를 이미지로 변환
      const image = canvas.toDataURL('image/png');
      
      // 이미지 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = image;
      link.download = 'pixel-campfire.png';
      
      // 다운로드 실행
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast('캠프가 성공적으로 저장되었습니다!', {
        position: 'top-center',
        duration: 3000,
      });
    } catch (error) {
      console.error('이미지 저장 중 오류가 발생했습니다:', error);
      toast('이미지 저장에 실패했습니다', {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  return (
    <button 
      style={buttonStyle}
      onClick={handleSave}
    >
      캠프 저장하기
    </button>
  );
};

export default SaveButton;