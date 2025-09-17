import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = ({ onSave, onCancel }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    voiceAlerts: false,
    severityLevels: ['critical', 'high'],
    alertTypes: ['earthquake', 'flood', 'fire', 'cyclone'],
    locationRadius: '10',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '06:00'
    },
    familyNotifications: true,
    schoolNotifications: true
  });

  const severityOptions = [
    { value: 'critical', label: 'Critical', description: 'Life-threatening emergencies' },
    { value: 'high', label: 'High', description: 'Serious threats requiring immediate action' },
    { value: 'medium', label: 'Medium', description: 'Moderate risks with precautionary measures' },
    { value: 'low', label: 'Low', description: 'General awareness and preparedness' }
  ];

  const alertTypeOptions = [
    { value: 'earthquake', label: 'Earthquake', description: 'Seismic activity alerts' },
    { value: 'flood', label: 'Flood', description: 'Water-related emergencies' },
    { value: 'fire', label: 'Fire', description: 'Fire incidents and evacuations' },
    { value: 'cyclone', label: 'Cyclone/Storm', description: 'Weather-related disasters' },
    { value: 'landslide', label: 'Landslide', description: 'Geological hazards' },
    { value: 'industrial', label: 'Industrial', description: 'Chemical or industrial accidents' }
  ];

  const radiusOptions = [
    { value: '5', label: '5 km', description: 'Immediate vicinity' },
    { value: '10', label: '10 km', description: 'Local area' },
    { value: '25', label: '25 km', description: 'Extended area' },
    { value: '50', label: '50 km', description: 'Regional coverage' },
    { value: '100', label: '100 km', description: 'Wide area monitoring' }
  ];

  const handleSave = () => {
    onSave(settings);
  };

  const updateSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateQuietHours = (key, value) => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev?.quietHours,
        [key]: value
      }
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Notification Settings
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize how you receive emergency alerts and notifications
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <Icon name="X" size={16} />
        </Button>
      </div>
      <div className="space-y-6">
        {/* Notification Methods */}
        <div>
          <h3 className="font-heading font-medium text-foreground mb-3">
            Notification Methods
          </h3>
          <div className="space-y-3">
            <Checkbox
              label="Email Notifications"
              description="Receive alerts via email with detailed information"
              checked={settings?.emailNotifications}
              onChange={(e) => updateSettings('emailNotifications', e?.target?.checked)}
            />
            <Checkbox
              label="SMS Notifications"
              description="Get instant text messages for urgent alerts"
              checked={settings?.smsNotifications}
              onChange={(e) => updateSettings('smsNotifications', e?.target?.checked)}
            />
            <Checkbox
              label="Push Notifications"
              description="Browser and mobile app notifications"
              checked={settings?.pushNotifications}
              onChange={(e) => updateSettings('pushNotifications', e?.target?.checked)}
            />
            <Checkbox
              label="Voice Alerts"
              description="Automated voice calls for critical emergencies"
              checked={settings?.voiceAlerts}
              onChange={(e) => updateSettings('voiceAlerts', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Alert Preferences */}
        <div>
          <h3 className="font-heading font-medium text-foreground mb-3">
            Alert Preferences
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label="Severity Levels"
              description="Choose which severity levels to receive"
              multiple
              searchable
              options={severityOptions}
              value={settings?.severityLevels}
              onChange={(value) => updateSettings('severityLevels', value)}
            />
            
            <Select
              label="Alert Types"
              description="Select disaster types to monitor"
              multiple
              searchable
              options={alertTypeOptions}
              value={settings?.alertTypes}
              onChange={(value) => updateSettings('alertTypes', value)}
            />
          </div>
        </div>

        {/* Location Settings */}
        <div>
          <h3 className="font-heading font-medium text-foreground mb-3">
            Location Monitoring
          </h3>
          <Select
            label="Alert Radius"
            description="Distance from your location to monitor for alerts"
            options={radiusOptions}
            value={settings?.locationRadius}
            onChange={(value) => updateSettings('locationRadius', value)}
          />
        </div>

        {/* Quiet Hours */}
        <div>
          <h3 className="font-heading font-medium text-foreground mb-3">
            Quiet Hours
          </h3>
          <div className="space-y-3">
            <Checkbox
              label="Enable Quiet Hours"
              description="Reduce non-critical notifications during specified hours"
              checked={settings?.quietHours?.enabled}
              onChange={(e) => updateQuietHours('enabled', e?.target?.checked)}
            />
            
            {settings?.quietHours?.enabled && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={settings?.quietHours?.start}
                    onChange={(e) => updateQuietHours('start', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={settings?.quietHours?.end}
                    onChange={(e) => updateQuietHours('end', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Settings */}
        <div>
          <h3 className="font-heading font-medium text-foreground mb-3">
            Additional Notifications
          </h3>
          <div className="space-y-3">
            <Checkbox
              label="Notify Family Members"
              description="Automatically inform registered family contacts during emergencies"
              checked={settings?.familyNotifications}
              onChange={(e) => updateSettings('familyNotifications', e?.target?.checked)}
            />
            <Checkbox
              label="School Notifications"
              description="Receive alerts related to your educational institution"
              checked={settings?.schoolNotifications}
              onChange={(e) => updateSettings('schoolNotifications', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="default" onClick={handleSave}>
          <Icon name="Save" size={16} className="mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;