import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

interface MatchScoreProps {
  score: number;
  internshipTitle: string;
  company: string;
}

export const MatchScore = ({ score, internshipTitle, company }: MatchScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{internshipTitle}</h4>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</span>
        </div>
      </div>
      <Progress value={score} className="h-2" />
      <p className="text-xs text-muted-foreground mt-2">
        {score >= 80 && 'Excellent match! Apply now.'}
        {score >= 60 && score < 80 && 'Good match. Consider applying.'}
        {score < 60 && 'Fair match. Review requirements.'}
      </p>
    </Card>
  );
};
