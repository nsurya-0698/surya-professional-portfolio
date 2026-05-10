import TreeTimelineSection from './TreeTimelineSection';
import timelineElements from './timelineElements';
import './index.css';

function Experience() {
  return (
    <TreeTimelineSection
      id="exp"
      title="Experience & Education"
      summary="A career path across enterprise GenAI, clinical diagnostics, healthcare platforms, fintech systems, and computer science foundations."
      items={timelineElements}
    />
  );
}

export default Experience;
