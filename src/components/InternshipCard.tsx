import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, DollarSign, Building2, Clock } from 'lucide-react';
import { Internship } from '@/types/internship';
import { cn } from '@/lib/utils';

interface InternshipCardProps {
  internship: Internship;
  onViewDetails: (internship: Internship) => void;
}

export const InternshipCard = ({ internship, onViewDetails }: InternshipCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'bg-success/10 text-success border-success/20';
      case 'Hybrid':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'On-site':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth group cursor-pointer">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-smooth">
              {internship.title}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{internship.company}</span>
            </div>
          </div>
          <Badge className={cn('border', getTypeColor(internship.type))}>
            {internship.type}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{internship.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span className="font-medium">{internship.stipend}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Apply by {new Date(internship.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {internship.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {internship.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {internship.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{internship.skills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={() => onViewDetails(internship)}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary/5"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
