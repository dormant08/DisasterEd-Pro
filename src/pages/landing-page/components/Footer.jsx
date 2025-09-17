import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import LanguageSelector from '../../../components/ui/LanguageSelector';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Learning Modules', path: '/learning-modules' },
        { label: 'Virtual Drills', path: '/virtual-drill-simulator' },
        { label: 'Emergency Alerts', path: '/emergency-alerts' },
        { label: 'Student Dashboard', path: '/student-dashboard' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Safety Guidelines', path: '/safety-guidelines' },
        { label: 'Emergency Contacts', path: '/emergency-contacts' },
        { label: 'Training Materials', path: '/training-materials' }
      ]
    },
    {
      title: 'Institution',
      links: [
        { label: 'For Schools', path: '/schools' },
        { label: 'For Teachers', path: '/teachers' },
        { label: 'Administrator Tools', path: '/admin-tools' },
        { label: 'Pricing Plans', path: '/pricing' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'Technical Support', path: '/support' },
        { label: 'Training Webinars', path: '/webinars' },
        { label: 'Community Forum', path: '/forum' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/disasteredpro' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/disasteredpro' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/disasteredpro' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/disasteredpro' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Data Protection', path: '/data-protection' },
    { label: 'Cookie Policy', path: '/cookies' }
  ];

  const certifications = [
    { name: 'CBSE Approved', icon: 'Award' },
    { name: 'NDMA Certified', icon: 'Shield' },
    { name: 'ISO 27001', icon: 'Lock' },
    { name: 'Data Privacy', icon: 'UserCheck' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/landing-page" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <span className="font-heading font-bold text-2xl text-foreground">
                DisasterEd Pro
              </span>
            </Link>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Comprehensive disaster preparedness education platform for Indian schools. Building safer communities through interactive learning and virtual drill simulations.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Icon name="Mail" size={16} className="text-primary" />
                <span className="text-muted-foreground">support@disasteredpro.in</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Icon name="Phone" size={16} className="text-primary" />
                <span className="text-muted-foreground">+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-muted-foreground">New Delhi, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title} className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground">
                {section?.title}
              </h3>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.label}>
                    <Link
                      to={link?.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Trusted & Certified
              </h4>
              <div className="flex flex-wrap gap-4">
                {certifications?.map((cert) => (
                  <div
                    key={cert?.name}
                    className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg"
                  >
                    <Icon name={cert?.icon} size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{cert?.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <LanguageSelector
                variant="outline"
                position="bottom-right"
                className="mb-4 lg:mb-0"
                onLanguageChange={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-semibold text-warning mb-1">
                Emergency Helpline
              </h4>
              <p className="text-sm text-muted-foreground">
                For immediate emergency assistance, call <strong>112</strong> (National Emergency Number) or your local emergency services. This platform is for educational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} DisasterEd Pro. All rights reserved. Made with ❤️ for safer schools in India.
            </div>
            
            <div className="flex flex-wrap gap-4">
              {legalLinks?.map((link) => (
                <Link
                  key={link?.label}
                  to={link?.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;