#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PROGRESS_FILE = path.join(__dirname, '../data/progress.json');

// Load progress data
function loadProgress() {
  const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
  return JSON.parse(data);
}

// Save progress data
function saveProgress(data) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
  console.log('✅ Progress saved!');
}

// CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const progress = loadProgress();

  if (command === 'leetcode') {
    // Add LeetCode problem: node update-progress.js leetcode <language> <difficulty>
    const language = args[1] || await question('Language (go/python/typescript): ');
    const difficulty = args[2] || await question('Difficulty (easy/medium/hard): ');

    progress.leetcode.total++;
    progress.leetcode.byLanguage[language.toLowerCase()]++;
    progress.leetcode.byDifficulty[difficulty.toLowerCase()]++;

    console.log(`Added ${difficulty} ${language} problem. Total: ${progress.leetcode.total}/${progress.leetcode.goal}`);
    saveProgress(progress);
  }
  else if (command === 'skill') {
    // Toggle skill: node update-progress.js skill <skillName> <topic>
    const skillName = args[1] || await question('Skill (go/django/vim/databases/infrastructure/frontend): ');
    const topic = args[2] || await question('Topic: ');

    if (progress.skills[skillName] && progress.skills[skillName].topics[topic] !== undefined) {
      progress.skills[skillName].topics[topic] = !progress.skills[skillName].topics[topic];
      console.log(`Toggled ${skillName}.${topic} to ${progress.skills[skillName].topics[topic]}`);
      saveProgress(progress);
    } else {
      console.log('❌ Invalid skill or topic');
    }
  }
  else if (command === 'week') {
    // Update weekly goal: node update-progress.js week <weekNum> <goal>
    const weekNum = args[1] || await question('Week number: ');
    const goal = args[2] || await question('Goal (vimPractice/leetcodeProblems/goLearning/projectWork/notesDocumented/codeCommitted): ');
    const weekKey = `week${weekNum}`;

    if (!progress.weeklyGoals[weekKey]) {
      progress.weeklyGoals[weekKey] = {
        vimPractice: false,
        leetcodeProblems: 0,
        goLearning: false,
        projectWork: false,
        notesDocumented: false,
        codeCommitted: false
      };
    }

    if (goal === 'leetcodeProblems') {
      const count = parseInt(args[3] || await question('Number of problems: '));
      progress.weeklyGoals[weekKey][goal] = count;
    } else {
      progress.weeklyGoals[weekKey][goal] = !progress.weeklyGoals[weekKey][goal];
    }

    console.log(`Updated week ${weekNum} - ${goal}`);
    saveProgress(progress);
  }
  else if (command === 'stats') {
    // Update stats: node update-progress.js stats <field> <value>
    const field = args[1] || await question('Field (totalDays/currentStreak/longestStreak/projectsCompleted/testsWritten/commitsThisWeek): ');
    const value = parseInt(args[2] || await question('Value: '));

    if (progress.stats[field] !== undefined) {
      progress.stats[field] = value;
      console.log(`Updated ${field} to ${value}`);
      saveProgress(progress);
    } else {
      console.log('❌ Invalid stats field');
    }
  }
  else if (command === 'phase') {
    // Update phase progress: node update-progress.js phase <phaseNum> <goal>
    const phaseNum = args[1] || await question('Phase (1/2/3/4): ');
    const goal = args[2] || await question('Goal: ');
    const phaseKey = `phase${phaseNum}`;

    if (progress.phases[phaseKey] && progress.phases[phaseKey].progress[goal] !== undefined) {
      if (typeof progress.phases[phaseKey].progress[goal] === 'boolean') {
        progress.phases[phaseKey].progress[goal] = !progress.phases[phaseKey].progress[goal];
      } else {
        const value = parseInt(args[3] || await question('Value: '));
        progress.phases[phaseKey].progress[goal] = value;
      }
      console.log(`Updated phase ${phaseNum} - ${goal}`);
      saveProgress(progress);
    } else {
      console.log('❌ Invalid phase or goal');
    }
  }
  else if (command === 'project') {
    // Add project: node update-progress.js project <name> <description> <tech>
    const name = args[1] || await question('Project name: ');
    const description = args[2] || await question('Description: ');
    const tech = args[3] || await question('Tech stack (comma-separated): ');

    progress.projects.push({
      name,
      description,
      tech: tech.split(',').map(t => t.trim()),
      completed: false,
      startDate: new Date().toISOString().split('T')[0]
    });

    console.log(`Added project: ${name}`);
    saveProgress(progress);
  }
  else if (command === 'daily') {
    // Quick daily update
    console.log('\n📊 Daily Progress Update\n');

    const didVim = await question('Did you practice Vim today? (y/n): ');
    const didGo = await question('Did you work on Go today? (y/n): ');
    const didProject = await question('Did you work on a project? (y/n): ');
    const leetcodeCount = await question('How many LeetCode problems? (number): ');
    const commits = await question('How many commits today? (number): ');

    const weekKey = `week${progress.currentWeek}`;
    if (!progress.weeklyGoals[weekKey]) {
      progress.weeklyGoals[weekKey] = {
        vimPractice: false,
        leetcodeProblems: 0,
        goLearning: false,
        projectWork: false,
        notesDocumented: false,
        codeCommitted: false
      };
    }

    if (didVim.toLowerCase() === 'y') progress.weeklyGoals[weekKey].vimPractice = true;
    if (didGo.toLowerCase() === 'y') progress.weeklyGoals[weekKey].goLearning = true;
    if (didProject.toLowerCase() === 'y') progress.weeklyGoals[weekKey].projectWork = true;

    const lc = parseInt(leetcodeCount) || 0;
    progress.weeklyGoals[weekKey].leetcodeProblems += lc;

    progress.stats.totalDays++;
    progress.stats.currentStreak++;
    progress.stats.commitsThisWeek += parseInt(commits) || 0;

    if (progress.stats.currentStreak > progress.stats.longestStreak) {
      progress.stats.longestStreak = progress.stats.currentStreak;
    }

    progress.notes.lastUpdated = new Date().toISOString().split('T')[0];

    console.log('\n✅ Daily progress updated!');
    saveProgress(progress);
  }
  else if (command === 'show') {
    // Show current progress
    console.log('\n📊 Current Progress\n');
    console.log(`Week: ${progress.currentWeek} | Phase: ${progress.currentPhase}`);
    console.log(`LeetCode: ${progress.leetcode.total}/${progress.leetcode.goal}`);
    console.log(`Streak: ${progress.stats.currentStreak} days (longest: ${progress.stats.longestStreak})`);
    console.log(`Projects: ${progress.projects.length}`);
    console.log(`\nLast updated: ${progress.notes.lastUpdated}`);
  }
  else {
    // Show help
    console.log('\n📝 Progress Tracker CLI\n');
    console.log('Commands:');
    console.log('  daily              - Quick daily update (interactive)');
    console.log('  leetcode [lang] [difficulty] - Add a LeetCode problem');
    console.log('  skill <skill> <topic>        - Toggle skill topic');
    console.log('  week <num> <goal>            - Update weekly goal');
    console.log('  phase <num> <goal>           - Update phase progress');
    console.log('  stats <field> <value>        - Update stats');
    console.log('  project <name> <desc> <tech> - Add project');
    console.log('  show                         - Show current progress');
    console.log('\nExamples:');
    console.log('  npm run update daily');
    console.log('  npm run update leetcode go easy');
    console.log('  npm run update skill go basics');
    console.log('  npm run update stats totalDays 5');
  }

  rl.close();
}

main().catch(console.error);
