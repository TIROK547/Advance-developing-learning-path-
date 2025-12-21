#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PROGRESS_FILE = path.join(__dirname, '../data/progress.json');
const BACKUP_DIR = path.join(__dirname, '../data/backups');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Load progress data
function loadProgress() {
  try {
    const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading progress file:', error.message);
    process.exit(1);
  }
}

// Backup current progress
function backupProgress() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const backupFile = path.join(BACKUP_DIR, `progress-${timestamp}.json`);

    // Only create one backup per day
    if (!fs.existsSync(backupFile)) {
      fs.copyFileSync(PROGRESS_FILE, backupFile);
    }
  } catch (error) {
    console.warn('⚠️  Warning: Could not create backup:', error.message);
  }
}

// Save progress data
function saveProgress(data) {
  try {
    // Backup before saving
    backupProgress();

    // Validate data structure
    if (!data.leetcode || !data.stats || !data.phases) {
      throw new Error('Invalid data structure');
    }

    // Update last modified
    data.notes.lastUpdated = new Date().toISOString().split('T')[0];

    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
    console.log('✅ Progress saved successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error saving progress:', error.message);
    return false;
  }
}

// Validate input
function validateNumber(value, min = 0, max = 1000) {
  const num = parseInt(value);
  if (isNaN(num) || num < min || num > max) {
    return null;
  }
  return num;
}

function validateChoice(value, validChoices) {
  const lower = value.toLowerCase().trim();
  return validChoices.includes(lower) ? lower : null;
}

// CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function askWithValidation(query, validator, errorMsg) {
  while (true) {
    const answer = await question(query);
    const validated = validator(answer);
    if (validated !== null && validated !== false) {
      return validated;
    }
    console.log(errorMsg || '❌ Invalid input, please try again.');
  }
}

