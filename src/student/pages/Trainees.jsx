import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import '../styles/Trainees.css';

const TraineeCard = ({ trainee, formatDate }) => {
    return (
        <article className="trainee-card">
            <div className="trainee-card-content">
                <div className="program-badge">
                    {trainee.program}
                </div>

                <div className="trainee-header">
                    <div className="trainee-main-info">
                        <h2 className="trainee-title">{trainee.title}</h2>
                        <div className="trainee-contact">
                            <span>{trainee.email}</span>
                            <span>{trainee.phone}</span>
                        </div>
                    </div>
                </div>

                <div className="trainee-details">
                    <div className="info-row">
                        <SchoolIcon className="info-icon" />
                        <span>{trainee.institution}</span>
                    </div>
                    <div className="info-row">
                        <WorkIcon className="info-icon" />
                        <span>{trainee.domain}</span>
                    </div>
                    <div className="info-row">
                        <LocationOnIcon className="info-icon" />
                        <span>{trainee.location}</span>
                    </div>
                    <div className="info-row">
                        <CalendarTodayIcon className="info-icon" />
                        <span>{formatDate(trainee.start_date)} - {formatDate(trainee.end_date)}</span>
                    </div>
                    <div className="info-row">
                        <SupervisorAccountIcon className="info-icon" />
                        <span>Supervisor: {trainee.supervisor}</span>
                    </div>
                </div>

                <div className="trainee-skills">
                    <h3>Skills</h3>
                    <div className="skills-container">
                        {trainee.skills.map((skill, index) => (
                            <span key={index} className="skill-badge">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="trainee-objectives">
                    <h3>Objectives</h3>
                    <ul>
                        {trainee.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    );
};

export default function Trainees() {
    const [trainees, setTrainees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProgram, setSelectedProgram] = useState('all');

    useEffect(() => {
        fetchTrainees();
    }, []);

    const fetchTrainees = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/trainees');
            const result = await response.json();
            
            if (result.success) {
                // Sort trainees by start_date (newest first)
                const sortedTrainees = result.data.sort((a, b) => 
                    new Date(b.start_date) - new Date(a.start_date)
                );
                setTrainees(sortedTrainees);
            } else {
                toast.error('Failed to fetch trainees');
            }
        } catch (error) {
            console.error('Error fetching trainees:', error);
            toast.error('Error loading trainees');
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

    const filteredTrainees = selectedProgram === 'all' 
        ? trainees 
        : trainees.filter(trainee => trainee.program.toLowerCase() === selectedProgram.toLowerCase());

    // Get unique programs from trainees data
    const programs = ['all', ...new Set(trainees.map(trainee => trainee.program))];

    if (loading) {
        return (
            <div className="trainees-loading">
                <div className="loading-spinner"></div>
                <p>Loading trainees...</p>
            </div>
        );
    }

    return (
        <div className="trainees-container">
            <h1 className="section-title">Trainees & Internship</h1>

            <div className="trainees-filters">
                <div className="filter-box">
                    <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                    >
                        {programs.map(program => (
                            <option key={program} value={program}>
                                {program === 'all' ? 'All Programs' : program.charAt(0).toUpperCase() + program.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="trainees-grid">
                {filteredTrainees.map((trainee) => (
                    <TraineeCard 
                        key={trainee.id} 
                        trainee={trainee} 
                        formatDate={formatDate}
                    />
                ))}
            </div>

            {filteredTrainees.length === 0 && (
                <div className="no-trainees">
                    <p>No trainees available for the selected program.</p>
                </div>
            )}
        </div>
    );
}