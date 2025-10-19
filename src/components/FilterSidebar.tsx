import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MapPin, Briefcase, Tag } from 'lucide-react';
import { FilterType, CategoryType } from '@/types/internship';

interface FilterSidebarProps {
  selectedType: FilterType;
  selectedCategory: CategoryType;
  onTypeChange: (type: FilterType) => void;
  onCategoryChange: (category: CategoryType) => void;
  onReset: () => void;
}

export const FilterSidebar = ({
  selectedType,
  selectedCategory,
  onTypeChange,
  onCategoryChange,
  onReset,
}: FilterSidebarProps) => {
  const types: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' },
  ];

  const categories: { value: CategoryType; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data', label: 'Data Science' },
    { value: 'product', label: 'Product' },
  ];

  return (
    <Card className="p-6 sticky top-6 shadow-card">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-primary hover:text-primary/80"
          >
            Reset
          </Button>
        </div>

        <Separator />

        {/* Work Type */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Work Type</h4>
          </div>
          <div className="space-y-3">
            {types.map((type) => (
              <div key={type.value} className="flex items-center gap-2">
                <Checkbox
                  id={`type-${type.value}`}
                  checked={selectedType === type.value}
                  onCheckedChange={() => onTypeChange(type.value)}
                />
                <Label
                  htmlFor={`type-${type.value}`}
                  className="text-sm cursor-pointer"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Category */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Category</h4>
          </div>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center gap-2">
                <Checkbox
                  id={`category-${category.value}`}
                  checked={selectedCategory === category.value}
                  onCheckedChange={() => onCategoryChange(category.value)}
                />
                <Label
                  htmlFor={`category-${category.value}`}
                  className="text-sm cursor-pointer"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
