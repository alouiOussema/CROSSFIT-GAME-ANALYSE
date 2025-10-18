import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./records.css";

gsap.registerPlugin(ScrollTrigger);

/** 👉 REMPLACE par ton lien d’intégration Power BI */
const EMBED_URL = "https://app.powerbi.com/reportEmbed?reportId=921e450e-75c2-4e14-84cc-1a47de78f8d2&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730";

export default function RecordsDashboard() {
  const root = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header fly-in
      gsap.from(".wr-title, .wr-sub", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });

      // Accents idle motion
      gsap.to(".wr-stripe", {
        xPercent: "+=4",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 6,
        stagger: 0.2,
      });

      // Card entrance
      gsap.from(".wr-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wr-card", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // petite sécurité: si l'iframe n’émet pas d’event, on enlève le skeleton après 5s
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="records" ref={root} className="wr-section">
      {/* Accents */}
      <div className="wr-stripes" aria-hidden>
        <span className="wr-stripe blue" />
        <span className="wr-stripe red" />
        <span className="wr-stripe blue" />
      </div>

      {/* Header */}
      <div className="wr-header">
        <h2 className="wr-title">Dashboard <span className="accent">Power&nbsp;BI</span></h2>
        <p className="wr-sub">
          Analyse interactive des performances et tendances CrossFit — un tableau de bord visuel et dynamique.
        </p>
      </div>

      {/* Report Card */}
      <div className="wr-card">
        <div className="wr-card-head">
          <div className="wr-badges">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          <div className="wr-head-title">CrossFit Games 2019 — Bienvenu</div>
          <a className="wr-open" href={EMBED_URL} target="_blank" rel="noreferrer">
            Ouvrir dans Power&nbsp;BI
          </a>
        </div>

        <div className="wr-frame-wrap">
          {!loaded && (
            <div className="wr-skeleton" aria-hidden>
              <div className="sk-row" />
              <div className="sk-row" />
              <div className="sk-row short" />
            </div>
          )}

          <iframe
            title="Power BI — CrossFit 2019"
            src={EMBED_URL}
            frameBorder="0"
            allowFullScreen
            className={`wr-iframe ${loaded ? "show" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* optional helper text */}
        <div className="wr-help">
          Utilisez les filtres du rapport pour explorer : événements (1→12), formats, pays, salles de sport, profils athlètes.
        </div>
      </div>
    </section>
  );
}
