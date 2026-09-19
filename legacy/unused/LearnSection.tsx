'use client';

import React, { useState } from 'react';
import type { AppLinks, BlogArticle, MythBuster } from '@/lib/api';
import { GetAppButton } from './GetAppButton';
import styles from './LearnSection.module.css';

interface LearnSectionProps {
  myths: MythBuster[];
  articles: BlogArticle[];
  links: AppLinks;
}

function excerpt(text: string, max = 140): string {
  return text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max)) + '…';
}

/** Admin → Myth busters and Blog articles. Full articles, podcasts and bookmarks are in the app. */
export const LearnSection: React.FC<LearnSectionProps> = ({ myths, articles, links }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (myths.length === 0 && articles.length === 0) return null;

  return (
    <section id="learn" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-teal">Learn</span>
          <h2 className={styles.title}>Myth or fact?</h2>
          <p className={styles.subtitle}>Tap a card to see the answer.</p>
        </div>

        {myths.length > 0 && (
          <div className={styles.myths}>
            {myths.slice(0, 3).map((m) => {
              const open = revealed[m.id];
              return (
                <button
                  key={m.id}
                  className={`${styles.myth} ${open ? styles.mythOpen : ''}`}
                  onClick={() => setRevealed((r) => ({ ...r, [m.id]: !r[m.id] }))}
                  aria-expanded={Boolean(open)}
                >
                  <span className={styles.mythQuestion}>“{m.question}”</span>
                  {open ? (
                    <>
                      <span className={m.answer_is_true ? styles.verdictTrue : styles.verdictFalse}>
                        {m.answer_is_true ? 'Fact' : 'Myth'}
                      </span>
                      <span className={styles.explanation}>{m.explanation}</span>
                    </>
                  ) : (
                    <span className={styles.tapHint}>Myth or fact? Tap to reveal</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {articles.length > 0 && (
          <>
            <h3 className={styles.readHeading}>From the PIAX journal</h3>
            <div className={styles.articles}>
              {articles.slice(0, 3).map((a) => (
                <article key={a.id} className={styles.article}>
                  <span className={styles.category}>
                    {a.category}
                    {a.has_audio ? ' · Audio' : ''}
                  </span>
                  <h4>{a.title}</h4>
                  <p>{excerpt(a.content)}</p>
                  <span className={styles.byline}>
                    {a.author_name}
                    {a.author_title ? ` · ${a.author_title}` : ''}
                  </span>
                </article>
              ))}
            </div>
          </>
        )}

        <div className={styles.cta}>
          <GetAppButton links={links} label="Read more in the PIAX app →" className="btn btn-secondary btn-lg" />
        </div>
      </div>
    </section>
  );
};
