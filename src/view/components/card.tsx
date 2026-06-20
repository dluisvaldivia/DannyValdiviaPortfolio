import { motion } from 'framer-motion';
import { LuExternalLink } from 'react-icons/lu';

interface CardProps {
  title: string;
  description: string;
  link?: string;
}

export default function Card({ title, description, link }: CardProps) {
  const titleId = `card-title-${title.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <motion.article
      className="card"
      tabIndex={0}
      aria-labelledby={titleId}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="card__content flex flex-col h-full">
        <h2 id={titleId} className="card__title">{title}</h2>
        <p className="card__description flex-1 mb-2">{description}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            className="button-primary mt-auto relative cursor-pointer no-underline"
            aria-label={`Visit ${title}, opens in new tab`}
            rel="noopener noreferrer"
          >
            Visit {title}
            <LuExternalLink className="absolute top-2 right-2" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
