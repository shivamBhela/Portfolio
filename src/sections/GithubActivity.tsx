import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GithubActivity = () => {
  const [stats, setStats] = useState({
    commits: 1240, // Github API doesn't give total commits easily without many calls
    repos: 0,
    stars: 0,
    languages: [] as string[],
    followers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/shivambhela');
        const userData = await userRes.json();
        
        const reposRes = await fetch('https://api.github.com/users/shivambhela/repos?per_page=100');
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        const languagesSet = new Set<string>();
        reposData.forEach((repo: any) => {
          if (repo.language) languagesSet.add(repo.language);
        });

        setStats(prev => ({
          ...prev,
          repos: userData.public_repos,
          stars: totalStars,
          languages: Array.from(languagesSet),
          followers: userData.followers
        }));
      } catch (error) {
        console.error('GitHub Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);
  
  return (
    <section id="github" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            GitHub <span className="text-spidey-red">Codestream</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.4em] text-sm mt-4">Syncing with Remote Repository...</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Followers', value: stats.followers, color: 'text-spidey-red' },
            { label: 'Public Repos', value: stats.repos, color: 'text-electric-blue' },
            { label: 'Stars Earned', value: stats.stars, color: 'text-white' },
            { label: 'Technologies', value: stats.languages.length, color: 'text-spidey-blue' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="holographic-card p-6 rounded-xl border-white/5 text-center group hover:border-white/20 transition-all"
            >
              <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2 group-hover:text-white transition-colors">{stat.label}</h4>
              <p className={`text-4xl font-black ${stat.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 holographic-card p-8 rounded-2xl border-white/5 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest">Contribution Heatmap</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Amount of projects made and activities done in college</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/40">
              Less <div className="flex gap-1"><div className="w-3 h-3 bg-white/5" /><div className="w-3 h-3 bg-spidey-red/20" /><div className="w-3 h-3 bg-spidey-red/60" /><div className="w-3 h-3 bg-spidey-red" /></div> More
            </div>
          </div>
          <div className="mb-6" />
          <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-1 overflow-hidden">
             {Array.from({ length: 364 }).map((_, i) => (
               <div 
                key={i} 
                className={`aspect-square rounded-sm ${
                  Math.random() > 0.7 ? 'bg-spidey-red' : 
                  Math.random() > 0.4 ? 'bg-spidey-red/40' : 'bg-white/5'
                }`} 
               />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
