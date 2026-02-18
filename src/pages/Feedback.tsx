import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { projects } from '../data/projects';
import './Feedback.css';

interface FeedbackItem {
    id: string;
    created_at: string;
    project_title: string;
    user_name: string;
    message: string;
}

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        project: projects[0].title,
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        const { data, error } = await supabase
            .from('feedback')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching feedback:', error);
        } else {
            setFeedbacks(data || []);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const { error } = await supabase
            .from('feedback')
            .insert([
                {
                    user_name: formData.name,
                    project_title: formData.project,
                    message: formData.message
                }
            ]);

        setLoading(false);

        if (error) {
            setError('Failed to submit feedback. Please try again.');
            console.error('Error submitting feedback:', error);
        } else {
            setSuccess(true);
            setFormData({ ...formData, message: '' }); // Reset message, keep name/project
            fetchFeedbacks(); // Refresh list
        }
    };

    return (
        <div className="feedback-container container">
            <h2 className="section-title">Project Feedback</h2>
            
            <div className="feedback-content">
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <h3>Leave Feedback</h3>
                    
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="project">Project</label>
                        <select
                            id="project"
                            value={formData.project}
                            onChange={(e) => setFormData({...formData, project: e.target.value})}
                        >
                            {projects.map((p) => (
                                <option key={p.title} value={p.title}>
                                    {p.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            required
                            placeholder="What do you think? Any bugs or suggestions?"
                            rows={4}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">Thanks for your feedback!</p>}

                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>

                <div className="feedback-list">
                    <h3>Recent Feedback</h3>
                    {feedbacks.length === 0 ? (
                        <p className="no-feedback">No feedback yet. Be the first!</p>
                    ) : (
                        <div className="feedback-grid">
                            {feedbacks.map((item) => (
                                <div key={item.id} className="feedback-card">
                                    <div className="feedback-header">
                                        <span className="feedback-author">{item.user_name}</span>
                                        <span className="feedback-project">{item.project_title}</span>
                                    </div>
                                    <p className="feedback-message">{item.message}</p>
                                    <span className="feedback-date">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
