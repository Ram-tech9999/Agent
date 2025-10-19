import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'application' | 'status_update' | 'view';
  title: string;
  description: string;
  time: string;
  company?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    const colors = {
      application: 'bg-primary/10 text-primary',
      status_update: 'bg-success/10 text-success',
      view: 'bg-secondary/10 text-secondary',
    };

    return colors[type];
  };

  return (
    <Card className="p-6 shadow-card">
      <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        Recent Activity
      </h3>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <Avatar className={`h-10 w-10 flex-shrink-0 ${getActivityIcon(activity.type)}`}>
              <AvatarFallback className={getActivityIcon(activity.type)}>
                {activity.company?.charAt(0) || activity.title.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
