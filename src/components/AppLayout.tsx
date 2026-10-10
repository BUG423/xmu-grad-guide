import { Layout, Typography } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Layout style={{ minHeight: '100vh', background: '#f7f8fc' }}>
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 56,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <span style={{ fontSize: 22 }}>🎓</span>
          <Typography.Text
            strong
            style={{
              fontSize: 16,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            研究生毕业流程指引
          </Typography.Text>
        </div>

        {!isHome && (
          <div
            onClick={() => navigate('/')}
            style={{
              cursor: 'pointer',
              color: '#1677ff',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 12px',
              borderRadius: 6,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f0f5ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <HomeOutlined />
            <span style={{ fontSize: 14 }}>首页</span>
          </div>
        )}
      </Header>

      <Content
        style={{
          padding: isHome ? 0 : 24,
          maxWidth: isHome ? '100%' : 1100,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          color: '#bbb',
          fontSize: 12,
          background: '#fff',
          borderTop: '1px solid #f0f0f0',
          padding: '16px',
        }}
      >
        <div>厦门大学信息学院（特色化示范性软件学院） · 研究生毕业流程指引</div>
        <div style={{ marginTop: 4 }}>
          <Typography.Link
            href="https://informatics.xmu.edu.cn/info/2301/178021.htm"
            target="_blank"
            style={{ fontSize: 12 }}
          >
            原始页面参考
          </Typography.Link>
          <span style={{ margin: '0 8px', color: '#ddd' }}>|</span>
          <span>仅供参考，请以学院正式通知为准</span>
        </div>
      </Footer>
    </Layout>
  );
}
