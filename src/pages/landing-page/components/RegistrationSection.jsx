import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RegistrationSection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    state: ''
  });

  const userRoles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access interactive learning modules, virtual drills, and gamified challenges',
      icon: 'GraduationCap',
      color: 'primary',
      benefits: [
        'Interactive disaster education modules',
        'Virtual drill simulations',
        'Gamified learning with badges',
        'Progress tracking and certificates'
      ]
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Monitor student progress, access curriculum tools, and manage classroom activities',
      icon: 'Users',
      color: 'secondary',
      benefits: [
        'Student progress monitoring',
        'Curriculum integration tools',
        'Classroom drill management',
        'Performance analytics dashboard'
      ]
    },
    {
      id: 'administrator',
      title: 'Administrator',
      description: 'Institutional oversight, compliance tracking, and comprehensive analytics',
      icon: 'Settings',
      color: 'accent',
      benefits: [
        'Institution-wide analytics',
        'Compliance monitoring',
        'Multi-user management',
        'Custom reporting tools'
      ]
    }
  ];

  const stateOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'punjab', label: 'Punjab' }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'border-primary/30 bg-primary/5 hover:border-primary/50';
      case 'secondary':
        return 'border-secondary/30 bg-secondary/5 hover:border-secondary/50';
      case 'accent':
        return 'border-accent/30 bg-accent/5 hover:border-accent/50';
      default:
        return 'border-primary/30 bg-primary/5 hover:border-primary/50';
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary';
      case 'secondary':
        return 'text-secondary';
      case 'accent':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Handle form submission
    console.log('Registration data:', { ...formData, role: selectedRole });
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="UserPlus" size={16} />
            <span>Join DisasterEd Pro Today</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Choose Your
            <span className="text-primary block">Learning Path</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Select your role to access personalized disaster preparedness education tailored to your needs and responsibilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Role Selection */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
              Select Your Role
            </h3>
            
            <div className="space-y-4">
              {userRoles?.map((role) => (
                <div
                  key={role?.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedRole === role?.id
                      ? `${getColorClasses(role?.color)} border-opacity-100`
                      : 'border-border bg-card hover:border-muted-foreground/30'
                  }`}
                  onClick={() => setSelectedRole(role?.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center ${
                      selectedRole === role?.id 
                        ? `${getIconColor(role?.color)} bg-current/10 border-current/20`
                        : 'text-muted-foreground bg-muted border-border'
                    }`}>
                      <Icon name={role?.icon} size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-heading font-semibold text-foreground">
                          {role?.title}
                        </h4>
                        {selectedRole === role?.id && (
                          <Icon name="CheckCircle" size={20} className={getIconColor(role?.color)} />
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {role?.description}
                      </p>
                      
                      <div className="space-y-2">
                        {role?.benefits?.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                Create Your Account
              </h3>
              <p className="text-muted-foreground">
                Get started with your disaster preparedness journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData?.name}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData?.phone}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Institution Name"
                type="text"
                name="institution"
                placeholder="Enter your school/college name"
                value={formData?.institution}
                onChange={handleInputChange}
                required
              />

              <Select
                label="State"
                placeholder="Select your state"
                options={stateOptions}
                value={formData?.state}
                onChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                required
              />

              <div className="space-y-4">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  fullWidth
                  disabled={!selectedRole}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Create Account
                </Button>

                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/student-dashboard" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </span>
                </div>
              </div>
            </form>

            {/* Quick Access */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Or explore as a guest
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link to="/learning-modules">
                  <Button variant="outline" size="sm" fullWidth>
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    View Modules
                  </Button>
                </Link>
                
                <Link to="/virtual-drill-simulator">
                  <Button variant="outline" size="sm" fullWidth>
                    <Icon name="Play" size={16} className="mr-2" />
                    Try Simulator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-primary">50,000+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-secondary">500+</div>
              <div className="text-sm text-muted-foreground">Partner Schools</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-accent">28</div>
              <div className="text-sm text-muted-foreground">States Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;