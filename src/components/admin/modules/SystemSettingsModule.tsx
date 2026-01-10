import { useState } from 'react';
import { Settings, Database, Wrench, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';

interface SystemSettingsModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
}

export function SystemSettingsModule({ adminRole }: SystemSettingsModuleProps) {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);

  const isDeveloper = adminRole === 'owner' || adminRole === 'dual_admin';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">System Settings</h1>
        <p className="text-gray-400">Configure platform features and developer controls</p>
      </div>

      {/* Feature Toggles */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Feature Toggles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div>
                <Label htmlFor="offline-mode" className="text-gray-300 font-medium">Offline Mode Sync</Label>
                <p className="text-xs text-gray-500 mt-1">Allow users to sync offline work</p>
              </div>
              <Switch
                id="offline-mode"
                checked={offlineMode}
                onCheckedChange={setOfflineMode}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div>
                <Label htmlFor="ai-global" className="text-gray-300 font-medium">AI Assistance</Label>
                <p className="text-xs text-gray-500 mt-1">Global AI features</p>
              </div>
              <Switch
                id="ai-global"
                checked={aiEnabled}
                onCheckedChange={setAiEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Controls */}
      {isDeveloper && (
        <Card className="bg-gradient-to-br from-purple-950/20 to-gray-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Developer Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">API Rate Limit</div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    defaultValue="100" 
                    className="flex-1"
                  />
                  <span className="text-cyan-400 font-mono">100/min</span>
                </div>
              </div>
              <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Code Execution Timeout</div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    defaultValue="10" 
                    className="flex-1"
                  />
                  <span className="text-cyan-400 font-mono">10s</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-2">AI Usage Limit (per user/day)</div>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  defaultValue="20" 
                  className="flex-1"
                />
                <span className="text-cyan-400 font-mono">20 queries</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Maintenance & Emergency */}
      <Card className="bg-gradient-to-br from-red-950/20 to-gray-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Maintenance & Emergency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-red-700">
            <div>
              <Label htmlFor="maintenance" className="text-gray-300 font-medium">Maintenance Mode</Label>
              <p className="text-xs text-red-400 mt-1">⚠️ This will block all user access</p>
            </div>
            <Switch
              id="maintenance"
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
              disabled={!isDeveloper}
            />
          </div>

          {isDeveloper && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-cyan-700 hover:border-cyan-500 hover:bg-cyan-500/10"
              >
                <Database className="w-4 h-4 mr-2" />
                Trigger Backup
              </Button>
              <Button 
                variant="outline" 
                className="border-yellow-700 hover:border-yellow-500 hover:bg-yellow-500/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Reset Caches
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400">System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-800/30 rounded-lg">
              <div className="text-gray-500 mb-1">Version</div>
              <div className="text-gray-300 font-mono">v2.4.1</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded-lg">
              <div className="text-gray-500 mb-1">Uptime</div>
              <div className="text-gray-300 font-mono">15d 7h 23m</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded-lg">
              <div className="text-gray-500 mb-1">Last Backup</div>
              <div className="text-gray-300 font-mono">2h ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
