import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import '../styles/Sessions.css';

export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [examTypeFilter, setExamTypeFilter] = useState('all');

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/sessions');
            const result = await response.json();
            
            if (result.success) {
                // Sort sessions by academic year (newest first)
                const sortedSessions = result.data.sort((a, b) => {
                    return b.academic_year.localeCompare(a.academic_year);
                });
                setSessions(sortedSessions);
            } else {
                toast.error('Failed to fetch sessions');
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
            toast.error('Error loading sessions');
        } finally {
            setLoading(false);
        }
    };

    const filteredSessions = sessions.filter(session => {
        const matchesSearch = session.course_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = examTypeFilter === 'all' || session.exam_type === examTypeFilter;
        return matchesSearch && matchesType;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="sessions-loading">
                <div className="loading-spinner"></div>
                <p>Loading sessions...</p>
            </div>
        );
    }

    return (
        <div className="sessions-container">
            <h1 className="sessions-title">Exam Sessions</h1>
            
            <div className="sessions-filters">
                <div className="search-box">
                    <SearchIcon className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by course name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-box">
                    <select
                        value={examTypeFilter}
                        onChange={(e) => setExamTypeFilter(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="partiel">Partiel</option>
                        <option value="final">Final</option>
                    </select>
                </div>
            </div>

            {filteredSessions.length === 0 ? (
                <div className="no-results">
                    <p>No sessions found matching your criteria</p>
                </div>
            ) : (
                <div className="sessions-grid">
                    {filteredSessions.map((session) => (
                        <div key={session.id} className="session-card">
                            <div className="card-content">
                                <div className="session-header">
                                    <div className="course-info">
                                        <h2 className="course-name">{session.course_name}_{session.exam_type} "{session.exam_round}" ({session.final_type})</h2>
                                        <span className="academic-year">{session.academic_year}</span>
                                    </div>
                                    
                                </div>

        
                            </div>

                            <div className="session-actions">
                                {session.question_pdf_url && (
                                    <a 
                                        href={session.question_pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pdf-link questions"
                                    >
                                        <DescriptionOutlinedIcon className="file-icon" />
                                        Questions
                                    </a>
                                )}
                                {session.solution_pdf_url && (
                                    <a 
                                        href={session.solution_pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pdf-link solutions"
                                    >
                                        <CheckCircleOutlineIcon className="file-icon" />
                                        Solutions
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
