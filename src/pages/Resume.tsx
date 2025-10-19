import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Sparkles, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const Resume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast.success('Resume uploaded successfully!');
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock analysis data
    setAnalysis({
      score: 78,
      strengths: [
        'Strong technical skills section',
        'Quantified achievements',
        'Clear project descriptions',
        'Good formatting and readability',
      ],
      improvements: [
        'Add more industry-specific keywords',
        'Include leadership experiences',
        'Expand on project impact',
        'Add certifications section',
      ],
      keywords: ['React', 'TypeScript', 'Python', 'Machine Learning', 'Git'],
      missingSkills: ['Docker', 'AWS', 'GraphQL', 'CI/CD'],
      sections: {
        education: 85,
        experience: 75,
        skills: 80,
        formatting: 90,
      },
    });

    setIsAnalyzing(false);
    toast.success('Analysis complete!');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Resume Optimizer</h1>
            <p className="text-muted-foreground">
              Upload your resume and get AI-powered insights to improve it
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 shadow-card">
                {!file ? (
                  <div className="text-center">
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer block border-2 border-dashed border-muted rounded-xl p-12 hover:border-primary transition-smooth"
                    >
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Upload Your Resume
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Support for PDF, DOC, and DOCX files (Max 5MB)
                        </p>
                        <Button className="bg-primary hover:bg-primary/90">
                          Choose File
                        </Button>
                      </div>
                    </label>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg mb-6">
                      <FileText className="h-10 w-10 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFile(null);
                          setAnalysis(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>

                    {!analysis && (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Analyze Resume
                          </>
                        )}
                      </Button>
                    )}

                    {analysis && (
                      <div className="space-y-6">
                        {/* Overall Score */}
                        <Card className="p-6 bg-gradient-hero">
                          <div className="text-center mb-4">
                            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-4">
                              <span className="text-4xl font-bold text-primary">
                                {analysis.score}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Overall Score</h3>
                            <p className="text-muted-foreground">
                              Your resume is performing well!
                            </p>
                          </div>
                        </Card>

                        {/* Section Scores */}
                        <div>
                          <h3 className="font-semibold text-lg mb-4">Section Breakdown</h3>
                          <div className="space-y-4">
                            {Object.entries(analysis.sections).map(([section, score]: [string, any]) => (
                              <div key={section}>
                                <div className="flex justify-between mb-2">
                                  <span className="capitalize font-medium">{section}</span>
                                  <span className="text-primary font-semibold">{score}%</span>
                                </div>
                                <Progress value={score} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Strengths */}
                        <div>
                          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-success" />
                            Strengths
                          </h3>
                          <ul className="space-y-2">
                            {analysis.strengths.map((strength: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Improvements */}
                        <div>
                          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Areas for Improvement
                          </h3>
                          <ul className="space-y-2">
                            {analysis.improvements.map((improvement: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>

            {/* Tips Section */}
            <div className="space-y-6">
              <Card className="p-6 shadow-card">
                <h3 className="font-semibold text-lg mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Use action verbs to start bullet points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Quantify achievements with numbers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Keep it to one page if possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Include relevant keywords from job descriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Proofread for grammar and spelling</span>
                  </li>
                </ul>
              </Card>

              {analysis && (
                <Card className="p-6 shadow-card">
                  <h3 className="font-semibold text-lg mb-4">Detected Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {analysis.keywords.map((keyword: string) => (
                      <Badge key={keyword} className="bg-success/10 text-success border-success/20">
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  <h4 className="font-medium text-sm mb-2">Missing High-Demand Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingSkills.map((skill: string) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
