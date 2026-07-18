import { useEffect } from 'react';

const BASE_TITLE = 'Danny Valdivia';
const DEFAULT_SUFFIX = 'Full Stack Developer | UI/UX & Accessibility';

/** Sets document.title for the current route. Pass nothing for the homepage default. */
export default function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = `${BASE_TITLE} — ${title ?? DEFAULT_SUFFIX}`;
  }, [title]);
}
