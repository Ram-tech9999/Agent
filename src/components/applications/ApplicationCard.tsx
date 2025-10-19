import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Calendar, TrendingUp } from 'lucide-react';
import { Application } from '@/types/application';
import { cn } from '@/lib/utils';

interface ApplicationCardProps {
  application: Application;
  onViewDetails: (application: Application) => void;
}

export const ApplicationCard = ({ application, onViewDetails }: ApplicationCardProps) => {
  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-success/10 text-success border-success/20';
      case 'interview':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'reviewing':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: Application['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{application.internshipTitle}</h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Building2 className="h-4 w-4" />
            <span>{application.company}</span>
          </div>
        </div>
        <Badge className={cn('border', getStatusColor(application.status))}>
          {getStatusLabel(application.status)}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
        </div>
        {application.matchScore && (
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-medium">{application.matchScore}% Match</span>
          </div>
        )}
      </div>

      <Button
        variant="outline"
        className="w-full border-primary text-primary hover:bg-primary/5"
        onClick={() => onViewDetails(application)}
      >
        View Details
      </Button>
    </Card>
  );
};
