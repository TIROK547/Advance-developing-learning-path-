'use client';

import { useState } from 'react';

interface ProgressData {
  currentWeek: number;
  currentPhase: number;
  startDate: string;
  leetcode: {
    total: number;
    byLanguage: { go: number; python: number; typescript: number };
    byDifficulty: { easy: number; medium: number; hard: number };
    goal: number;
  };
  skills: any;
  phases: any;
  stats: {
    totalDays: number;
    currentStreak: number;
    longestStreak: number;
    projectsCompleted: number;
    testsWritten: number;
    commitsThisWeek: number;
  };
  notes: {
    lastUpdated: string;
    motivation: string;
  };
}

export default function ProgressDashboard({ data }: { data: ProgressData }) {
  const [selectedPhase, setSelectedPhase] = useState(data.currentPhase);

  const calculateDaysSinceStart = () => {
    const start = new Date(data.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getLeetCodeProgress = () => {
    return Math.round((data.leetcode.total / data.leetcode.goal) * 100);
  };

  const getSkillLevel = (level: string) => {
    const levels: Record<string, { color: string; emoji: string }> = {
      beginner: { color: 'bg-red-500', emoji: '🔴' },
      'mid-level': { color: 'bg-yellow-500', emoji: '🟡' },
      advanced: { color: 'bg-green-500', emoji: '🟢' },
      expert: { color: 'bg-blue-500', emoji: '🔵' },
    };
    return levels[level] || levels.beginner;
  };

  const phaseProgress = (phaseKey: string) => {
    const phase = data.phases[phaseKey];
    if (!phase) return 0;
    const completed = Object.values(phase.progress).filter((v) => v === true).length;
    const total = Object.keys(phase.progress).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          🚀 Backend Engineering Journey
        </h1>
        <p className="text-xl text-gray-300">{data.notes.motivation}</p>
        <div className="mt-4 flex justify-center gap-8 text-gray-300">
          <div>
            <span className="text-2xl font-bold text-blue-400">Week {data.currentWeek}</span>
            <span className="text-sm ml-2">of 16</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-purple-400">Phase {data.currentPhase}</span>
            <span className="text-sm ml-2">of 4</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-green-400">{calculateDaysSinceStart()}</span>
            <span className="text-sm ml-2">days in</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Current Streak"
          value={data.stats.currentStreak}
          suffix="days"
          icon="🔥"
          color="text-orange-400"
        />
        <StatCard
          title="LeetCode Progress"
          value={data.leetcode.total}
          suffix={`/ ${data.leetcode.goal}`}
          icon="💻"
          color="text-blue-400"
        />
        <StatCard
          title="Projects Done"
          value={data.stats.projectsCompleted}
          suffix="projects"
          icon="✅"
          color="text-green-400"
        />
        <StatCard
          title="Tests Written"
          value={data.stats.testsWritten}
          suffix="tests"
          icon="🧪"
          color="text-purple-400"
        />
      </div>

      {/* LeetCode Progress */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-lg p-6 mb-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">
          💻 LeetCode Progress
        </h2>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Overall Progress</span>
            <span>{data.leetcode.total} / {data.leetcode.goal} ({getLeetCodeProgress()}%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all"
              style={{ width: `${getLeetCodeProgress()}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <LanguageProgress
            language="Go"
            count={data.leetcode.byLanguage.go}
            color="bg-blue-500"
          />
          <LanguageProgress
            language="Python"
            count={data.leetcode.byLanguage.python}
            color="bg-yellow-500"
          />
          <LanguageProgress
            language="TypeScript"
            count={data.leetcode.byLanguage.typescript}
            color="bg-blue-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <DifficultyBadge
            difficulty="Easy"
            count={data.leetcode.byDifficulty.easy}
            color="text-green-400"
          />
          <DifficultyBadge
            difficulty="Medium"
            count={data.leetcode.byDifficulty.medium}
            color="text-yellow-400"
          />
          <DifficultyBadge
            difficulty="Hard"
            count={data.leetcode.byDifficulty.hard}
            color="text-red-400"
          />
        </div>
      </div>

      {/* Skills Mastery */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-lg p-6 mb-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">
          🎯 Skills Mastery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(data.skills).map(([skill, skillData]: [string, any]) => {
            const levelInfo = getSkillLevel(skillData.level);
            const completedTopics = Object.values(skillData.topics).filter(
              (v) => v === true
            ).length;
            const totalTopics = Object.keys(skillData.topics).length;
            const topicProgress = Math.round((completedTopics / totalTopics) * 100);

            return (
              <div
                key={skill}
                className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {skill}
                  </h3>
                  <span className="text-2xl">{levelInfo.emoji}</span>
                </div>
                <div className="text-sm text-gray-400 mb-2 capitalize">
                  {skillData.level}
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className={`${levelInfo.color} h-2 rounded-full transition-all`}
                    style={{ width: `${topicProgress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {completedTopics}/{totalTopics} topics
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase Progress */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-lg p-6 mb-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">
          📅 Phase Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(data.phases).map(([phaseKey, phase]: [string, any]) => {
            const progress = phaseProgress(phaseKey);
            const isActive = parseInt(phaseKey.replace('phase', '')) === data.currentPhase;

            return (
              <div
                key={phaseKey}
                className={`rounded-lg p-4 border-2 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-blue-900 bg-opacity-50 border-blue-500'
                    : 'bg-gray-700 bg-opacity-30 border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => setSelectedPhase(parseInt(phaseKey.replace('phase', '')))}
              >
                <div className="text-sm text-gray-400 mb-1">
                  {phaseKey.toUpperCase()}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {phase.name}
                </h3>
                <div className="text-sm text-gray-400 mb-3">Weeks {phase.weeks}</div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">{progress}% complete</div>
                {phase.completed && (
                  <div className="mt-2 text-green-400 text-sm font-semibold">
                    ✅ Completed!
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Phase Goals */}
        {selectedPhase && (
          <div className="mt-6 p-4 bg-gray-700 bg-opacity-30 rounded-lg border border-gray-600">
            <h3 className="text-xl font-semibold text-white mb-3">
              Phase {selectedPhase} Goals
            </h3>
            <ul className="space-y-2">
              {data.phases[`phase${selectedPhase}`]?.goals.map(
                (goal: string, index: number) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="text-blue-400 mr-2">▸</span>
                    <span>{goal}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Motivation Footer */}
      <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-50 rounded-lg border border-blue-700">
        <p className="text-xl text-white font-semibold mb-2">
          &quot;Consistency beats intensity. Show up every day.&quot;
        </p>
        <p className="text-sm text-gray-300">Last updated: {data.notes.lastUpdated}</p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  suffix,
  icon,
  color,
}: {
  title: string;
  value: number;
  suffix: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-400 text-sm font-medium">{title}</div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="flex items-baseline">
        <div className={`text-4xl font-bold ${color}`}>{value}</div>
        <div className="text-gray-400 text-sm ml-2">{suffix}</div>
      </div>
    </div>
  );
}

function LanguageProgress({
  language,
  count,
  color,
}: {
  language: string;
  count: number;
  color: string;
}) {
  return (
    <div className="bg-gray-700 bg-opacity-30 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{language}</span>
        <span className="text-2xl font-bold text-white">{count}</span>
      </div>
      <div className={`w-full ${color} h-1 rounded`} />
    </div>
  );
}

function DifficultyBadge({
  difficulty,
  count,
  color,
}: {
  difficulty: string;
  count: number;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${color}`}>{count}</div>
      <div className="text-sm text-gray-400">{difficulty}</div>
    </div>
  );
}
