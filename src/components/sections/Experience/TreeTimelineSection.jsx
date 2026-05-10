import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import workIcon from '../../../assets/icons/work.svg';
import schoolIcon from '../../../assets/icons/school.svg';

// Timeline spacing knobs:
// - STOP_SPACING controls vertical distance between cards/stops on desktop.
// - PATH_* padding keeps route stops centered with each card row.
const STOP_SPACING = 430;
const PATH_TOP_PADDING = 260;
const PATH_BOTTOM_PADDING = 260;
const PATH_VIEWBOX_WIDTH = 1000;

const TYPE_META = {
  certification: {
    icon: schoolIcon,
    label: 'Certification',
  },
  education: {
    icon: schoolIcon,
    label: 'Education',
  },
  experience: {
    icon: workIcon,
    label: 'Experience',
  },
  project: {
    icon: workIcon,
    label: 'Project',
  },
};

const getItemType = (item) => item.type ?? (item.icon === 'school' ? 'education' : 'experience');
const getTypeMeta = (type) => TYPE_META[type] ?? TYPE_META.experience;

function buildTimelineGeometry(itemCount) {
  const stopPositions = Array.from({ length: itemCount }, (_, index) => PATH_TOP_PADDING + index * STOP_SPACING);
  const viewBoxHeight = PATH_TOP_PADDING + Math.max(itemCount - 1, 0) * STOP_SPACING + PATH_BOTTOM_PADDING;
  const firstStop = stopPositions[0] ?? PATH_TOP_PADDING;

  // Tune the branch path here. More timeline items automatically add curve segments and stop points.
  const pathSegments = [`M 500 ${firstStop}`];

  stopPositions.forEach((stopY, index) => {
    const nextY = stopPositions[index + 1];
    const sway = index % 2 === 0 ? -64 : 64;

    if (nextY) {
      pathSegments.push(`C ${500 - sway} ${stopY + 110}, ${500 + sway} ${nextY - 112}, 500 ${nextY}`);
    }
  });

  return {
    branchPath: pathSegments.join(' '),
    stopPositions,
    viewBoxHeight,
  };
}

function TimelineCard({ item, index, isActive, itemRef }) {
  const itemType = getItemType(item);
  const branchSide = index % 2 === 0 ? 'left' : 'right';
  const typeMeta = getTypeMeta(itemType);

  return (
    <article
      ref={itemRef}
      data-timeline-index={index}
      className={`career-branch career-branch--${branchSide} career-branch--${itemType} ${isActive ? 'is-active' : ''}`}
    >
      <div className="career-node" aria-hidden="true">
        <span className={`career-node-ring career-node-ring--${itemType}`}>
          <img src={typeMeta.icon} alt="" aria-hidden="true" />
        </span>
      </div>

      <div className="career-card">
        <div className="career-card-topline">
          <span className={`career-kind career-kind--${itemType}`}>
            {typeMeta.label}
          </span>
          <span className="career-date">{item.date}</span>
        </div>

        <h3>{item.title}</h3>
        {item.role && <h4>{item.role}</h4>}
        <p className="career-location">{item.location}</p>
        <p className="career-description">{item.description}</p>

        {item.highlights?.length > 0 && (
          <ul className="career-highlights" aria-label={`${item.title} highlights`}>
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        {item.link && (
          <a
            className={`career-link career-link--${itemType}`}
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.link.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function TreeTimelineSection({ id, title, summary, items }) {
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const geometry = useMemo(() => buildTimelineGeometry(items.length), [items.length]);

  useEffect(() => {
    const observedItems = itemRefs.current.slice(0, items.length).filter(Boolean);

    if (observedItems.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const strongestEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!strongestEntry) {
          return;
        }

        setActiveIndex(Number(strongestEntry.target.dataset.timelineIndex) || 0);
      },
      {
        root: null,
        rootMargin: '-34% 0px -34% 0px',
        threshold: [0.2, 0.45, 0.7],
      }
    );

    observedItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [items.length]);

  return (
    <section id={id} className="experience-section">
      <h2 className="section-heading">
        <span className="section-heading__line" />
        {title}
        <span className="section-heading__line" />
      </h2>

      <p className="experience-summary">{summary}</p>

      <div
        className="career-tree"
        style={{ '--timeline-viewbox-height': geometry.viewBoxHeight }}
      >
        <svg
          className="career-route"
          viewBox={`0 0 ${PATH_VIEWBOX_WIDTH} ${geometry.viewBoxHeight}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="timelineRouteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64ffda" />
              <stop offset="52%" stopColor="#a084ee" />
              <stop offset="100%" stopColor="#ffb347" />
            </linearGradient>
          </defs>

          <path className="career-route-shadow" d={geometry.branchPath} />
          <path className="career-route-main" d={geometry.branchPath} />

          {geometry.stopPositions.map((stopY, index) => {
            const side = index % 2 === 0 ? -1 : 1;
            const twigEnd = 500 + side * 245;
            const control = 500 + side * 122;

            // These branch twigs are visual only. Add more cards in timelineElements.js;
            // the path and twigs regenerate automatically for the new stop count.
            return (
              <g key={stopY}>
                <path
                  className="career-route-branch"
                  d={`M 500 ${stopY} C ${control} ${stopY - 24}, ${control} ${stopY + 24}, ${twigEnd} ${stopY}`}
                />
                <circle className="career-route-stop" cx="500" cy={stopY} r="13" />
              </g>
            );
          })}
        </svg>

        <div className="career-branches">
          {items.map((item, index) => (
            <TimelineCard
              item={item}
              index={index}
              isActive={activeIndex === index}
              itemRef={(node) => {
                itemRefs.current[index] = node;
              }}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TreeTimelineSection;
