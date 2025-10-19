import { CheckCircle2, Circle, XCircle } from 'lucide-react';
import { ApplicationStatus } from '@/types/application';
import { cn } from '@/lib/utils';

interface TimelineStep {
  status: ApplicationStatus;
  label: string;
  date?: string;
}

interface StatusTimelineProps {
  currentStatus: ApplicationStatus;
}

export const StatusTimeline = ({ currentStatus }: StatusTimelineProps) => {
  const steps: TimelineStep[] = [
    { status: 'pending', label: 'Application Submitted' },
    { status: 'reviewing', label: 'Under Review' },
    { status: 'interview', label: 'Interview' },
    { status: 'accepted', label: 'Accepted' },
  ];

  const statusOrder: ApplicationStatus[] = ['pending', 'reviewing', 'interview', 'accepted', 'rejected'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  const getStepStatus = (stepIndex: number) => {
    if (currentStatus === 'rejected') {
      return stepIndex === 0 ? 'completed' : 'rejected';
    }
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="py-6">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-muted" />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            
            return (
              <div key={step.status} className="relative flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-smooth',
                    status === 'completed' && 'border-primary bg-primary',
                    status === 'current' && 'border-primary bg-white',
                    status === 'upcoming' && 'border-muted bg-white',
                    status === 'rejected' && 'border-destructive bg-destructive'
                  )}
                >
                  {status === 'completed' && (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  )}
                  {status === 'current' && (
                    <Circle className="h-4 w-4 text-primary fill-primary" />
                  )}
                  {status === 'upcoming' && (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  {status === 'rejected' && (
                    <XCircle className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <p
                    className={cn(
                      'font-medium',
                      status === 'completed' && 'text-foreground',
                      status === 'current' && 'text-primary',
                      status === 'upcoming' && 'text-muted-foreground',
                      status === 'rejected' && 'text-destructive'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.date && (
                    <p className="text-sm text-muted-foreground mt-1">{step.date}</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Rejected Status */}
          {currentStatus === 'rejected' && (
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-destructive bg-destructive">
                <XCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-destructive">Application Not Selected</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Thank you for your interest
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
