import React from 'react';
import { Project } from '../types/project';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  background-color: ${props => {
    switch (props.status) {
      case 'completed':
      case 'installed':
        return '#4CAF50';
      case 'in_progress':
      case 'pending':
        return '#FFC107';
      case 'maintenance':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  }};
  color: white;
  margin-left: 10px;
`;

interface ProjectInfoProps {
  project: Project;
}

export const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
    <Container>
      <Section>
        <Title>프로젝트 현장명</Title>
        <ListItem>
          {project.siteName}
          <StatusBadge status={project.status}>
            {project.status === 'active' ? '진행중' : 
             project.status === 'completed' ? '완료' : '보류'}
          </StatusBadge>
        </ListItem>
      </Section>

      <Section>
        <Title>투입된 콘텐츠 목록</Title>
        <List>
          {project.contents.map(content => (
            <ListItem key={content.id}>
              <div>
                <strong>{content.name}</strong>
                <StatusBadge status={content.status}>
                  {content.status === 'completed' ? '완료' :
                   content.status === 'in_progress' ? '진행중' : '대기중'}
                </StatusBadge>
              </div>
              <p>{content.description}</p>
            </ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <Title>납품된 하드웨어 기기 목록</Title>
        <List>
          {project.hardware.map(hardware => (
            <ListItem key={hardware.id}>
              <div>
                <strong>{hardware.name}</strong>
                <StatusBadge status={hardware.status}>
                  {hardware.status === 'installed' ? '설치완료' :
                   hardware.status === 'pending' ? '대기중' : '유지보수중'}
                </StatusBadge>
              </div>
              <p>수량: {hardware.quantity}</p>
              <p>사양: {hardware.specifications}</p>
            </ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <Title>프로젝트 투입 날짜</Title>
        <ListItem>
          <p>시작일: {new Date(project.startDate).toLocaleDateString()}</p>
          {project.endDate && (
            <p>종료일: {new Date(project.endDate).toLocaleDateString()}</p>
          )}
        </ListItem>
      </Section>
    </Container>
  );
}; 