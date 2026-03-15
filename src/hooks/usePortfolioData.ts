import { useState, useEffect } from 'react';
import { ASSETS } from '../data/assetPaths';

// Initial Data — uses only /assets/images/ (no external URLs)
const INITIAL_DATA = {
  about: {
    name: 'Shivam Bhela',
    title: 'AI Developer | Hardware Innovator | Research Enthusiast',
    bio: 'I am Shivam Bhela, an AI and hardware developer based in India, driven by the challenge of bridging the gap between digital intelligence and physical movement. My mission is to build systems that act as an extension of human will. Check out my work on GitHub and connect with me on LinkedIn!',
    focusAreas: [
      { id: 1, title: 'Brain-Computer Interfaces', icon: '🧠' },
      { id: 2, title: 'AI Voice Assistants', icon: '🎙️' },
      { id: 3, title: 'Hardware Prototypes', icon: '⚙️' },
      { id: 4, title: 'Neural Game Control', icon: '🎮' }
    ],
    heroTitle: 'Hello Everyone',
    heroSubtitle: 'I am Shivam Bhela | AI & Hardware Developer',
    heroImage: ASSETS.images.heroCinematic,
    profileImage: ASSETS.images.profile,
  },
  projects: [
    {
      id: 1,
      title: 'EEG Controlled VR Engine',
      description: 'A brain-controlled gaming system where EEG signals captured using BioAmp and Arduino are used to control character movements in a game environment.',
      image: ASSETS.images.defaultCard,
      tags: ['Arduino', 'Python', 'C++', 'Signal Processing', 'EEG Sensors'],
      github: 'https://github.com/shivamBhela',
      demo: '#',
      longDescription: 'Detailed description of the EEG Controlled VR Engine project.',
      gallery: []
    }
  ],
  hackathons: [
    {
      id: 1,
      name: 'IDEA Hackathon 2024',
      problem: 'Enhancing customer experience in banking through multilingual AI solutions.',
      year: '2024',
      achievement: '1st Runner Up',
      teamSize: 4,
      image: ASSETS.images.defaultCard,
      location: 'New Delhi, India',
      gallery: []
    }
  ],
  certificates: [
    {
      id: 1,
      title: 'Machine Learning Certification',
      issuer: 'Coursera / Stanford',
      date: 'Dec 2024',
      image: ASSETS.images.defaultCard,
      link: '#'
    }
  ],
  research: [
    {
      id: 1,
      title: 'Advanced Neural Interface Systems',
      abstract: 'Researching the limits of BCI for immersive gaming environments.',
      year: '2025',
      status: 'Published',
      link: '#'
    }
  ],
  skills: [
    {
      id: 'ai',
      title: 'AI / ML',
      icon: '🧠',
      items: ['Generative AI', 'Machine Learning', 'Speech Recognition', 'NLP', 'Computer Vision'],
      color: '#ff0000'
    },
    {
      id: 'programming',
      title: 'Programming',
      icon: '💻',
      items: ['C++', 'Python', 'JavaScript', 'TypeScript'],
      color: '#00f2ff'
    },
    {
      id: 'hardware',
      title: 'Hardware',
      icon: '⚙️',
      items: ['Arduino', 'Sensors', 'EEG Interfaces', 'Embedded Systems', 'IoT', 'Robotics'],
      color: '#ffaa00'
    },
    {
      id: 'fullstack',
      title: 'Web Development',
      icon: '🌐',
      items: ['React', 'HTML', 'CSS', 'Tailwind', 'Node.js', 'Next.js'],
      color: '#003767'
    },
    {
      id: 'research',
      title: 'Research',
      icon: '📑',
      items: ['Brain-computer interfaces', 'Neural Signals', 'Signal Processing', 'Scientific Writing'],
      color: '#ffffff'
    }
  ]
};

export const usePortfolioData = () => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('shivam_portfolio_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old data — ensure profileImage & heroImage exist
        if (!parsed.about.profileImage) {
          parsed.about.profileImage = ASSETS.images.profile;
        }
        if (!parsed.about.heroImage) {
          parsed.about.heroImage = ASSETS.images.heroCinematic;
        }
        // Migrate skills — ensure icon field exists
        if (parsed.skills && parsed.skills.length > 0 && !parsed.skills[0].icon) {
          parsed.skills = INITIAL_DATA.skills;
        }
        return parsed;
      }
    } catch { /* ignore parse errors */ }
    return INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('shivam_portfolio_data', JSON.stringify(data));
    window.dispatchEvent(new Event('portfolio_data_updated'));
  }, [data]);

  useEffect(() => {
    const handleDataUpdate = () => {
      try {
        const saved = localStorage.getItem('shivam_portfolio_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          setData(parsed);
        }
      } catch (error) {
        console.error("Failed to parse portfolio data update", error);
      }
    };

    window.addEventListener('portfolio_data_updated', handleDataUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleDataUpdate);
  }, []);

  const updateSection = (section: string, newData: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: newData
    }));
  };

  const addItem = (section: string, item: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now() }]
    }));
  };

  const removeItem = (section: string, id: number | string) => {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id)
    }));
  };

  const editItem = (section: string, id: number | string, updatedItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].map((item: any) => item.id === id ? { ...updatedItem, id } : item)
    }));
  };

  return { data, updateSection, addItem, removeItem, editItem };
};
