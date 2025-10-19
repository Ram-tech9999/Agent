import { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FilterSidebar } from '@/components/FilterSidebar';
import { InternshipCard } from '@/components/InternshipCard';
import { InternshipModal } from '@/components/InternshipModal';
import { internshipsData } from '@/data/internships';
import { Internship, FilterType, CategoryType } from '@/types/internship';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Briefcase } from 'lucide-react';

const Internships = () => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInternships = useMemo(() => {
    return internshipsData.filter((internship) => {
      const matchesSearch =
        searchQuery === '' ||
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesType =
        selectedType === 'all' ||
        internship.type.toLowerCase() === selectedType.replace('-', '');

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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Search Section */}
        <section className="bg-gradient-hero py-12 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Find Your Dream Internship</h1>
            <div className="max-w-2xl">
              <div className="flex gap-2 bg-white p-2 rounded-xl shadow-card">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by job title, company, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
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
      </main>

      <Footer />

      {/* Modal */}
      <InternshipModal
        internship={selectedInternship}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Internships;
