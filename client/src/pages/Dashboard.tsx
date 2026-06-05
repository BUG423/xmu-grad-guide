import { Card, Col, Row, Typography, Alert, Divider, Progress, Statistic, Tag, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { DEGREE_TYPES } from '../data/degreeTypes';
import type { DegreeType } from '../data/degreeTypes';
import { getPhases, getTotalTaskCount } from '../data/flowData';
import { getCompletedCount } from '../utils/storage';
import { useProgressStore } from '../store/progressStore';

const { Title, Text, Paragraph } = Typography;

export default function Dashboard() {
  const navigate = useNavigate();
  const selectDegree = useProgressStore((s) => s.selectDegree);

  const handleSelect = (degreeType: DegreeType) => {
    selectDegree(degreeType);
    navigate(`/guide/${degreeType}`);
  };

  return (
    <div>
      {/* Hero 区域 */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px 24px 48px',
          marginBottom: 32,
          borderRadius: '0 0 24px 24px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 12, lineHeight: 1 }}>🎓</div>
        <Title
          level={1}
          style={{
            color: '#fff',
            marginBottom: 8,
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 700,
          }}
        >
          研究生毕业流程指引
        </Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 0 }}>
          厦门大学信息学院（特色化示范性软件学院）
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
          选择你的学位类型，一步步完成毕业流程
        </Paragraph>
      </div>

      <div style={{ padding: '0 16px 32px', maxWidth: 960, margin: '0 auto' }}>
        {/* 提示 Banner */}
        <Alert
          message="本系统仅供参考，所有流程要求以学院正式通知为准。请务必关注学院官网公告和研究生秘书的最新通知。"
          type="info"
          showIcon
          icon={<WarningOutlined />}
          style={{ marginBottom: 32, borderRadius: 12 }}
        />

        {/* 身份选择卡片 */}
        <Title level={4} style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          👤 选择你的身份
        </Title>
        <Row gutter={[20, 20]}>
          {DEGREE_TYPES.map((dt) => {
            const phases = getPhases(dt.id);
            const isEngineering = !dt.isStandard;
            const totalTasks = phases ? getTotalTaskCount(dt.id) : 0;
            const completedTasks = phases ? getCompletedCount(dt.id) : 0;
            const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return (
              <Col xs={24} sm={12} key={dt.id}>
                <Card
                  hoverable
                  onClick={() => handleSelect(dt.id)}
                  style={{
                    height: '100%',
                    borderTop: `4px solid ${dt.color}`,
                    borderRadius: 12,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                  styles={{
                    body: { padding: '24px 20px' },
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: `${dt.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        fontSize: 36,
                      }}
                    >
                      {dt.icon}
                    </div>
                    <Title level={4} style={{ marginBottom: 2 }}>
                      {dt.name}
                    </Title>
                    <Tag
                      color={dt.color}
                      style={{ borderRadius: 12, padding: '0 12px', fontSize: 12 }}
                    >
                      {dt.subtitle}
                    </Tag>
                  </div>

                  <Paragraph
                    style={{
                      textAlign: 'center',
                      color: '#666',
                      fontSize: 13,
                      marginBottom: 20,
                      lineHeight: 1.6,
                    }}
                  >
                    {dt.description}
                  </Paragraph>

                  {isEngineering ? (
                    <Alert
                      message="📢 毕业流程由学院另行通知"
                      type="warning"
                      showIcon
                      style={{
                        borderRadius: 8,
                        fontSize: 12,
                        background: '#fffbe6',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        background: '#fafafa',
                        borderRadius: 8,
                        padding: '12px 16px',
                        textAlign: 'center',
                      }}
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic
                            title="任务总数"
                            value={totalTasks}
                            suffix="项"
                            valueStyle={{ fontSize: 20, color: dt.color }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="已完成"
                            value={completedTasks}
                            suffix="项"
                            valueStyle={{
                              fontSize: 20,
                              color: completedTasks > 0 ? '#52c41a' : '#999',
                            }}
                          />
                        </Col>
                      </Row>
                      {completedTasks > 0 ? (
                        <Progress
                          percent={percent}
                          strokeColor={{ from: dt.color, to: '#52c41a' }}
                          style={{ marginTop: 12 }}
                        />
                      ) : (
                        <Text
                          type="secondary"
                          style={{ fontSize: 13, display: 'block', marginTop: 8 }}
                        >
                          点击开始规划 <ArrowRightOutlined />
                        </Text>
                      )}
                    </div>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>

        <Divider style={{ margin: '40px 0 32px' }} />

        {/* 联系老师 */}
        <Title level={4} style={{ marginBottom: 20 }}>
          📋 联系负责老师
        </Title>
        <Row gutter={[16, 16]}>
          {[
            {
              name: '郑老师',
              phone: '2580019',
              email: 'hgzheng@xmu.edu.cn',
              scope: '博士及学术型硕士',
              color: '#1677ff',
            },
            {
              name: '麻老师',
              phone: '2580599',
              email: 'malinjian@xmu.edu.cn',
              scope: '通信系、智能系专业学位硕士',
              color: '#52c41a',
            },
            {
              name: '陈老师',
              phone: '2580025',
              email: 'cyq1015@xmu.edu.cn',
              scope: '计算机系、软工系专业学位硕士、国际硕士',
              color: '#fa8c16',
            },
          ].map((t) => (
            <Col xs={24} sm={8} key={t.name}>
              <Card
                size="small"
                style={{
                  borderRadius: 10,
                  borderLeft: `3px solid ${t.color}`,
                }}
                styles={{ body: { padding: '16px' } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `${t.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <UserOutlined style={{ color: t.color, fontSize: 18 }} />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 15 }}>{t.name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{t.scope}</Text>
                  </div>
                </div>
                <Space direction="vertical" size={4}>
                  <Text style={{ fontSize: 13 }}>
                    <PhoneOutlined style={{ marginRight: 6, color: '#999' }} />
                    <Text code>{t.phone}</Text>
                  </Text>
                  <br />
                  <Text style={{ fontSize: 13 }}>
                    <MailOutlined style={{ marginRight: 6, color: '#999' }} />
                    <Text code style={{ fontSize: 12 }}>{t.email}</Text>
                  </Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
