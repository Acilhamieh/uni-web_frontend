import { Box, Container, Typography, Paper, Grid, Divider } from '@mui/material';
import { 
    School as SchoolIcon,
    Language as LanguageIcon,
    WorkOutline as WorkIcon,
    Timeline as TimelineIcon,
    Computer as ComputerIcon,
    TrendingUp as TrendingUpIcon 
} from '@mui/icons-material';

export default function AboutMajor() {
    const features = [
        {
            icon: <LanguageIcon sx={{ fontSize: 40, color: 'var(--main-color2)' }} />,
            title: "Bilingual Education",
            description: "Courses delivered in both French and English for Bachelor Degree"
        },
        {
            icon: <ComputerIcon sx={{ fontSize: 40, color: 'var(--main-color2)' }} />,
            title: "Technical Skills",
            description: "Programming, databases, mobile applications, Web development"
        },
        {
            icon: <WorkIcon sx={{ fontSize: 40, color: 'var(--main-color2)' }} />,
            title: "Career Ready",
            description: "Prepares for immediate employment through intensive practical training"
        },
        {
            icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'var(--main-color2)' }} />,
            title: "Future Growth",
            description: "Continue studies in Master ISE, Engineering, or abroad in Lebanon/France"
        }
    ];

    return (
        <Box sx={{ 
            py: 8,
            backgroundColor: '#f8fafc',
            minHeight: '100vh'
        }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box sx={{ 
                    textAlign: 'center',
                    mb: 8
                }}>
                    <Typography 
                        variant="h2" 
                        component="h1"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: 'var(--main-color2)',
                            mb: 3
                        }}
                    >
                        Business Computer Major
                    </Typography>
                    <Typography 
                        variant="h5"
                        sx={{
                            color: '#64748b',
                            maxWidth: '800px',
                            margin: '0 auto',
                            lineHeight: 1.6,
                            fontSize: { xs: '1rem', md: '1.2rem' }
                        }}
                    >
                        Bridging the gap between computer science and business applications with a strong foundation in technical and problem-solving abilities.
                    </Typography>
                </Box>

                {/* Features Grid */}
                <Grid container spacing={4} sx={{ mb: 8 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <Box sx={{ mb: 2 }}>
                                    {feature.icon}
                                </Box>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        mb: 1,
                                        fontWeight: 600,
                                        color: '#1e293b'
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    sx={{ color: '#64748b' }}
                                >
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Main Content */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    <Grid container spacing={4}>
                        {/* Program Overview */}
                        <Grid item xs={12} md={6}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    mb: 3,
                                    fontWeight: 600,
                                    color: '#1e293b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <SchoolIcon sx={{ color: 'var(--main-color2)' }} />
                                Program Overview
                            </Typography>
                            <Typography 
                                paragraph
                                sx={{
                                    color: '#64748b',
                                    lineHeight: 1.8,
                                    mb: 2
                                }}
                            >
                                A business computer major prepares students to apply computer sciences skills to business applications and provides a strong dual knowledge foundation in technical and problem-solving abilities. After three years, the Bachelor's Degree allows graduates to carry out technological and commercial tasks related to computer and management science knowledge.
                            </Typography>
                            <Typography 
                                paragraph
                                sx={{
                                    color: '#64748b',
                                    lineHeight: 1.8
                                }}
                            >
                                It prepares students for immediate employment through intensive use of computer information systems skills. It aims also to fulfill the requirements of the growing professional sectors and needing highly qualified graduates related to the fields of programming, databases, mobile applications, Web and Management and Finance sciences.
                            </Typography>
                        </Grid>

                        {/* Course Structure */}
                        <Grid item xs={12} md={6}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    mb: 3,
                                    fontWeight: 600,
                                    color: '#1e293b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <TimelineIcon sx={{ color: 'var(--main-color2)' }} />
                                Course Structure
                            </Typography>
                            <Typography 
                                paragraph
                                sx={{
                                    color: '#64748b',
                                    lineHeight: 1.8,
                                    mb: 2
                                }}
                            >
                                The courses are organized in:
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                <Typography 
                                    sx={{
                                        color: '#64748b',
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        '&:before': {
                                            content: '""',
                                            width: '6px',
                                            height: '6px',
                                            backgroundColor: 'var(--main-color2)',
                                            borderRadius: '50%',
                                            marginRight: '12px'
                                        }
                                    }}
                                >
                                    Lectures (CM)
                                </Typography>
                                <Typography 
                                    sx={{
                                        color: '#64748b',
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        '&:before': {
                                            content: '""',
                                            width: '6px',
                                            height: '6px',
                                            backgroundColor: 'var(--main-color2)',
                                            borderRadius: '50%',
                                            marginRight: '12px'
                                        }
                                    }}
                                >
                                    Tutorials (TD)
                                </Typography>
                                <Typography 
                                    sx={{
                                        color: '#64748b',
                                        display: 'flex',
                                        alignItems: 'center',
                                        '&:before': {
                                            content: '""',
                                            width: '6px',
                                            height: '6px',
                                            backgroundColor: 'var(--main-color2)',
                                            borderRadius: '50%',
                                            marginRight: '12px'
                                        }
                                    }}
                                >
                                    Practical Work (TP)
                                </Typography>
                            </Box>
                            <Typography 
                                sx={{
                                    color: '#64748b',
                                    mt: 2,
                                    fontStyle: 'italic'
                                }}
                            >
                                * Proportions vary depending on the subject
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    {/* Future Prospects */}
                    <Box>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                mb: 3,
                                fontWeight: 600,
                                color: '#1e293b',
                                textAlign: 'center'
                            }}
                        >
                            Future Prospects
                        </Typography>
                        <Typography 
                            sx={{
                                color: '#64748b',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto',
                                lineHeight: 1.8
                            }}
                        >
                            Graduates can continue their studies in Master especially in Master ISE (Information Systems Engineering) in the Faculty of Technology-Saida. They can also continue their studies in Engineering or Master in Lebanon or France.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
