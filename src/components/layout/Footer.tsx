import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t mt-20 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">InternHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting talented students with amazing opportunities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/internships" className="hover:text-primary transition-smooth">
                  Browse Internships
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Career Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Post an Internship
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Company Resources
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 InternHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
