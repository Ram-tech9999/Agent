import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { MatchScore } from '@/components/dashboard/MatchScore';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Eye, 
  Upload,
  Edit
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useApplicationStore } from '@/store/applicationStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { applications } = useApplicationStore();
  const navigate = useNavigate();

  const stats = {
    totalApplications: applications.length,
    inProgress: applications.filter(app => ['reviewing', 'interview'].includes(app.status)).length,
    views: 234,
    profileCompletion: 85,
  };

  const recentActivities = [
    {
      id: '1',
      type: 'status_update' as const,
      title: 'Application Status Updated',
      description: 'Software Engineering Intern at TechCorp moved to Interview',
      time: '2 hours ago',
      company: 'TechCorp',
    },
    {
      id: '2',
      type: 'application' as const,
      title: 'New Application Submitted',
      description: 'Applied to Data Science Intern at DataVision',
      time: '1 day ago',
      company: 'DataVision',
    },
    {
      id: '3',
      type: 'view' as const,
      title: 'Profile Viewed',
      description: 'DesignHub viewed your profile',
      time: '2 days ago',
      company: 'DesignHub',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your internship search
                </p>
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate('/internships')}
              >
                Browse Internships
              </Button>
            </div>
          </div>

          {/* Profile Card */}
          <Card className="p-6 mb-8 shadow-card">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24 flex-shrink-0">
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                    <p className="text-muted-foreground mb-2">{user?.email}</p>
                    {user?.university && (
                      <p className="text-sm">
                        {user.major} • {user.university} • Class of {user.graduationYear}
                      </p>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {user?.skills && user.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Applications"
              value={stats.totalApplications}
              change="+2 this week"
              changeType="positive"
              icon={Briefcase}
              iconColor="text-primary"
            />
            <StatsCard
              title="In Progress"
              value={stats.inProgress}
              change="2 interviews scheduled"
              changeType="positive"
              icon={TrendingUp}
              iconColor="text-success"
            />
            <StatsCard
              title="Profile Views"
              value={stats.views}
              change="+18% from last week"
              changeType="positive"
              icon={Eye}
              iconColor="text-secondary"
            />
            <StatsCard
              title="Profile Completion"
              value={`${stats.profileCompletion}%`}
              change="Upload resume to complete"
              changeType="neutral"
              icon={FileText}
              iconColor="text-primary"
            />
          </div>

          {/* Resume Upload CTA */}
          {!user?.resume && (
            <Card className="p-6 mb-8 bg-gradient-hero border-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="h-16 w-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-lg mb-1">Complete Your Profile</h3>
                  <p className="text-muted-foreground">
                    Upload your resume to get AI-powered optimization and better job matches
                  </p>
                </div>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/resume')}
                >
                  Upload Resume
                </Button>
              </div>
            </Card>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recommended Matches */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Top Matches For You</h3>
              <MatchScore
                score={92}
                internshipTitle="Software Engineering Intern"
                company="TechCorp"
              />
              <MatchScore
                score={85}
                internshipTitle="Product Design Intern"
                company="DesignHub"
              />
              <MatchScore
                score={78}
                internshipTitle="Data Science Intern"
                company="DataVision"
              />
            </div>

            {/* Recent Activity */}
            <div>
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