// Display summary
function displaySummary(progress) {
  console.log('\n' + '='.repeat(50));
  console.log('📊 PROGRESS SUMMARY');
  console.log('='.repeat(50));
  console.log(`📅 Week ${progress.currentWeek} | Phase ${progress.currentPhase}`);
  console.log(`🔥 Streak: ${progress.stats.currentStreak} days (longest: ${progress.stats.longestStreak})`);
  console.log(`💻 LeetCode: ${progress.leetcode.total}/${progress.leetcode.goal} problems`);
  console.log(`   - Go: ${progress.leetcode.byLanguage.go} | Python: ${progress.leetcode.byLanguage.python} | TypeScript: ${progress.leetcode.byLanguage.typescript}`);
  console.log(`   - Easy: ${progress.leetcode.byDifficulty.easy} | Medium: ${progress.leetcode.byDifficulty.medium} | Hard: ${progress.leetcode.byDifficulty.hard}`);
  console.log(`📁 Projects: ${progress.projects.length} total`);
  console.log(`💾 Commits this week: ${progress.stats.commitsThisWeek}`);
  console.log(`📝 Last updated: ${progress.notes.lastUpdated}`);
  console.log('='.repeat(50) + '\n');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const progress = loadProgress();

  if (command === 'leetcode') {
    // Add LeetCode problem: npm run update leetcode [language] [difficulty] [count]
    const language = args[1] || await askWithValidation(
      'Language (go/python/typescript): ',
      (v) => validateChoice(v, ['go', 'python', 'typescript']),
      '❌ Must be: go, python, or typescript'
    );

    const difficulty = args[2] || await askWithValidation(
      'Difficulty (easy/medium/hard): ',
      (v) => validateChoice(v, ['easy', 'medium', 'hard']),
      '❌ Must be: easy, medium, or hard'
    );

    const count = args[3] ? validateNumber(args[3], 1, 100) : await askWithValidation(
      'How many problems? (1-100): ',
      (v) => validateNumber(v, 1, 100),
      '❌ Must be a number between 1 and 100'
    );

    progress.leetcode.total += count;
    progress.leetcode.byLanguage[language] += count;
    progress.leetcode.byDifficulty[difficulty] += count;

    console.log(`\n✅ Added ${count} ${difficulty} ${language} problem(s)`);
    console.log(`📊 Total: ${progress.leetcode.total}/${progress.leetcode.goal} (${Math.round(progress.leetcode.total / progress.leetcode.goal * 100)}%)`);

    saveProgress(progress);
  }
  else if (command === 'skill') {
    // Toggle skill: npm run update skill <skillName> <topic>
    const validSkills = ['go', 'django', 'vim', 'databases', 'infrastructure', 'frontend'];

    const skillName = args[1] || await askWithValidation(
      `Skill (${validSkills.join('/')}): `,
      (v) => validateChoice(v, validSkills),
      `❌ Must be one of: ${validSkills.join(', ')}`
    );

    const topics = Object.keys(progress.skills[skillName].topics);
    const topic = args[2] || await askWithValidation(
      `Topic (${topics.join('/')}): `,
      (v) => topics.includes(v.toLowerCase()) ? v.toLowerCase() : null,
      `❌ Must be one of: ${topics.join(', ')}`
    );

    progress.skills[skillName].topics[topic] = !progress.skills[skillName].topics[topic];
    console.log(`\n✅ ${skillName}.${topic} = ${progress.skills[skillName].topics[topic]}`);

    saveProgress(progress);
  }
  else if (command === 'week') {
    // Update weekly goal: npm run update week <weekNum> <goal> [value]
    const weekNum = args[1] ? validateNumber(args[1], 1, 16) : await askWithValidation(
      'Week number (1-16): ',
      (v) => validateNumber(v, 1, 16),
      '❌ Must be between 1 and 16'
    );

    const weekKey = `week${weekNum}`;
    const validGoals = ['vimPractice', 'leetcodeProblems', 'goLearning', 'projectWork', 'notesDocumented', 'codeCommitted'];

    const goal = args[2] || await askWithValidation(
      `Goal (${validGoals.join('/')}): `,
      (v) => validGoals.includes(v) ? v : null,
      `❌ Must be one of: ${validGoals.join(', ')}`
    );

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
      const count = args[3] ? validateNumber(args[3], 0, 100) : await askWithValidation(
        'Number of problems (0-100): ',
        (v) => validateNumber(v, 0, 100),
        '❌ Must be between 0 and 100'
      );
      progress.weeklyGoals[weekKey][goal] = count;
    } else {
      progress.weeklyGoals[weekKey][goal] = !progress.weeklyGoals[weekKey][goal];
    }

    console.log(`\n✅ Week ${weekNum} - ${goal} updated`);
    saveProgress(progress);
  }
  else if (command === 'stats') {
    // Update stats: npm run update stats <field> <value>
    const validFields = ['totalDays', 'currentStreak', 'longestStreak', 'projectsCompleted', 'testsWritten', 'commitsThisWeek'];

    const field = args[1] || await askWithValidation(
      `Field (${validFields.join('/')}): `,
      (v) => validFields.includes(v) ? v : null,
      `❌ Must be one of: ${validFields.join(', ')}`
    );

    const value = args[2] ? validateNumber(args[2], 0, 10000) : await askWithValidation(
      `Value for ${field} (0-10000): `,
      (v) => validateNumber(v, 0, 10000),
      '❌ Must be a number between 0 and 10000'
    );

    progress.stats[field] = value;
    console.log(`\n✅ ${field} = ${value}`);

    saveProgress(progress);
  }
  else if (command === 'phase') {
    // Update phase progress: npm run update phase <phaseNum> <goal>
    const phaseNum = args[1] ? validateNumber(args[1], 1, 4) : await askWithValidation(
      'Phase (1-4): ',
      (v) => validateNumber(v, 1, 4),
      '❌ Must be between 1 and 4'
    );

    const phaseKey = `phase${phaseNum}`;
    const goals = Object.keys(progress.phases[phaseKey].progress);

    const goal = args[2] || await askWithValidation(
      `Goal (${goals.join('/')}): `,
      (v) => goals.includes(v) ? v : null,
      `❌ Must be one of: ${goals.join(', ')}`
    );

    if (typeof progress.phases[phaseKey].progress[goal] === 'boolean') {
      progress.phases[phaseKey].progress[goal] = !progress.phases[phaseKey].progress[goal];
      console.log(`\n✅ Phase ${phaseNum} - ${goal} = ${progress.phases[phaseKey].progress[goal]}`);
    } else {
      const value = args[3] ? validateNumber(args[3], 0, 100) : await askWithValidation(
        `Value for ${goal} (0-100): `,
        (v) => validateNumber(v, 0, 100),
        '❌ Must be between 0 and 100'
      );
      progress.phases[phaseKey].progress[goal] = value;
      console.log(`\n✅ Phase ${phaseNum} - ${goal} = ${value}`);
    }

    saveProgress(progress);
  }
  else if (command === 'project') {
    // Add project: npm run update project [name] [description] [tech]
    const name = args[1] || await question('Project name: ');
    const description = args[2] || await question('Description: ');
    const tech = args[3] || await question('Tech stack (comma-separated): ');

    if (!name || !description) {
      console.log('❌ Project name and description are required');
      rl.close();
      return;
    }

    progress.projects.push({
      name,
      description,
      tech: tech.split(',').map(t => t.trim()),
      completed: false,
      startDate: new Date().toISOString().split('T')[0]
    });

    console.log(`\n✅ Added project: ${name}`);
    saveProgress(progress);
  }
  else if (command === 'daily') {
    // Quick daily update - most commonly used command
    console.log('\n' + '='.repeat(50));
    console.log('📅 DAILY PROGRESS UPDATE');
    console.log('='.repeat(50) + '\n');

    const didVim = await askWithValidation(
      '🎯 Did you practice Vim today? (y/n): ',
      (v) => validateChoice(v, ['y', 'n', 'yes', 'no']),
      '❌ Please enter y or n'
    );

    const didGo = await askWithValidation(
      '🎯 Did you work on Go today? (y/n): ',
      (v) => validateChoice(v, ['y', 'n', 'yes', 'no']),
      '❌ Please enter y or n'
    );

    const didProject = await askWithValidation(
      '🎯 Did you work on a project? (y/n): ',
      (v) => validateChoice(v, ['y', 'n', 'yes', 'no']),
      '❌ Please enter y or n'
    );

    const leetcodeCount = await askWithValidation(
      '💻 How many LeetCode problems did you solve? (0-50): ',
      (v) => validateNumber(v, 0, 50),
      '❌ Must be a number between 0 and 50'
    );

    let language = 'go';
    let difficulty = 'easy';

    if (leetcodeCount > 0) {
      language = await askWithValidation(
        '   Main language used (go/python/typescript): ',
        (v) => validateChoice(v, ['go', 'python', 'typescript']),
        '❌ Must be: go, python, or typescript'
      );

      difficulty = await askWithValidation(
        '   Average difficulty (easy/medium/hard): ',
        (v) => validateChoice(v, ['easy', 'medium', 'hard']),
        '❌ Must be: easy, medium, or hard'
      );
    }

    const commits = await askWithValidation(
      '📝 How many commits did you make today? (0-100): ',
      (v) => validateNumber(v, 0, 100),
      '❌ Must be a number between 0 and 100'
    );

    // Update weekly goals
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

    if (didVim === 'y' || didVim === 'yes') progress.weeklyGoals[weekKey].vimPractice = true;
    if (didGo === 'y' || didGo === 'yes') progress.weeklyGoals[weekKey].goLearning = true;
    if (didProject === 'y' || didProject === 'yes') progress.weeklyGoals[weekKey].projectWork = true;
    if (commits > 0) progress.weeklyGoals[weekKey].codeCommitted = true;

    // Update LeetCode stats
    if (leetcodeCount > 0) {
      progress.leetcode.total += leetcodeCount;
      progress.leetcode.byLanguage[language] += leetcodeCount;
      progress.leetcode.byDifficulty[difficulty] += leetcodeCount;
      progress.weeklyGoals[weekKey].leetcodeProblems += leetcodeCount;
    }

    // Update general stats
    progress.stats.totalDays++;
    progress.stats.currentStreak++;
    progress.stats.commitsThisWeek += commits;

    if (progress.stats.currentStreak > progress.stats.longestStreak) {
      progress.stats.longestStreak = progress.stats.currentStreak;
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ DAILY UPDATE COMPLETE');
    console.log('='.repeat(50));
    console.log(`📊 Day ${progress.stats.totalDays} | Streak: ${progress.stats.currentStreak} 🔥`);
    if (leetcodeCount > 0) {
      console.log(`💻 LeetCode: ${progress.leetcode.total}/${progress.leetcode.goal} (+${leetcodeCount} today)`);
    }
    if (commits > 0) {
      console.log(`📝 Commits: ${progress.stats.commitsThisWeek} this week (+${commits} today)`);
    }
    console.log('='.repeat(50) + '\n');

    saveProgress(progress);
  }
  else if (command === 'show') {
    // Show current progress
    displaySummary(progress);
  }
  else if (command === 'backup') {
    // Manual backup
    backupProgress();
    console.log('✅ Manual backup created');
  }
  else if (command === 'reset-streak') {
    // Reset streak (for when you miss a day)
    progress.stats.currentStreak = 0;
    console.log('⚠️  Streak reset to 0');
    saveProgress(progress);
  }
  else {
    // Show help
    console.log('\n' + '='.repeat(50));
    console.log('📝 PROGRESS TRACKER CLI');
    console.log('='.repeat(50) + '\n');
    console.log('📌 Most Used Commands:');
    console.log('  daily                    - Quick daily update (recommended!)');
    console.log('  show                     - Show current progress summary\n');

    console.log('📊 Specific Updates:');
    console.log('  leetcode [lang] [diff] [count] - Add LeetCode problem(s)');
    console.log('  skill <skill> <topic>          - Toggle skill topic');
    console.log('  week <num> <goal> [value]      - Update weekly goal');
    console.log('  phase <num> <goal>             - Update phase progress');
    console.log('  stats <field> <value>          - Update stats');
    console.log('  project <name> <desc> <tech>   - Add project\n');

    console.log('🛠️  Utilities:');
    console.log('  backup                   - Create manual backup');
    console.log('  reset-streak             - Reset current streak to 0\n');

    console.log('💡 Examples:');
    console.log('  npm run update daily');
    console.log('  npm run update leetcode go easy 3');
    console.log('  npm run update skill go basics');
    console.log('  npm run update stats totalDays 5\n');

    console.log('📖 Full documentation: scripts/README.md');
    console.log('='.repeat(50) + '\n');
  }

  rl.close();
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
