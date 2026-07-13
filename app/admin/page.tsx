"use client";

import React, { useState, useEffect } from 'react';
import styles from './admin.module.css';

// Mock data to simulate Supabase records
const MOCK_LEADS = [
  { id: 1, full_name: 'Jens Larsen', email: 'jens@example.dk', phone: '+45 12345678', service_of_interest: 'Investment', status: 'New', created_at: '2026-07-13T10:00:00Z' },
  { id: 2, full_name: 'Maria Schmidt', email: 'maria@example.de', phone: '+49 15123456', service_of_interest: 'Management', status: 'Contacted', created_at: '2026-07-12T14:30:00Z' },
  { id: 3, full_name: 'Henrik Poulsen', email: 'hpoulsen@company.com', phone: '+45 87654321', service_of_interest: 'Development', status: 'Won', created_at: '2026-07-10T09:15:00Z' },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState(MOCK_LEADS);

  // In a real app, we would fetch from Supabase here:
  // useEffect(() => { ... supabase.from('website_leads').select('*') ... }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock authentication
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const updateStatus = (id: number, newStatus: string) => {
    // In real app, update Supabase record here
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => `"${l.id}","${l.full_name}","${l.email}","${l.phone}","${l.service_of_interest}","${l.status}","${new Date(l.created_at).toLocaleDateString()}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '100px 0', maxWidth: '400px' }}>
        <h2 className="text-center">Admin Access</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <input 
            type="password" 
            className="input-field" 
            placeholder="Enter admin password (admin123)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`container ${styles.adminContainer}`}>
      <div className={styles.header}>
        <h1>Lead Management Dashboard</h1>
        <button className="btn btn-outline" onClick={exportCSV}>
          Export to CSV
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                <td><strong>{lead.full_name}</strong></td>
                <td>
                  <div>{lead.email}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>{lead.phone}</div>
                </td>
                <td>{lead.service_of_interest}</td>
                <td>
                  <select 
                    className={`${styles.statusSelect} ${styles[`status-${lead.status}`]}`}
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
