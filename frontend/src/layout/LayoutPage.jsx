import React, { useState } from 'react';
import { useRef } from 'react';
import { ProjectPage } from '../components/ProjectPage';
import { SkillPage } from '../pages/SkillPage';
import { BlgoPage } from '../pages/BlogPage';
import { ContactPage } from '../pages/ContactPage';
import { FooterPage } from '../pages/FooterPage';
import TypingEffect from '../pages/TypingEffect';
import HeroSection from '../pages/TypingEffect';
import PortfolioHero from '../pages/TypingEffect';
// import './FloatingAvatar.css'; // For animations

export const LayoutPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const homeRef = useRef(null);
  const projectRef = useRef(null);
  const skillRef = useRef(null);
  const contactRef = useRef(null);

  // Smooth scroll handler
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // optional: close menu on mobile
  };

  return (
    <>
      <section id="section" className="bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF]  pt-32 h-full">
        {/* Header / Navbar */}
        <header className="flex items-center bg-white shadow-md justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-6  fixed top-0 left-0 w-full z-50">
          <a href="/" className='font-bold text-3xl text-blue-600'>
            Mohit
          </a>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-600 z-50">
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Nav Links */}
          <nav
            className={` md:flex items-center gap-8 text-gray-900 text-sm font-normal transition-all duration-300 ${menuOpen
              ? 'absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-6 z-40'
              : 'hidden md:flex'
              }`}
          >
            <button onClick={() => scrollToSection(homeRef)} className="hover:text-indigo-600 text-lg">Home</button>
            <button onClick={() => scrollToSection(projectRef)} className="hover:text-indigo-600 text-lg">Project</button>
            <button onClick={() => scrollToSection(skillRef)} className="hover:text-indigo-600 text-lg">Skill</button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-indigo-600 text-lg">Contact</button>

          </nav>
        </header>

        {/* Main Content */}
        <main className="flex flex-col md:flex-row items-center max-md:text-center justify-between mt-1 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full">
          
          <TypingEffect></TypingEffect>
          {/* Right Section - Avatar with animation */}
          <div aria-label="Photos of leaders" className="mt-4 pb-6 flex justify-center items-center">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-4 border-transparent spin-border z-0"></div>
              <img
                src="/Profile.jpeg"
                alt="Leader"
                className="w-52 h-52 rounded-full object-cover shadow-xl hover:scale-105 transition-transform duration-500 float-animation z-10"
              />
            </div>
          </div>
        </main>
      </section>

      <ProjectPage ref={projectRef}></ProjectPage>
      <SkillPage ref={skillRef}></SkillPage>
      {/* <BlgoPage></BlgoPage> */}
      <ContactPage ref={contactRef}></ContactPage>
      <FooterPage></FooterPage>

    </>
  );
};
