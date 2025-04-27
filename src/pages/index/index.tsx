import Header from '@/components/Header';
import EquipmentPanel from '@/components/EquipmentPanel';
import CampGrid from '@/components/CampGrid';
import SaveButton from '@/components/SaveButton';

function IndexPage() {
  const pageStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
  };

  return (
    <div style={pageStyle}>
      <Header />
      <div style={contentStyle}>
        <EquipmentPanel />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <CampGrid />
          <SaveButton />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;