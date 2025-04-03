'use client';

import { useState, useEffect } from 'react';

interface Activity {
  id: number;
  type: 'added_font' | 'created_collection';
  name: string;
  date: string;
}

interface DashboardStats {
  totalFonts: number;
  collections: number;
  recentActivity: Activity[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFonts: 0,
    collections: 0,
    recentActivity: []
  });

  useEffect(() => {
    // In a real app, we would fetch actual stats from Supabase
    setStats({
      totalFonts: 42,
      collections: 5,
      recentActivity: [
        { id: 1, type: 'added_font', name: 'Inter', date: '2 hours ago' },
        { id: 2, type: 'created_collection', name: 'Landing Pages', date: '1 day ago' },
        { id: 3, type: 'added_font', name: 'Montserrat', date: '2 days ago' },
      ]
    });
  }, []);

  return (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Fonts</h3>
          <div className="stat-value">{stats.totalFonts}</div>
        </div>
        <div className="stat-card">
          <h3>Collections</h3>
          <div className="stat-value">{stats.collections}</div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'added_font' ? '🔤' : '📁'}
              </div>
              <div className="activity-details">
                <p className="activity-title">
                  {activity.type === 'added_font' 
                    ? `Added ${activity.name} font`
                    : `Created ${activity.name} collection`
                  }
                </p>
                <p className="activity-date">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card">
            <span className="action-icon">➕</span>
            <span className="action-text">Add New Font</span>
          </button>
          <button className="action-card">
            <span className="action-icon">📁</span>
            <span className="action-text">Create Collection</span>
          </button>
          <button className="action-card">
            <span className="action-icon">🔍</span>
            <span className="action-text">Browse Fonts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
