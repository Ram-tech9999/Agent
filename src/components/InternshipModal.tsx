import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, DollarSign, Building2, Clock, CheckCircle2 } from 'lucide-react';
import { Internship } from '@/types/internship';
import { cn } from '@/lib/utils';

interface InternshipModalProps {
  internship: Internship | null;
  open: boolean;
  onClose: () => void;
}

export const InternshipModal = ({ internship, open, onClose }: InternshipModalProps) => {
  if (!internship) return null;

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">
                {internship.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4" />
                <span className="font-medium text-foreground">{internship.company}</span>
              </DialogDescription>
            </div>
            <Badge className={cn('border', getTypeColor(internship.type))}>
              {internship.type}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-semibold">{internship.stipend}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-3">About this Internship</h3>
            <p className="text-muted-foreground leading-relaxed">
              {internship.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Responsibilities</h3>
            <ul className="space-y-2">
              {internship.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Requirements</h3>
            <ul className="space-y-2">
              {internship.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Apply Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/5"
            >
              Save for Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
