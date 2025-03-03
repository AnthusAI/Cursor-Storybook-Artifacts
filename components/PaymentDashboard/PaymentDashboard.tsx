import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { BarChart3, Users, DollarSign, ArrowUpRight } from 'lucide-react';

/**
 * PaymentDashboard Component
 * 
 * A simplified version of the dashboard that shows key metrics and statistics.
 */
const PaymentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Dashboard</h1>
      
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {/* Revenue Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <h2 className="text-2xl font-bold">$45,231.89</h2>
            <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
          </Card>

          {/* Subscriptions Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm text-muted-foreground">Active Subscriptions</p>
            <h2 className="text-2xl font-bold">2,431</h2>
            <p className="text-xs text-muted-foreground mt-1">+12.5% from last month</p>
          </Card>

          {/* Transactions Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm text-muted-foreground">Daily Transactions</p>
            <h2 className="text-2xl font-bold">1,543</h2>
            <p className="text-xs text-muted-foreground mt-1">+8.2% from yesterday</p>
          </Card>

          {/* Actions Card */}
          <Card className="p-4">
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                View Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Manage Users
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard; 