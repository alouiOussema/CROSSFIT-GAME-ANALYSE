import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/header";
import Hero from "./components/Hero/hero";
import ContentSection from "./components/Content/content";
import LegendsMasonry from "./components/Legends/LegendsMasonry";
import RecordsStats from "./components/Records/RecordsStats";
import Footer from "./components/Footer/Footer";

import aboutImg from "./assets/about-crossfit.webp";
//import legendsImg from './assets/legends.jpg';
//import recordsImg from './assets/records.jpg';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />

        <ContentSection
          id="about"
          overline="À PROPOS"
          title="Qu'est-ce que les CrossFit Games ?"
          highlight="CrossFit Games"
          image={aboutImg}
          imageSide="left"
          accent="blue"
          ctaText="Voir le dashboard Par Compétition"
          ctaHref="#dashboard"
        >
          <p>
            Les CrossFit Games sont la scène ultime du fitness : une série
            d’épreuves tenues secrètes jusqu’au dernier moment, combinant{" "}
            <strong>haltérophilie</strong>, <strong>gymnastique</strong>,
            <strong>endurance</strong> et <strong>skills</strong>. L’objectif :
            couronner le <em>Fittest on Earth</em>.
          </p>
          <p>
            Notre tableau de bord <strong>Power BI</strong> explore l’édition{" "}
            <strong>2019</strong> : performance par épreuve, pays et salles de
            sport représentés, tendances et moments clés — pour comprendre
            comment se gagne un titre… et comment il se perd.
          </p>
        </ContentSection>

        <LegendsMasonry />
        <RecordsStats />
      </main>
      <Footer />
    </div>
  );
}

export default App;
