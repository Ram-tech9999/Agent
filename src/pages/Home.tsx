import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/internships?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Hero onSearch={handleSearch} />
      <Footer />
    </div>
  );
};

export default Home;
