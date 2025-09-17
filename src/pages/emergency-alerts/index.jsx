import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import AlertCard from './components/AlertCard';
import EmergencyContactCard from './components/EmergencyContactCard';
import AlertHistoryCard from './components/AlertHistoryCard';
import AlertMap from './components/AlertMap';
import NotificationSettings from './components/NotificationSettings';
import OfflineIndicator from './components/OfflineIndicator';

const EmergencyAlerts = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [bannerAlert, setBannerAlert] = useState(null);

  // Mock data for active alerts
  const activeAlerts = [
    {
      id: 1,
      title: "Earthquake Alert - Magnitude 5.2",
      type: "earthquake",
      severity: "critical",
      location: "New Delhi, NCR Region",
      description: `A moderate earthquake of magnitude 5.2 has been detected 45 km northeast of New Delhi. Tremors felt across NCR region including Gurgaon, Noida, and Faridabad. No immediate reports of damage, but residents are advised to stay alert.`,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: "active",
      actions: [
        "Move to open areas away from buildings",
        "Stay away from windows and heavy objects",
        "Do not use elevators",
        "Keep emergency kit ready",
        "Monitor official updates"
      ],
      duration: "Ongoing",
      affectedCount: 15000
    },
    {
      id: 2,
      title: "Heavy Rainfall Warning",
      type: "flood",
      severity: "high",
      location: "Mumbai, Maharashtra",
      description: `IMD has issued a red alert for extremely heavy rainfall in Mumbai and surrounding areas. Expected rainfall: 200-250mm in next 24 hours. Risk of waterlogging and flash floods in low-lying areas.`,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: "active",
      actions: [
        "Avoid unnecessary travel",
        "Stay indoors if possible",
        "Keep emergency supplies ready",
        "Monitor water levels in your area"
      ],
      duration: "Next 24 hours",
      affectedCount: 50000
    },
    {
      id: 3,
      title: "Fire Incident - Industrial Area",
      type: "fire",
      severity: "medium",
      location: "Sector 18, Gurgaon",
      description: `Fire reported at industrial complex in Sector 18, Gurgaon. Fire department on site. Smoke visible from nearby areas. Traffic diversions in place on NH-8.`,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: "active",
      actions: [
        "Avoid Sector 18 area",
        "Keep windows closed if nearby",
        "Follow traffic diversions",
        "Stay updated on evacuation notices"
      ],
      duration: "2-3 hours estimated",
      affectedCount: 2500
    }
  ];

  // Mock data for emergency contacts
  const emergencyContacts = [
    {
      id: 1,
      name: "National Emergency Response",
      department: "NDRF Headquarters",
      type: "disaster",
      phone: "112",
      email: "emergency@ndrf.gov.in",
      address: "NDRF Bhawan, New Delhi",
      available24x7: true,
      sms: true
    },
    {
      id: 2,
      name: "Delhi Police Control Room",
      department: "Delhi Police",
      type: "police",
      phone: "100",
      email: "control@delhipolice.gov.in",
      address: "Police Headquarters, ITO, New Delhi",
      available24x7: true,
      sms: true
    },
    {
      id: 3,
      name: "Fire Emergency Services",
      department: "Delhi Fire Service",
      type: "fire",
      phone: "101",
      email: "fire@delhi.gov.in",
      address: "Fire Station, Connaught Place",
      available24x7: true,
      sms: false
    },
    {
      id: 4,
      name: "Medical Emergency",
      department: "AIIMS Emergency",
      type: "medical",
      phone: "102",
      email: "emergency@aiims.edu",
      address: "AIIMS, Ansari Nagar, New Delhi",
      available24x7: true,
      sms: true
    },
    {
      id: 5,
      name: "School Emergency Coordinator",
      department: "Delhi Public School",
      type: "school",
      phone: "+91-11-2696-4825",
      email: "emergency@dpsrkpuram.com",
      address: "DPS RK Puram, New Delhi",
      available24x7: false,
      sms: true
    },
    {
      id: 6,
      name: "Parent Emergency Contact",
      department: "Primary Guardian",
      type: "family",
      phone: "+91-98765-43210",
      email: "parent@example.com",
      address: "Home Address, New Delhi",
      available24x7: true,
      sms: true
    }
  ];

  // Mock data for alert history
  const alertHistory = [
    {
      id: 10,
      title: "Cyclone Biparjoy Warning",
      type: "cyclone",
      severity: "critical",
      location: "Gujarat Coast",
      description: "Severe cyclonic storm approaching Gujarat coast with wind speeds up to 140 kmph.",
      timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
      duration: "48 hours",
      affectedCount: 100000,
      resolved: true
    },
    {
      id: 11,
      title: "Heat Wave Alert",
      type: "weather",
      severity: "high",
      location: "Rajasthan, Haryana",
      description: "Severe heat wave conditions with temperatures reaching 47°C in several districts.",
      timestamp: new Date(Date.now() - 86400000 * 7), // 1 week ago
      duration: "5 days",
      affectedCount: 200000,
      resolved: true
    },
    {
      id: 12,
      title: "Landslide Warning",
      type: "landslide",
      severity: "medium",
      location: "Himachal Pradesh",
      description: "Heavy rainfall triggers landslide risk in hilly areas of Himachal Pradesh.",
      timestamp: new Date(Date.now() - 86400000 * 14), // 2 weeks ago
      duration: "24 hours",
      affectedCount: 5000,
      resolved: true
    }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('disasteredpro-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Set banner alert for critical alerts
    const criticalAlert = activeAlerts?.find(alert => alert?.severity === 'critical');
    if (criticalAlert) {
      setBannerAlert(criticalAlert);
    }
  }, []);

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
  };

  const handleDismissAlert = (alertId) => {
    // In real app, this would update the alert status
    console.log('Dismissing alert:', alertId);
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleMessage = (phoneNumber) => {
    window.location.href = `sms:${phoneNumber}`;
  };

  const handleLocationUpdate = () => {
    // In real app, this would request location permission and update coordinates
    console.log('Updating location...');
  };

  const handleSaveSettings = (settings) => {
    // In real app, this would save settings to backend
    console.log('Saving settings:', settings);
    setShowSettings(false);
  };

  const handleViewOfflineProtocols = (protocol) => {
    // In real app, this would navigate to offline protocols
    console.log('Viewing offline protocol:', protocol);
  };

  const tabs = [
    { id: 'alerts', label: 'Active Alerts', icon: 'AlertTriangle', count: activeAlerts?.length },
    { id: 'contacts', label: 'Emergency Contacts', icon: 'Phone', count: emergencyContacts?.length },
    { id: 'map', label: 'Alert Map', icon: 'Map' },
    { id: 'history', label: 'Alert History', icon: 'Clock', count: alertHistory?.length }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Emergency Alert Banner */}
      {bannerAlert && (
        <EmergencyAlertBanner
          alert={bannerAlert}
          onDismiss={() => setBannerAlert(null)}
        />
      )}
      <div className={`transition-all duration-300 ${bannerAlert ? 'pt-20' : 'pt-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={28} className="text-error" />
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Emergency Alerts
                </h1>
              </div>
              <p className="text-muted-foreground">
                Real-time disaster notifications and emergency response guidance
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowSettings(true)}
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Settings
              </Button>
              
              <Link to="/virtual-drill-simulator">
                <Button variant="default">
                  <Icon name="Play" size={16} className="mr-2" />
                  Practice Drills
                </Button>
              </Link>
            </div>
          </div>

          {/* Alert Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-error/10">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {activeAlerts?.filter(a => a?.severity === 'critical')?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Critical Alerts</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-warning/10">
                  <Icon name="AlertCircle" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {activeAlerts?.filter(a => a?.severity === 'high')?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon name="MapPin" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {activeAlerts?.reduce((sum, alert) => sum + (alert?.affectedCount || 0), 0)?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-muted-foreground">People Affected</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-success/10">
                  <Icon name="Shield" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {emergencyContacts?.filter(c => c?.available24x7)?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">24/7 Contacts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.count !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab?.id
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* Active Alerts Tab */}
                {activeTab === 'alerts' && (
                  <div>
                    {activeAlerts?.length > 0 ? (
                      <div className="space-y-4">
                        {activeAlerts?.map((alert) => (
                          <AlertCard
                            key={alert?.id}
                            alert={alert}
                            onViewDetails={handleViewDetails}
                            onDismiss={handleDismissAlert}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                          No Active Alerts
                        </h3>
                        <p className="text-muted-foreground">
                          All clear! No emergency alerts in your area at this time.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Emergency Contacts Tab */}
                {activeTab === 'contacts' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emergencyContacts?.map((contact) => (
                      <EmergencyContactCard
                        key={contact?.id}
                        contact={contact}
                        onCall={handleCall}
                        onMessage={handleMessage}
                      />
                    ))}
                  </div>
                )}

                {/* Alert Map Tab */}
                {activeTab === 'map' && (
                  <AlertMap
                    alerts={activeAlerts}
                    userLocation={{ lat: 28.6139, lng: 77.2090 }}
                    onLocationUpdate={handleLocationUpdate}
                  />
                )}

                {/* Alert History Tab */}
                {activeTab === 'history' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {alertHistory?.map((alert) => (
                      <AlertHistoryCard
                        key={alert?.id}
                        alert={alert}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Offline Indicator */}
              <OfflineIndicator onViewOfflineProtocols={handleViewOfflineProtocols} />

              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icon name="Phone" size={16} className="mr-2" />
                    Call Emergency (112)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Send Location to Family
                  </Button>
                  <Link to="/learning-modules" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Icon name="BookOpen" size={16} className="mr-2" />
                      Emergency Protocols
                    </Button>
                  </Link>
                  <Link to="/virtual-drill-simulator" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Icon name="Play" size={16} className="mr-2" />
                      Practice Drill
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">
                        Earthquake drill completed
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">
                        Emergency contacts updated
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">
                        Location permissions granted
                      </p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <NotificationSettings
              onSave={handleSaveSettings}
              onCancel={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}
      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Alert Details
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAlert(null)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              
              <AlertCard
                alert={selectedAlert}
                onViewDetails={() => {}}
                onDismiss={null}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyAlerts;