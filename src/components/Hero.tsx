import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Launch Your Career with the Perfect Internship
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Discover opportunities from top companies and kickstart your professional journey
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white p-2 rounded-xl shadow-card-hover">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  name="search"
                  placeholder="Search by job title, company, or skills..."
                  className="pl-12 h-14 border-0 bg-transparent text-base focus-visible:ring-0"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Active Internships</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-white/80">Partner Companies</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-white/80">Students Placed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
