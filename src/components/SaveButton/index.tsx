import React from 'react';
import html2canvas from 'html2canvas';

const SaveButton: React.FC = () => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4299E1',
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
    try {
      const gridElement = document.getElementById('camp-grid');
      
      if (!gridElement) {
        alert('캠프 그리드를 찾을 수 없습니다.');
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
    } catch (error) {
      console.error('이미지 저장 중 오류가 발생했습니다:', error);
      alert('이미지 저장에 실패했습니다.');
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