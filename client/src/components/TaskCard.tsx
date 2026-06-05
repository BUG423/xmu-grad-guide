import { Card, Tag, Typography } from 'antd';
import {
  ExclamationCircleOutlined,
  FileTextOutlined,
  LinkOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import type { Task } from '../data/flowData';

const { Text, Paragraph } = Typography;

const SPECIAL_CONFIG: Record<string, { color: string; label: string; icon: string }> = {
  'phd-pre-defense': { color: '#722ed1', label: '🔑 博士专属·预答辩', icon: '🎤' },
  'phd-quality-check': { color: '#eb2f96', label: '🔑 博士专属·质量核查', icon: '🔍' },
  'phd-poster': { color: '#fa8c16', label: '🔑 博士专属·海报', icon: '📊' },
  practice: { color: '#13c2c2', label: '📌 实践成果申请', icon: '📋' },
};

interface TaskCardProps {
  task: Task;
  progress?: { completed: boolean; completedAt?: string; notes?: string };
  onToggle: (taskId: string, completed: boolean) => void;
  animating?: boolean;
}

export default function TaskCard({
  task,
  progress,
  onToggle,
  animating = false,
}: TaskCardProps) {
  const completed = progress?.completed ?? false;
  const specialCfg = task.special ? SPECIAL_CONFIG[task.special] : null;

  return (
    <Card
      size="small"
      className={animating ? 'task-complete-anim' : ''}
      style={{
        marginBottom: 14,
        borderRadius: 10,
        borderLeft: completed ? '4px solid #52c41a' : '4px solid #e8e8e8',
        background: completed ? '#f6ffed' : '#fff',
        transition: 'all 0.4s ease',
        boxShadow: completed ? '0 1px 4px rgba(82,196,26,0.1)' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
      styles={{
        body: { padding: '16px 20px' },
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <div
            onClick={() => onToggle(task.id, !completed)}
            style={{
              cursor: 'pointer',
              fontSize: 22,
              lineHeight: 1,
              marginTop: 2,
              transition: 'transform 0.3s ease',
              flexShrink: 0,
            }}
          >
            {completed ? (
              <CheckCircleFilled style={{ color: '#52c41a' }} />
            ) : (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: '2px solid #d9d9d9',
                  transition: 'all 0.3s ease',
                }}
              />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: completed ? 'line-through' : 'none',
                  color: completed ? '#999' : '#262626',
                  transition: 'color 0.3s ease',
                }}
              >
                任务 {task.order}：{task.title}
              </span>
              {specialCfg && (
                <Tag
                  color={specialCfg.color}
                  style={{ borderRadius: 10, fontSize: 11, marginRight: 0 }}
                >
                  {specialCfg.label}
                </Tag>
              )}
            </div>
          </div>
        </div>
      }
      extra={
        <div
          onClick={() => onToggle(task.id, !completed)}
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            padding: '4px 12px',
            borderRadius: 16,
            fontSize: 13,
            fontWeight: 500,
            background: completed ? '#f6ffed' : '#f0f5ff',
            color: completed ? '#52c41a' : '#1677ff',
            border: completed ? '1px solid #b7eb8f' : '1px solid #91caff',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {completed ? '✅ 已完成' : '☐ 标记完成'}
        </div>
      }
    >
      <Paragraph
        style={{
          marginBottom: 14,
          color: completed ? '#bbb' : '#555',
          fontSize: 14,
          lineHeight: 1.7,
          transition: 'color 0.3s ease',
        }}
      >
        {task.description}
      </Paragraph>

      {/* 材料清单 */}
      {task.materials.length > 0 && (
        <div
          style={{
            marginBottom: 10,
            background: '#fafafa',
            borderRadius: 8,
            padding: '10px 14px',
          }}
        >
          <Text strong style={{ fontSize: 13, color: '#555' }}>
            <FileTextOutlined style={{ marginRight: 4 }} />
            所需材料
          </Text>
          <ul style={{ margin: '6px 0 0 18px', padding: 0 }}>
            {task.materials.map((m, i) => (
              <li
                key={i}
                style={{
                  fontSize: 13,
                  lineHeight: '26px',
                  color: '#666',
                }}
              >
                {m.required ? '✅' : '⬜'}{' '}
                <span style={{ fontWeight: m.required ? 500 : 400 }}>{m.name}</span>
                {m.format && (
                  <Tag
                    bordered={false}
                    style={{
                      marginLeft: 6,
                      fontSize: 10,
                      background: '#f0f0f0',
                      borderRadius: 4,
                      padding: '0 6px',
                      lineHeight: '18px',
                    }}
                  >
                    {m.format}
                  </Tag>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 相关链接 */}
      {task.links.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <Text strong style={{ fontSize: 13, color: '#555' }}>
            <LinkOutlined style={{ marginRight: 4 }} />
            相关链接
          </Text>
          <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {task.links.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  background: '#f0f5ff',
                  padding: '3px 10px',
                  borderRadius: 12,
                  color: '#1677ff',
                  textDecoration: 'none',
                }}
              >
                {l.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 注意事项 */}
      {task.warnings.length > 0 && (
        <div>
          <Text strong style={{ fontSize: 13, color: '#fa8c16' }}>
            <ExclamationCircleOutlined style={{ marginRight: 4 }} />
            注意事项
          </Text>
          <ul
            style={{
              margin: '6px 0 0 18px',
              background: '#fffbe6',
              borderRadius: 8,
              padding: '10px 14px 10px 30px',
            }}
          >
            {task.warnings.map((w, i) => (
              <li
                key={i}
                style={{
                  fontSize: 13,
                  lineHeight: '24px',
                  color: '#ad6800',
                }}
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {completed && progress?.completedAt && (
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <Text type="secondary" style={{ fontSize: 11 }}>
            完成于 {new Date(progress.completedAt).toLocaleDateString('zh-CN')}
          </Text>
        </div>
      )}
    </Card>
  );
}
