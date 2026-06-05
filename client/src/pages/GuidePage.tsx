import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Steps, Card, Button, Progress, Alert, Collapse, Timeline, Tag, Row, Col } from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  BookOutlined,
  EditOutlined,
  BulbOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useProgressStore } from '../store/progressStore';
import { getDegreeTypeInfo } from '../data/degreeTypes';
import { getPhases, getTotalTaskCount } from '../data/flowData';
import {
  loadProgress,
  toggleTask as storageToggleTask,
  getCompletedCount,
} from '../utils/storage';
import TaskCard from '../components/TaskCard';
import { WRITING_TIMELINE, WORKLOAD_REF, WRITING_ADVICE } from '../data/writingTips';

const { Title, Text, Paragraph } = Typography;

export default function GuidePage() {
  const { degreeType } = useParams<{ degreeType: string }>();
  const navigate = useNavigate();
  const store = useProgressStore();

  const [activePhase, setActivePhase] = useState(0);
  const [animateComplete, setAnimateComplete] = useState<string | null>(null);

  const degreeInfo = getDegreeTypeInfo(degreeType as any);
  const phases = degreeType ? getPhases(degreeType as any) : null;
  const isEngineering = degreeType === 'engineering';

  useEffect(() => {
    if (degreeType) {
      store.selectDegree(degreeType as any);
    }
  }, [degreeType]);

  useEffect(() => {
    setActivePhase(0);
  }, [degreeType]);

  if (!degreeInfo) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Title level={3}>未知的学位类型</Title>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>
    );
  }

  // ========== 工程硕博提示页 ==========
  if (isEngineering) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          style={{ padding: 0, marginBottom: 24 }}
        >
          返回选择身份
        </Button>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: `${degreeInfo.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: 48,
            }}
          >
            {degreeInfo.icon}
          </div>
          <Title level={2} style={{ color: degreeInfo.color, marginBottom: 4 }}>
            {degreeInfo.name}
          </Title>
          <Tag color={degreeInfo.color}>{degreeInfo.subtitle}</Tag>
        </div>

        <Alert
          message="📢 毕业流程另行通知"
          description="工程硕士、工程博士（含卓越工程师计划等特殊项目）的毕业流程由学院另行单独通知，不在本通用流程指引范围内。请关注学院通知公告或联系研究生秘书获取专属流程指引。"
          type="warning"
          showIcon
          style={{ marginBottom: 24, borderRadius: 12 }}
        />

        <Card title="📋 联系研究生秘书" style={{ marginBottom: 24, borderRadius: 12 }}>
          <Row gutter={[16, 16]}>
            {[
              { name: '郑老师', phone: '2580019', email: 'hgzheng@xmu.edu.cn', scope: '博士相关' },
              { name: '麻老师', phone: '2580599', email: 'malinjian@xmu.edu.cn', scope: '通信系、智能系' },
              { name: '陈老师', phone: '2580025', email: 'cyq1015@xmu.edu.cn', scope: '计算机系、软工系' },
            ].map((t) => (
              <Col xs={24} sm={8} key={t.name}>
                <Card size="small" style={{ textAlign: 'center', borderRadius: 8 }}>
                  <Text strong>{t.name}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{t.scope}</Text>
                  <br />
                  <Text code>{t.phone}</Text>
                  <br />
                  <Text code style={{ fontSize: 12 }}>{t.email}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        <Card title="📝 通用参考：论文撰写小贴士" style={{ borderRadius: 12 }}>
          <Paragraph type="secondary">
            虽然工程硕博的毕业流程另行通知，但以下论文撰写的通用建议仍然适用：
          </Paragraph>
          <Collapse
            items={[
              {
                key: 'timeline',
                label: <><ClockCircleOutlined /> 论文撰写时间线</>,
                children: (
                  <Timeline
                    items={WRITING_TIMELINE.map((item) => ({
                      color: item.time.includes('4月') ? 'red' : 'blue',
                      children: (
                        <div>
                          <Text strong>{item.time}</Text> — {item.title}
                          <br />
                          <Text type="secondary">{item.description}</Text>
                        </div>
                      ),
                    }))}
                  />
                ),
              },
              {
                key: 'workload',
                label: <><BulbOutlined /> 工作量参考</>,
                children: WORKLOAD_REF.map((w, i) => (
                  <Paragraph key={i}>
                    <Text strong>{w.label}</Text>：{w.innovationPoints} 个创新点，字数 {w.wordCount}，建议准备周期 {w.prepPeriod}
                  </Paragraph>
                )),
              },
              {
                key: 'advice',
                label: <><EditOutlined /> 撰写建议</>,
                children: WRITING_ADVICE.map((a, i) => (
                  <Paragraph key={i} style={{ marginBottom: 8 }}>
                    <Text strong>{a.title}</Text>：{a.desc}
                  </Paragraph>
                )),
              },
            ]}
          />
        </Card>
      </div>
    );
  }

  // ========== 正常流程页面 ==========
  if (!phases) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Title level={3}>暂无流程数据</Title>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>
    );
  }

  const totalTasks = getTotalTaskCount(degreeType as any);
  const completedTasks = getCompletedCount(degreeType as any);
  const overallPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const progress = store.progress[degreeType!] || loadProgress(degreeType as any);

  const handleToggle = (taskId: string, completed: boolean) => {
    if (completed) {
      setAnimateComplete(taskId);
      setTimeout(() => setAnimateComplete(null), 600);
    }
    store.toggleTask(taskId, completed);
    storageToggleTask(degreeType as any, taskId, completed);
  };

  const phaseItems = phases.map((phase, idx) => {
    const taskIds = phase.tasks.map((t) => t.id);
    const done = taskIds.filter((id) => progress[id]?.completed).length;
    const total = taskIds.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const isComplete = done === total && total > 0;

    return {
      key: String(idx),
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: activePhase === idx ? 600 : 400 }}>
          <span style={{ fontSize: 18 }}>{phase.icon}</span>
          <span style={{ color: isComplete ? '#52c41a' : 'inherit' }}>{phase.title}</span>
          {isComplete && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {activePhase === idx && (
            <Tag color="blue" style={{ marginLeft: 'auto', fontSize: 10 }}>
              当前
            </Tag>
          )}
        </div>
      ),
      description: (
        <div style={{ marginTop: 4 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {phase.subtitle}
          </Text>
          <div style={{ marginTop: 6 }}>
            <Progress
              percent={pct}
              size="small"
              strokeColor={isComplete ? '#52c41a' : '#1677ff'}
              style={{ marginBottom: 2 }}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>
              {done}/{total} 已完成
            </Text>
          </div>
        </div>
      ),
    };
  });

  const currentPhase = phases[activePhase];

  // 计算当前学位类型的工作量参考
  const myWorkload = WORKLOAD_REF.find((w) => w.degreeType === degreeType);

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '16px' }}>
      {/* 顶部 */}
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/')}
        style={{ padding: 0, marginBottom: 20 }}
      >
        返回选择身份
      </Button>

      <Card
        style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden' }}
        styles={{ body: { padding: '24px 28px' } }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${degreeInfo.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                }}
              >
                {degreeInfo.icon}
              </div>
              <div>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {degreeInfo.name} 毕业流程指引
                </Title>
                <Tag color={degreeInfo.color} style={{ borderRadius: 10, fontSize: 11 }}>
                  {degreeInfo.subtitle}
                </Tag>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <Progress
                type="circle"
                percent={overallPercent}
                size={72}
                strokeColor={
                  overallPercent === 100
                    ? '#52c41a'
                    : { '0%': degreeInfo.color, '100%': '#52c41a' }
                }
              />
              <div style={{ marginTop: 6 }}>
                <Text style={{ fontSize: 12, color: '#999' }}>
                  {completedTasks}/{totalTasks}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 专硕实践成果提示 */}
      {degreeType === 'professional-master' && (
        <Alert
          message="📌 以实践成果申请学位？"
          description="以实践成果（而非学位论文）申请学位的专业型研究生，毕业流程由学院另行单独通知和安排，不适用本流程。请直接联系研究生秘书获取专项指引。"
          type="info"
          showIcon
          style={{ marginBottom: 24, borderRadius: 12 }}
        />
      )}

      {/* 主内容区 */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {/* 左侧 */}
        <div style={{ flex: '0 0 280px', minWidth: 240 }}>
          <Card
            size="small"
            style={{
              borderRadius: 12,
              position: 'sticky',
              top: 80,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            styles={{ body: { padding: '16px 12px' } }}
          >
            <Steps
              direction="vertical"
              current={activePhase}
              onChange={setActivePhase}
              items={phaseItems}
              style={{ cursor: 'pointer' }}
              size="small"
            />
          </Card>

          {/* 小贴士折叠面板 */}
          <Card
            size="small"
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <EditOutlined style={{ color: '#1677ff' }} />
                <span>论文撰写小贴士</span>
              </div>
            }
            style={{ marginTop: 16, borderRadius: 12 }}
            styles={{ body: { padding: '0 8px 8px' } }}
          >
            <Collapse
              ghost
              size="small"
              items={[
                {
                  key: 'timeline',
                  label: <><ClockCircleOutlined /> 倒推时间线</>,
                  children: (
                    <Timeline
                      items={WRITING_TIMELINE.map((item) => ({
                        color: item.time.includes('4月') ? 'red' : 'blue',
                        children: (
                          <div>
                            <Text strong style={{ fontSize: 13 }}>{item.time}</Text>
                            <br />
                            <Text style={{ fontSize: 12 }}>{item.title}</Text>
                          </div>
                        ),
                      }))}
                    />
                  ),
                },
                {
                  key: 'workload',
                  label: <><BulbOutlined /> 工作量参考</>,
                  children: (
                    <div>
                      {myWorkload && (
                        <div
                          style={{
                            background: '#f6ffed',
                            border: '1px solid #b7eb8f',
                            borderRadius: 8,
                            padding: '12px',
                            marginBottom: 8,
                            textAlign: 'center',
                          }}
                        >
                          <Text strong style={{ color: '#389e0d', fontSize: 15 }}>
                            {myWorkload.innovationPoints} 个创新点/工作
                          </Text>
                          <br />
                          <Text style={{ fontSize: 13 }}>
                            字数 {myWorkload.wordCount} · 准备 {myWorkload.prepPeriod}
                          </Text>
                        </div>
                      )}
                      <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.8 }}>
                        💡 "工作量"指论文中相对独立且有创新性的研究点或技术贡献。硕士2个工作 ≈ 一个方法改进 + 一个应用验证；博士3个工作应构成有机的研究体系。
                      </Text>
                    </div>
                  ),
                },
                {
                  key: 'advice',
                  label: <><BookOutlined /> 撰写建议</>,
                  children: WRITING_ADVICE.map((a, i) => (
                    <Paragraph key={i} style={{ marginBottom: 8, fontSize: 12, lineHeight: 1.7 }}>
                      <Text strong>{a.title}</Text>：{a.desc}
                    </Paragraph>
                  )),
                },
              ]}
            />
          </Card>
        </div>

        {/* 右侧任务列表 */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {currentPhase && (
            <div
              style={{
                marginBottom: 20,
                padding: '16px 20px',
                background: '#fff',
                borderRadius: 12,
                border: '1px solid #f0f0f0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 24 }}>{currentPhase.icon}</span>
                    <Title level={5} style={{ marginBottom: 2 }}>
                      {currentPhase.title}
                    </Title>
                  </div>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {currentPhase.subtitle}
                  </Text>
                </div>
                <Tag
                  style={{
                    borderRadius: 12,
                    padding: '2px 12px',
                    fontSize: 13,
                  }}
                  color={
                    currentPhase.tasks.filter((t) => progress[t.id]?.completed).length ===
                    currentPhase.tasks.length
                      ? 'success'
                      : 'processing'
                  }
                >
                  {currentPhase.tasks.filter((t) => progress[t.id]?.completed).length}/
                  {currentPhase.tasks.length} 完成
                </Tag>
              </div>
              <Progress
                percent={
                  currentPhase.tasks.length > 0
                    ? Math.round(
                        (currentPhase.tasks.filter((t) => progress[t.id]?.completed).length /
                          currentPhase.tasks.length) *
                          100
                      )
                    : 0
                }
                strokeColor={{ from: degreeInfo.color, to: '#52c41a' }}
                style={{ marginTop: 12 }}
              />
            </div>
          )}

          {currentPhase?.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              progress={progress[task.id]}
              onToggle={handleToggle}
              animating={animateComplete === task.id}
            />
          ))}

          {/* 阶段切换 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 24,
              marginBottom: 48,
            }}
          >
            <Button
              disabled={activePhase === 0}
              onClick={() => setActivePhase((p) => p - 1)}
              size="large"
              style={{ borderRadius: 8 }}
            >
              ← 上一阶段
            </Button>
            {activePhase < phases.length - 1 && (
              <Button
                type="primary"
                size="large"
                onClick={() => setActivePhase((p) => p + 1)}
                style={{ borderRadius: 8 }}
              >
                下一阶段 →
              </Button>
            )}
            {activePhase === phases.length - 1 && overallPercent === 100 && (
              <div style={{ textAlign: 'center', color: '#52c41a', fontSize: 18, fontWeight: 600 }}>
                <TrophyOutlined style={{ marginRight: 6 }} />
                全部完成，恭喜！🎉
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
