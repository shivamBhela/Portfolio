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
    heroImage: ASSETS.images.hero
  },
  projects: [
    {
      id: 1,
      title: 'EEG Controlled VR Engine',
      description: 'A brain-controlled gaming system where EEG signals captured using BioAmp and Arduino are used to control character movements in a game environment.',
      image: ASSETS.images.defaultCard,
      tags: ['Arduino', 'Python', 'C++', 'Signal Processing', 'EEG Sensors'],
      github: 'https://github.com/shivamBhela',
      demo: '#'
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
    { id: 'ai', title: 'AI / ML', items: ['Generative AI', 'Machine Learning', 'Speech Recognition', 'NLP', 'Computer Vision'], color: '#ff0000' },
    { id: 'programming', title: 'Programming', items: ['C++', 'Python', 'JavaScript', 'TypeScript'], color: '#00f2ff' }
  ]
};

export const usePortfolioData = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('shivam_portfolio_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('shivam_portfolio_data', JSON.stringify(data));
  }, [data]);

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
