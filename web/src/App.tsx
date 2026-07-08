import { NavBar } from './components/NavBar';
import { ProgressRail } from './components/ProgressRail';
import { ExplainProvider } from './components/ExplainContext';
import { SustentacionProvider } from './components/Sustentacion';
import { Hero } from './sections/Hero';
import { Resumen } from './sections/Resumen';
import { MarcoTeorico } from './sections/MarcoTeorico';
import { Metodologia } from './sections/Metodologia';
import { Cualitativas } from './sections/Cualitativas';
import { Cuantitativas } from './sections/Cuantitativas';
import { Conclusiones } from './sections/Conclusiones';
import { Referencias } from './sections/Referencias';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <ExplainProvider>
      <SustentacionProvider>
        <NavBar />
        <ProgressRail />
        <main>
          <Hero />
          <Resumen />
          <MarcoTeorico />
          <Metodologia />
          <Cualitativas />
          <Cuantitativas />
          <Conclusiones />
          <Referencias />
        </main>
        <Footer />
      </SustentacionProvider>
    </ExplainProvider>
  );
}
