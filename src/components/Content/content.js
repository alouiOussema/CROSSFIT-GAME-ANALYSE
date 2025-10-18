import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './content.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Props:
 * - id, title, highlight, children
 * - backgroundColor
 * - image, imageSide = 'left' | 'right'
 * - accent = 'blue' | 'red'  (adds a thin left border accent)
 * - overline, ctaText, ctaHref
 */
const ContentSection = ({
  id,
  title,
  highlight,
  children,
  backgroundColor,
  image,
  imageSide = 'left',
  accent = 'blue',
  overline,
  ctaText,
  ctaHref,
}) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const titleParts =
    highlight && title.includes(highlight) ? title.split(highlight) : [title, ''];

  useLayoutEffect(() => {
    const el = sectionRef.current;

    const ctx = gsap.context(() => {
      // section fade-in
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // stagger text
      gsap.from(el.querySelectorAll('.content-overline, .content-title, .content-body, .content-cta'), {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      // image entrance + subtle parallax drift
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          x: imageSide === 'left' ? -60 : 60,
          rotate: imageSide === 'left' ? -1 : 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });

        gsap.to(imageRef.current, {
          y: imageSide === 'left' ? -8 : -6,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // card hover micro-motion
      if (cardRef.current) {
        const card = cardRef.current;
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rx = ((y - rect.height / 2) / rect.height) * -6;
          const ry = ((x - rect.width / 2) / rect.width) * 6;
          gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [imageSide]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`content-section ${imageSide === 'right' ? 'layout-right' : 'layout-left'}`}
      style={{ backgroundColor: backgroundColor || '#ffffff' }}
    >
      <div
        ref={cardRef}
        className={`content-container content-card ${accent === 'red' ? 'accent-red' : 'accent-blue'}`}
      >
        {/* image */}
        <div ref={imageRef} className="content-image">
          {image && <img src={image} alt={title} loading="lazy" />}
        </div>

        {/* text */}
        <div className="content-text">
          {overline && <div className="content-overline">{overline}</div>}

          <h2 className="content-title">
            {titleParts[0]}
            {highlight && <span className="highlight-blue">{highlight}</span>}
            {titleParts[1]}
          </h2>

          <div className="content-body">{children}</div>

          {ctaText && ctaHref && (
            <a className="content-cta" href={ctaHref}>
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;