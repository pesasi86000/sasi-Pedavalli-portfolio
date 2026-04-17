import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sasi Pedavalli — Data Engineer</title>
        <meta name="description" content="Data Engineer with 7+ years building production pipelines across Azure, AWS, and GCP. Specializing in real-time streaming, data lake architecture, and cloud-native ETL." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='4' fill='%23c9a227'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='18' fill='%23050505' font-family='monospace' font-weight='bold'>SP</text></svg>" />
      </Head>

      <div className="grid-bg" />

      <Navbar />

      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
