import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ApplicationCard } from '@/components/applications/ApplicationCard';
import { StatusTimeline } from '@/components/applications/StatusTimeline';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApplicationStore } from '@/store/applicationStore';
import { Application, ApplicationStatus } from '@/types/application';
import { Briefcase } from 'lucide-react';

const Applications = () => {
  const { applications } = useApplicationStore();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const filterByStatus = (status?: ApplicationStatus) => {
    if (!status) return applications;
    return applications.filter((app) => app.status === status);
  };

  const statusCounts = {
    all: applications.length,
    pending: filterByStatus('pending').length,
    reviewing: filterByStatus('reviewing').length,
    interview: filterByStatus('interview').length,
    accepted: filterByStatus('accepted').length,
    rejected: filterByStatus('rejected').length,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Applications</h1>
            <p className="text-muted-foreground">
              Track and manage your internship applications
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto">
              <TabsTrigger value="all">
                All ({statusCounts.all})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({statusCounts.pending})
              </TabsTrigger>
              <TabsTrigger value="reviewing">
                Reviewing ({statusCounts.reviewing})
              </TabsTrigger>
              <TabsTrigger value="interview">
                Interview ({statusCounts.interview})
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Accepted ({statusCounts.accepted})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({statusCounts.rejected})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {applications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {applications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            {(['pending', 'reviewing', 'interview', 'accepted', 'rejected'] as ApplicationStatus[]).map(
              (status) => (
                <TabsContent key={status} value={status} className="mt-6">
                  {filterByStatus(status).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filterByStatus(status).map((application) => (
                        <ApplicationCard
                          key={application.id}
                          application={application}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState status={status} />
                  )}
                </TabsContent>
              )
            )}
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* Application Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedApplication?.internshipTitle}
            </DialogTitle>
            <p className="text-muted-foreground">{selectedApplication?.company}</p>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              <StatusTimeline currentStatus={selectedApplication.status} />

              <div>
                <h4 className="font-semibold mb-2">Application Details</h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Applied Date:</dt>
                    <dd className="font-medium">
                      {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Last Updated:</dt>
                    <dd className="font-medium">
                      {new Date(selectedApplication.lastUpdated).toLocaleDateString()}
                    </dd>
                  </div>
                  {selectedApplication.matchScore && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Match Score:</dt>
                      <dd className="font-medium text-primary">
                        {selectedApplication.matchScore}%
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {selectedApplication.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const EmptyState = ({ status }: { status?: ApplicationStatus }) => {
  const getMessage = () => {
    if (!status) return 'No applications yet';
    return `No ${status} applications`;
  };

  return (
    <div className="text-center py-16">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
        <Briefcase className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{getMessage()}</h3>
      <p className="text-muted-foreground">
        {!status
          ? 'Start applying to internships to see them here'
          : `You don't have any ${status} applications at the moment`}
      </p>
    </div>
  );
};

export default Applications;
