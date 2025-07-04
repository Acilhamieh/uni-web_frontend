import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Chip, Grid } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EventIcon from '@mui/icons-material/Event';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useDataFetching } from '../../admin/hooks/useDataFetching';
import '../styles/News.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const newsUrl = `${backendUrl}/api/news/`;

const NEWS_TYPES = {
  'announcement': { color: '#f44336', icon: AnnouncementIcon },
  'event': { color: '#4caf50', icon: EventIcon },
  'news': { color: '#2196f3', icon: NewspaperIcon },
};

export default function News() {
  const [searchText, setSearchText] = useState('');
  const { data, loading, error } = useDataFetching(newsUrl);

  if (error) return (
    <Box className="error-container">
      <ErrorOutlineIcon className="error-icon" />
      <Typography variant="h6" component="h2" gutterBottom>
        Error loading news.
      </Typography>
      <Typography variant="body1">
        Please check your connection or try again later.
      </Typography>
    </Box>
  );

  if (loading) return (
    <Box className="loading-container">
      <Typography>Loading news...</Typography>
    </Box>
  );

  const filteredData = (data || []).filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Box className="news-container">
      <Typography variant="h4" component="h1" className="news-title">
        News & Announcements
      </Typography>
      
      <Grid container spacing={3}>
        {filteredData.map((item) => {
          const TypeIcon = NEWS_TYPES[item.type].icon;
          return (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card className="news-card">
                {item.image_url && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image_url}
                    alt={item.title}
                    className="news-card-media"
                  />
                )}
                <CardContent>
                  <Box className="news-card-header">
                    <TypeIcon sx={{ color: NEWS_TYPES[item.type].color }} />
                    <Chip
                      label={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      size="small"
                      className="news-type-chip"
                      sx={{
                        backgroundColor: `${NEWS_TYPES[item.type].color}20`,
                        color: NEWS_TYPES[item.type].color,
                      }}
                    />
                  </Box>
                  <Typography variant="h6" component="h2" className="news-card-title">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="news-card-date">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                  <Typography variant="body1" className="news-card-content">
                    {item.content}
                  </Typography>
                  <Typography variant="caption" className="news-card-author">
                    By {item.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );

}
import '../styles/News.css';