import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ImageIcon from '@mui/icons-material/Image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../styles/News.css';

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    

    // Get type color based on news type
    const getTypeColor = (type) => {
        switch(type.toLowerCase()) {
            case 'academic':
                return 'var(--main-color2)'; // blue
            case 'event':
                return 'var(--main-color5)'; // green
            case 'announcement':
                return 'var(--main-color4)'; // orange
            case 'workshop':
                return 'var(--main-color3)'; // purple
            default:
                return 'var(--main-color1)'; // default blue
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/news');
            const result = await response.json();
            
            if (result.success) {
                setNews(result.data);
            } else {
                toast.error('Failed to fetch news');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            toast.error('Error loading news');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleImageClick = (imageUrl) => {
        if (imageUrl) {
            window.open(imageUrl, '_blank');
        }
    };

    const filteredNews = news.filter(item => {
        const matchesType = selectedType === 'all' || item.type === selectedType;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    if (loading) {
        return (
            <div className="news-loading">
                <div className="loading-spinner"></div>
                <p>Loading news & events...</p>
            </div>
        );
    }

    // Get unique types from news data
    const newsTypes = ['all', ...new Set(news.map(item => item.type))];

    return (
        <div className="news-container">
            <h1 className="section-title">News & Events</h1>

            <div className="news-filters">
                

                <div className="filter-box">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        {newsTypes.map(type => (
                            <option key={type} value={type}>
                                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="news-grid">
                {filteredNews.map((item) => (
                    <article key={item.id} className="news-card">
                        <div className="news-card-content">
                            <div className="news-meta">
                                <div className="meta-item">
                                    <CalendarTodayIcon className="meta-icon" />
                                    <span>{formatDate(item.created_at)}</span>
                                </div>
                                <div 
                                    className="news-type-badge"
                                    style={{ backgroundColor: getTypeColor(item.type) }}
                                >
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                </div>
                            </div>

                            <h2 className="news-card-title">{item.title}</h2>
                            
                            {item.image_url && (
                                <div 
                                    className="image-view-link"
                                    onClick={() => handleImageClick(item.image_url)}
                                >
                                    <ImageIcon className="image-icon" />
                                    <span>View Image</span>
                                </div>
                            )}

                            <p className="news-card-excerpt">
                                {item.content}
                            </p>

                            
                        </div>
                    </article>
                ))}
            </div>

            {filteredNews.length === 0 && (
                <div className="no-news">
                    <p>No news or events available for the selected criteria.</p>
                </div>
            )}
        </div>
    );
}