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
          {/* Left Section */}
          {/* <div className="flex flex-col items-center md:items-start">
          <button
            className="mt-16 mb-6 flex items-center space-x-2 border border-indigo-600 text-indigo-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 transition"
            type="button"
          >
            <span>Explore how we help grow brands.</span>
            <span className="flex items-center justify-center size-6 p-1 rounded-full bg-indigo-600">
              <svg width="14" height="11" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6.5h14M9.5 1 15 6.5 9.5 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <h1 className="text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
            Preferred choice of leaders in
            <span className="text-indigo-600"> every industry</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
            Learn why professionals trust our solution to complete their customer journey.
          </p>
         
        </div> */}
          <TypingEffect></TypingEffect>
              {/* <HeroSection></HeroSection> */}
              {/* <PortfolioHero></PortfolioHero> */}
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
