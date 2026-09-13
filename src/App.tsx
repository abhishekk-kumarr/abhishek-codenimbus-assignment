import React, { useState, useEffect } from 'react';
import { NavTab, Wish } from './types';
import { weddingData } from './data/weddingData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { CoupleSection } from './components/CoupleSection';
import { WishesCarouselSection } from './components/WishesCarouselSection';
import { SendWishesSection } from './components/SendWishesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [wishes, setWishes] = useState<Wish[]>(weddingData.initialWishes);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about') setCurrentTab('about');
      else if (hash === 'gallery') setCurrentTab('gallery');
      else setCurrentTab('home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddWish = (newWish: Wish) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  return (
    <div className="wed010-wrapper min-h-screen flex flex-col justify-between bg-white text-gray-800 antialiased selection:bg-[#931711] selection:text-white">
      {/* Top Fixed Header Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Content Areas */}
      <main className="w-full flex-1">
        {currentTab === 'home' && (
          <>
            <HeroSection />
            <CountdownSection />
            <CoupleSection />
            <WishesCarouselSection wishes={wishes} />
            <SendWishesSection onAddWish={handleAddWish} />
            <ScheduleSection />
          </>
        )}

        {currentTab === 'about' && <AboutSection />}

        {currentTab === 'gallery' && <GallerySection />}
      </main>

      {/* Shared Global Footer */}
      <Footer />

      {/* Floating Call & Music Action Buttons */}
      <FloatingActions />
    </div>
  );
}

export default App;
