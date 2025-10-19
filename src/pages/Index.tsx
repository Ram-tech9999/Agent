import { useState, useMemo } from 'react';
import { Hero } from '@/components/Hero';
import { FilterSidebar } from '@/components/FilterSidebar';
import { InternshipCard } from '@/components/InternshipCard';
import { InternshipModal } from '@/components/InternshipModal';
import { internshipsData } from '@/data/internships';
import { Internship, FilterType, CategoryType } from '@/types/internship';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

const Index = () => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInternships = useMemo(() => {
    return internshipsData.filter((internship) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Type filter
      const matchesType =
        selectedType === 'all' ||
        internship.type.toLowerCase() === selectedType.replace('-', '');

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || internship.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedCategory]);

  const handleViewDetails = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setSelectedType('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">InternHub</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                For Companies
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Sign In
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Post Internship
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero onSearch={setSearchQuery} />

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <FilterSidebar
              selectedType={selectedType}
              selectedCategory={selectedCategory}
              onTypeChange={setSelectedType}
              onCategoryChange={setSelectedCategory}
              onReset={handleReset}
            />
          </aside>

          {/* Internship Listings */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {filteredInternships.length} Internship
                {filteredInternships.length !== 1 ? 's' : ''} Available
              </h2>
              <p className="text-muted-foreground">
                Find the perfect opportunity to launch your career
              </p>
            </div>

            {filteredInternships.length > 0 ? (
              <div className="grid gap-6 animate-fade-in">
                {filteredInternships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <Briefcase className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No internships found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={handleReset} variant="outline">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">InternHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting talented students with amazing opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Browse Internships</a></li>
                <li><a href="#" className="hover:text-primary">Career Resources</a></li>
                <li><a href="#" className="hover:text-primary">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Post an Internship</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Company Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 InternHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <InternshipModal
        internship={selectedInternship}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
