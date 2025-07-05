import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EventIcon from '@mui/icons-material/Event';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/News.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const newsUrl = `${backendUrl}/api/news/`;

const NEWS_TYPES = {
  announcement: { label: 'Announcement', icon: <AnnouncementIcon />, color: '#f44336' },
  event: { label: 'Event', icon: <EventIcon />, color: '#4caf50' },
  news: { label: 'News', icon: <NewspaperIcon />, color: '#2196f3' },
};

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(newsUrl)
      .then(res => res.json())
      .then(res => {
        setNews(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="news-loading">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-error">
        {error}
      </div>
    );
  }

  return (
    <div className="news-container">
      {news.length === 0 && <div className="news-empty">No news available.</div>}
      {news.map(item => {
        const typeInfo = NEWS_TYPES[item.type] || NEWS_TYPES.news;
        return (
          <div className="news-card" key={item.id}>
            <div className="news-card-header">
              <div className="news-type">
                <span className="news-type-icon" style={{ color: typeInfo.color }}>
                  {typeInfo.icon}
                </span>
                <span className="news-type-label" style={{ color: typeInfo.color }}>
                  {typeInfo.label}
                </span>
              </div>
              <div className="news-date">
                {new Date(item.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div className="news-title">
              {item.title}
            </div>
            <button
              className="news-view-btn"
              onClick={() => navigate(`/news/${item.id}`)}
            >
              View Details
            </button>
          </div>
        );
      })}
    </div>
  );
}