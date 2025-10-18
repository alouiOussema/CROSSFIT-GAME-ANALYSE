// src/components/Hero/Hero.js
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './hero.css';

import img1 from '../../assets/card-1.jpg';
import img2 from '../../assets/card-2.jpg';
import img3 from '../../assets/card-3.jpg';

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Cibles
      const title = ".hero-main-title";
      const subtitle = ".hero-subtitle"; // Nouvelle cible
      const cards = ".hero-card";
      const shapes = gsap.utils.toArray(".shape"); // Nouvelle cible pour les formes

      // Animations
      gsap.fromTo(title, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      // Animation du sous-titre
      gsap.fromTo(subtitle,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo(cards, 
        { opacity: 0, y: 100, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2, delay: 0.7 }
      );
      
      // Animation des formes abstraites
      shapes.forEach(shape => {
        gsap.to(shape, {
          x: "random(-20, 20, 5)", // Mouvement aléatoire horizontal
          y: "random(-20, 20, 5)", // Mouvement aléatoire vertical
          duration: "random(2, 4)",
          ease: "sine.inOut",
          repeat: -1, // Répète à l'infini
          yoyo: true // Fait l'animation en aller-retour
        });
        gsap.fromTo(shape, 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
        );
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);
  return (
    <section id="home" className="hero-section" ref={heroRef}>0
    <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="hero-container">
        <h1 className="hero-main-title">
          La Compétition Ultime de <span className="highlight-red">Fitness</span>
        </h1>
        <p className="hero-subtitle">
          Découvrez les données, les athlètes et les moments qui ont marqué l'histoire des CrossFit Games.
        </p>
        <div className="hero-grid">
          <div className="hero-card">
            <img src={img1} alt="CrossFit Athlete - Force" />
            <div className="card-title">Force</div>
          </div>
          <div className="hero-card">
            <img src={img2} alt="CrossFit Athlete - Endurance" />
            <div className="card-title">Endurance</div>
          </div>
          <div className="hero-card">
            <img src={img3} alt="CrossFit Athlete - Détermination" />
            <div className="card-title">Détermination</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
