import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./legends.css";


import img1 from '../../assets/Legends/froning.png';
import img2 from '../../assets/Legends/fraser.webp';
import img3 from '../../assets/Legends/toomey.jpeg';
import img4 from '../../assets/Legends/katrin.jfif';
import img5 from '../../assets/Legends/annie.jpg';
import img6 from '../../assets/Legends/mederios.webp';
// Register once
gsap.registerPlugin(ScrollTrigger);

const LEGENDS = [
  {
    name: "Rich Froning Jr.",
    subtitle: "Champion 2011–2014",
    img: img1,
    color: "#0055b9",
  },
  {
    name: "Mat Fraser",
    subtitle: "Champion 2016–2020",
    img: img2,
    color: "#bc0529",
  },
  {
    name: "Tia-Clair Toomey",
    subtitle: "Championne 2017–2022",
    img: img3,
    color: "#0055b9",
  },
  {
    name: "Katrín Davíðsdóttir",
    subtitle: "Championne 2015–2016",
    img: img4,
    color: "#bc0529",
  },
  {
    name: "Annie Thorisdottir",
    subtitle: "Multiple podiums",
    img: img5,
    color: "#0055b9",
  },
  {
    name: "Justin Medeiros",
    subtitle: "Champion 2021–2022",
    img: img6,
    color: "#bc0529",
  },
];

export default function LegendsMasonry() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".legend-card");

      // entrance
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        rotate: (i) => gsap.utils.random(-3, 3, 0.5),
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      });

      // float / idle motion
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: "+=6",
          rotate: "+=0.5",
          duration: 3 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="legends" ref={rootRef} className="legends-section">
      <div className="legends-header">
        <h2 className="legends-title">
          Les <span className="accent">LÉGENDES</span> des CrossFit Games
        </h2>
        <p className="legends-sub">
          Des athlètes d’exception qui ont repoussé les limites du possible et redéfini le mot <em>performance</em>.
        </p>
      </div>

      {/* CSS Masonry using columns */}
      <div className="masonry">
        {LEGENDS.map((l, i) => (
          <article key={l.name} className="legend-card" style={{ "--accent": l.color }}>
            <div className="legend-image-wrap">
              <img src={l.img} alt={l.name} loading="lazy" />
              <span className="legend-tag">{l.subtitle}</span>
            </div>
            <div className="legend-info">
              <h3>{l.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
