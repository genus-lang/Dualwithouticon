# 📁 CodeArena - Complete Folder Structure

## 🎯 Overview
This document shows the complete file structure of the CodeArena dual coding platform with seven main pages:
- **Home Page** - Landing page with marketing content
- **Arena Page** - Dual collaborative coding environment
- **Match Page** - Competitive coding match (Friendly Spar mode)
- **Question Bank Page** - Browse and solve coding problems
- **Profile Page** - User dashboard with stats, achievements, and analytics
- **Announcement Page** - Contest alerts and coding platform updates
- **Community Page** - Discussion forum for Q&A and coding topics

---

## 🗂️ Full Directory Tree

```
codearena/
│
├── 📄 App.tsx                              # Main app with page routing (Home/Arena)
├── 📄 FOLDER_STRUCTURE.md                  # This file - complete documentation
├── 📄 Attributions.md                      # Image/resource credits
│
├── 📁 components/                          # All React components
│   │
│   ├── 🏠 HOME PAGE COMPONENTS:
│   │   ├── Navbar.tsx                      # Navigation with "Start Coding" buttons
│   │   ├── HeroSection.tsx                 # Hero with animated background & CTA
│   │   ├── HowItWorksSection.tsx           # 3-step process explanation
│   │   ├── ActivitySection.tsx             # Live map showing active coding pairs
│   │   ├── AIAssistantSection.tsx          # AI features showcase
│   │   ├── CommunitySection.tsx            # Community feed & contests
│   │   ├── CTABanner.tsx                   # Final call-to-action
│   │   └── Footer.tsx                      # Footer with links & newsletter
│   │
│   ├── 🎮 ARENA PAGE COMPONENTS:
│   │   └── ArenaPage.tsx                   # Main arena page component
│   │
│   ├── 📁 arena/                           # Arena sub-components
│   │   ├── ArenaHeader.tsx                 # Top bar with timer, mode, avatars
│   │   ├── CodeEditor.tsx                  # Split-screen code editor
│   │   ├── AIPanel.tsx                     # AI assistant sidebar (right)
│   │   ├── ChatPanel.tsx                   # Live chat sidebar (left)
│   │   └── IOConsole.tsx                   # Input/Output console (bottom)
│   │
│   ├── 🏆 MATCH PAGE COMPONENTS:
│   │   └── MatchPage.tsx                   # Main match page component
│   │
│   ├── 📁 match/                           # Match sub-components
│   │   ├── MatchHeader.tsx                 # Top bar with timer & leaderboard
│   │   ├── ProblemPanel.tsx                # Left sidebar - problem description
│   │   ├── MatchEditor.tsx                 # Center - code editor
│   │   ├── TestPanel.tsx                   # Right sidebar - test cases & console
│   │   ├── FeedbackBar.tsx                 # Bottom bar - real-time feedback
│   │   └── MatchSummaryModal.tsx           # Victory/defeat summary modal
│   │
│   ├── 💾 QUESTION BANK PAGE COMPONENTS:
│   │   └── QuestionBankPage.tsx            # Main question bank page component
│   │
│   ├── 📁 question-bank/                   # Question bank sub-components
│   │   ├── QuestionBankHeader.tsx          # Top bar with search & profile
│   │   ├── FilterToolbar.tsx               # Difficulty, topic, sort filters
│   │   ├── QuestionCard.tsx                # Expandable question card
│   │   ├── QuestionSidebar.tsx             # Top coders & AI recommendations
│   │   └── Pagination.tsx                  # Page navigation controls
│   │
│   ├── 👤 PROFILE PAGE COMPONENTS:
│   │   └── ProfilePage.tsx                 # Main profile page component
│   │
│   ├── 📁 profile/                         # Profile sub-components
│   │   ├── ProfileHeader.tsx               # Top navigation bar
│   │   ├── UserSummary.tsx                 # Avatar, name, level, rating
│   │   ├── StatsCards.tsx                  # Matches, wins, accuracy cards
│   │   ├── APIRatingsPanel.tsx             # External platform ratings
│   │   ├── AchievementsBadges.tsx          # Badge grid with unlock status
│   │   ├── PerformanceGraph.tsx            # Line/radar charts
│   │   └── ActivityFeed.tsx                # Recent activity timeline
│   │
│   ├── 📢 ANNOUNCEMENT PAGE COMPONENTS:
│   │   └── AnnouncementPage.tsx            # Main announcement page component
│   │
│   ├── 📁 announcement/                    # Announcement sub-components
│   │   ├── AnnouncementHeader.tsx          # Top bar with search & notifications
│   │   ├── PlatformFilter.tsx              # Platform selection toolbar
│   │   ├── ContestCard.tsx                 # Contest detail cards
│   │   ├── CountdownTimer.tsx              # Animated countdown timers
│   │   ├── ReminderModal.tsx               # Reminder setup modal
│   │   ├── UpcomingWidget.tsx              # Hot upcoming events widget
│   │   └── PastContestsTable.tsx           # Past contests table
│   │
│   ├── 💬 COMMUNITY PAGE COMPONENTS:
│   │   └── CommunityPage.tsx               # Main community forum page component
│   │
│   ├── 📁 community/                       # Community sub-components
│   │   ├── CommunityHeader.tsx             # Top bar with Ask Question button
│   │   ├── SearchHeroSection.tsx           # Search bar and CTA section
│   │   ├── PostCard.tsx                    # Discussion thread cards
│   │   ├── VotePanel.tsx                   # Upvote/downvote panel
│   │   ├── SidebarTagPanel.tsx             # Popular tags panel
│   │   ├── TopContributorCard.tsx          # Top contributor cards
│   │   └── StatsPanel.tsx                  # Community stats widget
│   │
│   ├── 📁 figma/                           # Figma utilities
│   │   └── ImageWithFallback.tsx           # Protected image component
│   │
│   └── 📁 ui/                              # Shadcn UI components (42 files)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.ts
│       └── utils.ts
│
├── 📁 styles/
│   └── globals.css                         # Dark theme, neon colors, animations
│
└── 📁 guidelines/
    └── Guidelines.md                       # Project guidelines

```

---

## 🎨 Page Architecture

### **Home Page Flow**
```
App.tsx (state: 'home')
  ├─→ Navbar                    [with navigation handlers]
  ├─→ HeroSection               [with navigation handlers]
  ├─→ HowItWorksSection
  ├─→ ActivitySection
  ├─→ AIAssistantSection
  ├─→ CommunitySection
  ├─→ CTABanner                 [with navigation handlers]
  └─→ Footer
```

### **Arena Page Flow** (Dual Coding)
```
App.tsx (state: 'arena')
  └─→ ArenaPage
        ├─→ ArenaHeader         [Top bar with timer]
        ├─→ ChatPanel           [Left sidebar]
        ├─→ CodeEditor (Left)   [User 1 - Cyan]
        ├─→ CodeEditor (Right)  [User 2 - Purple]
        ├─→ AIPanel             [Right sidebar]
        └─→ IOConsole           [Bottom console]
```

### **Match Page Flow** (Friendly Spar)
```
App.tsx (state: 'match')
  └─→ MatchPage
        ├─→ MatchHeader         [Timer, leaderboard, room ID]
        ├─→ ProblemPanel        [Problem description, examples, hints]
        ├─→ MatchEditor         [Code editor with syntax highlighting]
        ├─→ TestPanel           [Test cases, output, AI help]
        ├─→ FeedbackBar         [Real-time test results]
        └─→ MatchSummaryModal   [Victory/defeat screen]
```

### **Question Bank Page Flow**
```
App.tsx (state: 'questions')
  └─→ QuestionBankPage
        ├─→ QuestionBankHeader  [Logo, search, profile]
        ├─→ FilterToolbar       [Difficulty, topic, sort filters]
        ├─→ QuestionCard (×8)   [Expandable cards with solutions]
        │     ├─→ Video tab     [Solution video player]
        │     ├─→ Code tab      [Code example]
        │     └─→ Explanation   [Step-by-step breakdown]
        ├─→ QuestionSidebar     [Top coders, recent activity, AI recs]
        └─→ Pagination          [Page navigation]
```

### **Profile Page Flow**
```
App.tsx (state: 'profile')
  └─→ ProfilePage
        ├─→ ProfileHeader       [Navigation to Home/Matches/Questions/Announcements]
        ├─→ UserSummary         [Avatar, level progress, rating]
        ├─→ StatsCards          [4 stat cards: matches, wins, accuracy, time]
        ├─→ APIRatingsPanel     [Codeforces, LeetCode, CodeChef cards]
        ├─→ AchievementsBadges  [8 badge cards with unlock status]
        ├─→ PerformanceGraph    [Line/Radar chart toggle]
        └─→ ActivityFeed        [5 recent activity items]
```

### **Announcement Page Flow**
```
App.tsx (state: 'announcements')
  └─→ AnnouncementPage
        ├─→ AnnouncementHeader  [Logo, search bar, notification bell, profile]
        ├─→ PlatformFilter      [All/Codeforces/LeetCode/CodeChef/AtCoder/etc.]
        ├─→ ContestCard (×6+)   [Contest details with countdown timers]
        │     ├─→ CountdownTimer [Live countdown: days:hours:mins:secs]
        │     └─→ ReminderModal  [Set notification preferences]
        ├─→ UpcomingWidget      [Sidebar: Hot upcoming events (3 items)]
        └─→ PastContestsTable   [Recent contests results table]
```

### **Community Page Flow**
```
App.tsx (state: 'community')
  └─→ CommunityPage
        ├─→ CommunityHeader     [Logo, notification bell, Ask Question button, profile]
        ├─→ SearchHeroSection   [Search bar, CTA, community stats]
        ├─→ Discussion Feed     [Main content area]
        │     └─→ PostCard (×6+) [Question cards with votes, comments, tags]
        │           └─→ VotePanel [Upvote/downvote functionality]
        ├─→ Sidebar (Right)     [Multiple panels]
        │     ├─→ StatsPanel     [Active threads, replies, online users]
        │     ├─→ SidebarTagPanel [Popular tags with counts]
        │     └─→ TopContributorCard (×3) [Top contributors this week]
        ├─→ Ask Question Modal  [Dialog for creating new questions]
        └─→ Floating FAB        [Quick access Ask Question button]
```

---

## 🚀 Navigation System

### **How Navigation Works**
- App.tsx manages a `currentPage` state: `'home'` | `'arena'` | `'match'` | `'questions'` | `'profile'` | `'announcements'` | `'community'`
- **"Start Dual Coding"** button → navigates to Arena Page (collaborative)
- **"Friendly Match"** button → navigates to Match Page (competitive)
- **"Question Bank"** link → navigates to Question Bank Page (browse problems)
- **"Profile"** (avatar dropdown) → navigates to Profile Page (user dashboard)
- **"Announcements"** link → navigates to Announcement Page (contest alerts)
- **"Community"** link → navigates to Community Page (discussion forum)
- **Exit** button in Arena/Match/Questions/Announcements/Community → returns to Home
- **ProfileHeader** navigation → allows navigation between all pages
- **"Solve Now"** / "Try Yourself" in Question Bank → navigates to Match Page

### **Button Locations**
1. **Navbar** → "Question Bank", "Announcements", "Community" links, "Start Dual Coding" (cyan) & "Friendly Match" (purple) buttons, Profile (avatar dropdown)
2. **HeroSection** → Primary CTA buttons
3. **CTABanner** → Final conversion buttons
4. **ArenaHeader / MatchHeader / QuestionBankHeader / AnnouncementHeader / CommunityHeader** → Exit button (returns to home)
5. **ProfileHeader** → Navigation buttons (Home, Matches, Questions, Announcements, Community, Logout)
6. **QuestionCard** → "Solve Now" button (opens match page)
7. **ContestCard** → "Participate" link (external), "Add Reminder" button (opens modal)
8. **CommunityHeader** → "Ask Question" button (opens modal)
9. **SearchHeroSection** → "Ask Question ⚡" button (opens modal)
10. **Floating FAB** → Quick access "Ask Question" button (bottom right)

---

## 🎮 Arena Page Features (Dual Coding)

### **Split-Screen Editors**
- **Left Editor**: AlexDev (Cyan #00FFFF)
- **Right Editor**: SarahCode (Purple #FF00FF)
- Real-time cursor animations
- Syntax highlighting (Python)
- Turn indicators
- Typing animations

### **AI Assistant Panel** (Right Sidebar)
- Live hints and suggestions
- Error detection with line numbers
- "Apply Fix" & "Explain Bug" buttons
- AI On/Off toggle
- Stats: Hints used, Accuracy %

### **Chat Panel** (Left Sidebar)
- Terminal-style messages
- Typing indicators
- Quick action buttons
- Color-coded users
- Timestamps

### **Console** (Bottom)
- 3 tabs: Input, Output, Logs
- "Run Code" button with execution animation
- Success/error badges
- Execution time tracking
- Loading states with progress bars

---

## 🏆 Match Page Features (Friendly Spar)

### **MatchHeader** (Top Bar)
- Live countdown timer with pulsing effect
- Progress bar (cyan → purple gradient)
- Room ID display (#4591-A)
- Match mode badge (Friendly Spar)
- Mini leaderboard widget (You vs Opponent)
- Exit button

### **ProblemPanel** (Left Sidebar)
- Problem title & difficulty badge
- Problem statement with syntax highlighting
- Example input/output boxes
- Collapsible constraints section
- Show/hide hints with AI suggestions
- Glassmorphic design

### **MatchEditor** (Center)
- Large terminal-style code editor
- Language selector (Python, JS, C++, Java)
- AI Assist toggle with suggestions
- Theme toggle (Dark/Neon)
- Syntax highlighting with neon colors
- Live typing indicator
- Time progress bar
- Cursor trail effects
- Floating AI suggestion bubbles

### **TestPanel** (Right Sidebar)
- **4 Tabs**: Input, Output, Test Results, AI Help
- Custom input textarea
- Real-time output display
- Test case cards with:
  - Pass/fail indicators (✓/✗)
  - Execution time
  - Expected vs actual results
  - Progress rings
  - Edge case warnings
- AI help with "Apply Fix" buttons
- Run Code & Submit buttons with animations
- Test summary bar (3/5 passed)

### **FeedbackBar** (Bottom)
- Real-time test results (3/5 passed)
- Progress dots visualization
- AI suggestion bubble with rotating icon
- Animated gradient border
- Motivational messages

### **MatchSummaryModal** (End Screen)
- Full-screen overlay with confetti animation
- Victory/Defeat header with burst effect
- Match statistics table:
  - Time taken
  - Correct test cases
  - AI help used %
  - Bonus XP points
- Player avatars (You vs Opponent)
- Rematch button (glowing cyan)
- Return to Lobby button
- Particle effects and glow animations

---

## 💾 Question Bank Page Features

### **QuestionBankHeader** (Top Bar)
- CodeArena logo with back navigation
- Page title "Question Bank 💾" with animated underline
- Expandable search bar with glow effect
- Filter settings button
- User profile avatar with online status ring

### **FilterToolbar** (Filter Panel)
- **Difficulty Filters**:
  - All / Easy / Medium / Hard toggle buttons
  - Active filter glows with pulsing animation
  - Color-coded: Green (Easy), Orange (Medium), Red (Hard)
- **Topic Dropdown**: All topics, Arrays, Strings, Trees, Graphs, DP, etc.
- **Sort Dropdown**: Newest, Most Solved, Rating, Title
- Horizontally scrollable on mobile
- Smooth hover animations with gradient glow

### **QuestionCard** (Main Content)
- **Card Header**:
  - Problem title with cyan glow underline on hover
  - Difficulty badge with color-coded glow
  - Topic tags (purple accent)
  - Star rating (yellow stars)
  - Solved count with user icon
- **Action Buttons**:
  - "Solve Now" (green) with ripple effect
  - "View Solution" with expand/collapse
- **Expandable Section** (slide-down animation):
  - **3 Tabs**: Video, Code, Explanation
  - **Video Tab**: 
    - Embedded player with play button
    - Duration & view count
    - Glassmorphic frame
  - **Code Tab**:
    - Syntax-highlighted solution
    - Dark code block with purple border
  - **Explanation Tab**:
    - Step-by-step breakdown
    - Numbered circles with cyan glow
    - Clear, concise instructions
  - **"Try Yourself" Button**:
    - Gradient purple → cyan
    - Sweeping shine animation
    - Opens Match page
- Hover effect: card lifts with cyan glow shadow

### **QuestionSidebar** (Right Panel - Desktop Only)
- **Top Coders This Week**:
  - Leaderboard with rank badges (gold, silver, bronze)
  - User avatars with cyan borders
  - Points & streak indicators
  - Trophy icon header
- **Recently Solved**:
  - Activity feed showing recent solutions
  - User names in purple
  - Relative timestamps
  - Clock icon header
- **AI Recommended**:
  - Personalized problem suggestions
  - Match percentage progress bars
  - Difficulty badges
  - Animated gradient border (rotating)
  - Zap icon header

### **Pagination** (Bottom)
- Circular page buttons with glassmorphic style
- Active page pulses with cyan glow
- Previous/Next buttons with chevron icons
- Page info (Page X of Y)
- Disabled states for first/last page

### **Background & Effects**
- Animated binary matrix code rain (very subtle)
- Neon grid pattern (cyan/purple)
- Large glowing orbs (cyan & purple) with slow breathing animation
- Floating particles (cyan & green)
- Glassmorphism throughout
- Smooth transitions (0.3-0.4s ease-in-out)

---

## 👤 Profile Page Features

### **ProfileHeader** (Top Navigation)
- CodeArena logo (clickable, returns to home)
- Page title "👤 Profile Dashboard" with animated underline
- Navigation buttons:
  - 🏠 Home (white/cyan hover)
  - ⚔️ Matches (white/purple hover)
  - 📚 Questions (white/green hover)
  - 🚪 Logout (white/red hover)
- Consistent glassmorphic styling

### **UserSummary** (Hero Section)
- **Avatar**:
  - 128px circular avatar
  - Animated gradient ring (cyan → purple → green)
  - Online status indicator (green glow dot)
  - Hover: ripple glow effect
  - Particle effects in background
- **User Info**:
  - Username: @meghram_meena (cyan)
  - PRO badge (gradient cyan/purple)
  - Full name: Meghram Meena
- **Level Progress**:
  - Level 12 badge (orange)
  - Progress bar (65% to next level)
  - XP counter: 1240 / 1900
  - Gradient fill (purple → cyan)
  - Sweeping shine animation
- **Coding Rating**:
  - Large rating number: 1823
  - Rotating/pulsing Zap icon
  - 5-star performance meter (4/5 filled)
  - Yellow stars with glow effect
- Background: Animated gradient glow (cyan ↔ purple)
- Floating particles throughout

### **StatsCards** (4-Card Grid)
Each card features:
- Glassmorphic design with color-coded borders
- Icon with rotation animation on hover
- Large counter value with animation
- Descriptive label
- Corner glow accent
- Hover: scale + glow shadow

**Cards:**
1. **Matches Played** (Cyan):
   - Icon: ⚔️ Sword
   - Value: 154
   - Label: "Matches Played"
2. **Wins** (Orange):
   - Icon: 🏆 Trophy
   - Value: 92
   - Label: "Wins"
3. **Accuracy** (Green):
   - Icon: 🎯 Target
   - Value: 87.3%
   - Label: "Accuracy"
4. **Total Time Coded** (Purple):
   - Icon: ⏱️ Clock
   - Value: 78 hrs
   - Label: "Total Time Coded"

### **APIRatingsPanel** (External Platforms)
Section displays live mock API data from coding platforms:

**Codeforces Card** (Cyan):
- Handle: @meghram_cf
- Rating: 1675
- Change: +45 ↑ (green badge)
- Rank: "Expert"
- Pulsing glow effect every 3s

**LeetCode Card** (Orange):
- Handle: @meghram
- Rating: 2021
- Change: +12 🔼 (green badge)
- Solved: 341 problems

**CodeChef Card** (Purple):
- Handle: @meghram_iiit
- Rating: 1803
- Change: -8 (red badge)
- Rank: "4★ Coder"
- 4/5 stars displayed

All cards: Glassmorphic, color-coded borders, animated counters

### **AchievementsBadges** (8-Badge Grid)
- **Grid Layout**: 2 rows × 4 columns (responsive)
- **Progress Bar**: Shows 7/12 unlocked
- **Unlocked Badges** (with animations):
  - Circular icon with color glow border
  - Pulsing ring animation
  - Holographic scan line on hover
  - Color-coded (cyan, orange, green, purple)
- **Locked Badges**:
  - Grayscale appearance
  - 🔒 Lock icon
  - Lower opacity (60%)
  - No glow effects

**Badge Examples:**
1. 🏆 100 Matches (Orange) - Unlocked
2. ⚡ Speed Demon (Cyan) - Unlocked
3. 🎯 90% Accuracy (Green) - Unlocked
4. ⏱️ 50 Hour Coder (Purple) - Unlocked
5. 💻 AI Master (Cyan) - Unlocked
6. 🏅 Fastest Debugger (Orange) - Unlocked
7. ⭐ Perfect Score (Pink) - Unlocked
8. 🏆 Contest Winner (Green) - Locked

### **PerformanceGraph** (Analytics)
- **Toggle View**: Line Chart ↔ Radar Chart
- **Line Chart**:
  - X-axis: Last 10 matches (M1-M10)
  - Y-axis: Rating (1000-2000)
  - Cyan line with glow effect
  - Interactive tooltips
  - Shows rating progression: 1200 → 1823
  - Footer stat: "+623 rating gain"
- **Radar Chart**:
  - 5 skill axes: Speed, Accuracy, Problem Solving, Debugging, Creativity
  - Purple gradient fill (30% opacity)
  - Stroke width: 2px with glow
  - Interactive tooltips
  - Footer stat: "Average: 86%"
- Glassmorphic container with animated background glow
- Smooth view transition animations

### **ActivityFeed** (Recent History)
Timeline of 5 recent activities:
1. **Win** (Orange):
   - "Won a match against @coderx"
   - "Binary Tree Traversal (Hard)"
   - 2 hours ago
2. **Solve** (Cyan):
   - "Solved 'Longest Common Subsequence'"
   - "LeetCode • Dynamic Programming"
   - 5 hours ago
3. **Badge** (Green):
   - "New Badge Unlocked: Accuracy 90%+"
   - "Maintained high accuracy across 20 matches"
   - 1 day ago
4. **Win** (Orange):
   - "Won a match against @sarah_codes"
   - "Graph Shortest Path (Medium)"
   - 1 day ago
5. **Solve** (Cyan):
   - "Solved 'Merge K Sorted Lists'"
   - "CodeChef • Divide and Conquer"
   - 2 days ago

Each item features:
- Color-coded icon (rotating on hover)
- Title + subtitle
- Timestamp with clock icon
- Pulsing indicator dot
- Slide-in animation
- Hover: shifts right with glow

### **Floating Edit Profile Button**
- Fixed bottom-right corner
- Circular button (56px)
- Gradient background (purple → cyan)
- Edit/pencil icon
- Pulsing glow shadow
- Hover: scale up + intensify glow
- Click: scale down (tap effect)

### **Background & Effects**
- Animated binary matrix code rain (very subtle, 5% opacity)
- Neon grid pattern (cyan/purple, 10% opacity)
- Large glowing orbs (cyan & purple) with breathing animation
- Moving circuit lines (vertical cyan lines)
- Floating particles (cyan, green, purple)
- Glassmorphism on all panels
- Smooth transitions throughout (0.3-0.5s)

---

## 📢 Announcement Page Features

### **AnnouncementHeader** (Top Navigation)
- **Left Side**:
  - CodeArena logo with cyan glow
  - Page title: "📢 Announcements & Contests"
  - Orbitron font for title
- **Center**:
  - Search bar: "Search contests or platforms..."
  - Glassmorphic input with cyan border focus
  - JetBrains Mono font
- **Right Side**:
  - 🔔 Notification Bell (glows on new updates)
  - Pulsing dot indicator for unread notifications
  - Profile avatar (small circular with glow ring)
  - All interactive elements have hover glow effects

### **PlatformFilter** (Filter Toolbar)
Horizontal filter bar with platform selection buttons:
- **Filter Pills**:
  - All (default selected)
  - Codeforces (Cyan #00FFFF)
  - LeetCode (Orange #FFB86C)
  - CodeChef (Purple #A259FF)
  - AtCoder (Green #00FF88)
  - HackerRank (Red #FF0088)
- **Active State**: Neon border glow matching platform color
- **Hover**: Gradient flow animation along border
- **New Badge**: "New 🔔" tag for platforms with active contests
- **Right Controls**:
  - Sort Dropdown: "Upcoming | Live | Past"
  - Calendar icon for date filtering
  - Glassmorphic dropdown menu

### **ContestCard** (Main Contest Grid)
Each contest card features:

**Card Structure**:
- Glassmorphic background (blur 15-20px, opacity 0.12)
- Border glow matching platform accent color
- Hover: slight tilt + glow intensifies

**Header Row**:
- Platform logo (small icon, e.g., Codeforces symbol)
- Contest title (bold, glowing cyan text)
- Difficulty badge (color-coded):
  - "Global Round" (Orange)
  - "Rated" (Purple)
  - "Beginner" (Green)
  - "All Levels" (Cyan)

**Main Details Section**:
- 🗓️ **Date**: "18 Nov 2025" (white text)
- 🕒 **Start Time**: "21:30 IST" (cyan text)
- ⏳ **Duration**: "2 hours" (white/60% opacity)
- 🔗 **Contest Link**: "Participate →" button
  - Neon gradient button (platform color)
  - Opens in new tab
  - Hover: underline expands with glow trail
  - Sweeping shine animation

**Countdown Timer** (Right Side):
- Large LED-style digital font (Orbitron)
- Format: `02d : 05h : 19m : 42s`
- Color progression:
  - > 1 day: Cyan (#00FFFF)
  - < 1 day: Orange (#FFB86C)
  - < 1 hour: Red (#FF0088) with faster pulse
- Animation: Pulses every second
- **Live Status**: 
  - When contest starts: border flashes green
  - Label changes to "Live Now ⚡" (green glow)
  - Timer shows elapsed time

**Footer Row**:
- "Add Reminder ⏰" button (glowing purple)
- Hover: scale + glow intensify
- Opens ReminderModal on click
- "Set Platform Notification 🔔" toggle switch
- Tooltip: "Get alert 10 min before contest starts"

**Example Contest Cards**:
1. **Codeforces Global Round 28** (Cyan):
   - Rated • 18 Nov • 21:30 IST • 2h
   - Countdown: 2d 5h 19m
2. **LeetCode Weekly Contest 153** (Orange):
   - All Levels • 17 Nov • 08:00 IST • 1.5h
   - Countdown: 22h 45m (orange pulse)
3. **CodeChef Starters 113** (Purple):
   - Beginner • 19 Nov • 20:00 IST • 3h
   - Countdown: 3d 2h
4. **AtCoder Beginner Contest 349** (Green):
   - Beginner • 16 Nov • 17:30 IST • 1.5h
   - Status: Live Now ⚡ (green glow)

### **CountdownTimer** (Animated Timer Component)
- **Digital LED Effect**: Orbitron font with segment-style appearance
- **Real-time Updates**: Decrements every second
- **Pulse Animation**: 
  - Slow pulse (2s) when > 1 hour
  - Fast pulse (1s) when < 1 hour
  - Rapid flash (0.5s) when < 10 minutes
- **Color States**:
  - Normal: Cyan with soft glow
  - Warning: Orange with medium glow
  - Urgent: Red with intense glow
  - Live: Green with pulsing ring
- **Format**: Automatically adjusts (shows days only if > 24h)
- **Zero State**: Switches to "Live Now" or "Ended"

### **ReminderModal** (Popup Dialog)
Triggered by "Add Reminder ⏰" button:

**Modal Design**:
- Floating glassmorphic box (blur 20px)
- Cyan neon border with glow
- Backdrop blur overlay (dark transparent)
- Smooth fade-in + scale-up animation (0.3s)
- JetBrains Mono font

**Content**:
- **Title**: "Set Contest Reminder" (Orbitron, cyan)
- **Contest Info**: Name + start time (preview)
- **Reminder Time Dropdown**:
  - 10 minutes before
  - 30 minutes before
  - 1 hour before
  - 1 day before
  - Custom time picker
- **Notification Type** (checkboxes):
  - ✅ Browser Popup (default)
  - ✅ Email notification
  - ☐ Discord webhook
  - ☐ Slack alert
- **Action Buttons**:
  - "Save Reminder" (glowing green, gradient)
  - "Cancel" (transparent outline)

**Success Animation**:
- When saved: brief green pulse + checkmark icon
- Toast notification: "Reminder set! 🔔"
- Modal fades out smoothly

### **UpcomingWidget** (Sidebar Panel)
Right-side floating widget showing hot upcoming events:

**Widget Header**:
- Title: "🔥 Hot Upcoming Events"
- Orbitron font, gradient text (cyan → orange)
- Flame icon animation

**Event List** (3-5 items):
Each item shows:
- Platform color dot indicator
- Contest name (truncated if long)
- Countdown: "in 3h 21m" (relative time)
- Difficulty badge (small)

**Visual Effects**:
- Events < 1 hour: Pulsing glow effect (orange)
- Events < 10 min: Rapid pulse (red) + "Starting Soon!" tag
- Hover: item highlights with platform color
- Separator lines between items (subtle gradient)

**Example Items**:
1. 🟦 **LeetCode Weekly 153** – in 3h 21m
2. 🟦 **Codeforces Round #987** – in 12h
3. 🟢 **AtCoder ABC 349** – in 1d 4h
4. 🟣 **CodeChef Lunchtime** – in 2d
5. 🔴 **HackerRank Challenge** – in 5d

**Widget Footer**:
- "View All →" link (cyan, hover glow)
- Animated chevron (bounces right)

### **PastContestsTable** (Bottom Section)
Optional expandable section showing recent contest results:

**Section Header**:
- Title: "🕔 Recent Contests & Results"
- Expand/collapse toggle (smooth animation)
- Filter: "Last Week | Last Month | Last 3 Months"

**Table Layout**:
- Glassmorphic table with subtle borders
- JetBrains Mono font
- Sticky header on scroll

**Columns**:
1. **Platform**: Logo + name
2. **Contest Name**: Full title (clickable)
3. **Ended On**: Date + relative time
4. **Participants**: Number with icon
5. **Top Rank**: Winner badge + rating
6. **Your Rank**: (if participated) – highlighted row

**Row Styling**:
- Hover: row glows slightly with platform color
- Clickable: opens contest summary/results
- Participated contests: cyan background tint
- Won contests: gold badge + glow

**Example Rows**:
| Platform | Contest Name | Ended On | Participants | Top Rank |
|----------|--------------|----------|--------------|----------|
| 🟦 Codeforces | Global Round 27 | 10 Nov (3d ago) | 15,234 | 1872 |
| 🟧 LeetCode | Biweekly 145 | 11 Nov (2d ago) | 8,921 | 341 |
| 🟣 CodeChef | Cook-Off 152 | 9 Nov (4d ago) | 5,432 | 2103 |

**Pagination**:
- Shows 10 contests per page
- Glassmorphic page buttons
- Active page: cyan glow
- "Load More" button at bottom (lazy load)

### **Background & Visual Effects**
- **Dark Base**: #0A0F1C (darker than home for terminal feel)
- **Animated Matrix Rain**: Slow-moving cyan code strings (5% opacity)
- **Gradient Edges**: Cyan → Purple radial blend at corners
- **Particle Overlay**: Tiny neon sparks drifting slowly
- **Accent Lighting**: Glow under countdown timers and active cards
- **Circuit Lines**: Subtle animated lines connecting elements
- **Glassmorphism**: All panels have blur 15-20px, transparency 0.12
- **Neon Grid**: Faint grid pattern (cyan/purple, 8% opacity)
- **Floating Orbs**: Large blurred orbs (cyan & purple) with breathing animation

### **Interactions & Animations**

**Hover Effects**:
- **Contest Cards**: Glow intensifies + slight tilt (3deg)
- **Platform Filters**: Gradient flow along border
- **Reminder Button**: Scale 1.05 + purple glow pulse
- **Table Rows**: Platform color glow on left border

**Click Animations**:
- **Add Reminder**: Button pulses, modal smooth pop-up
- **Filter Change**: Cards slide transition with stagger
- **Contest Link**: Ripple effect from click point

**Countdown Animations**:
- **Tick**: Pulse every second (subtle)
- **Approaching Zero**: Faster pulse + color shift
- **Live Transition**: Border flashes green 3x, then steady glow

**Modal Animations**:
- **Open**: Fade in backdrop (0.2s) → scale up modal (0.3s)
- **Close**: Scale down (0.2s) → fade out backdrop (0.2s)

**Reminder Saved**:
- **Success Pulse**: Green wave emanates from button
- **Toast**: Slides in from top-right (0.4s)
- **Icon**: Checkmark appears with bounce

**Platform Badge Hover**:
- **Gradient Flow**: Animated gradient along border (2s loop)

**Contest Start Event**:
- **Live Flash**: Card border flashes green and "Live Now ⚡ " appears
- **Countdown Replaced**: Shows elapsed time or "Ongoing"

### **Responsive Design**
- **Desktop (>1024px)**: 
  - Sidebar widget visible
  - 2-column contest grid
  - Full table layout
- **Tablet (768px-1023px)**:
  - Sidebar widget moves to top horizontal scroll
  - 1-column contest grid
  - Simplified table (scrollable)
- **Mobile (<768px)**:
  - Sidebar becomes dropdown
  - Stack all contest cards
  - Table becomes card list
  - Countdown timer smaller font

### **Data Integration** (Mock)
The page uses mock data but is structured for easy API integration:
- Contest data from Codeforces, LeetCode, CodeChef APIs
- Real-time countdown using JavaScript Date objects
- Reminder storage (localStorage for now, DB later)
- Notification system hooks ready

---

## 💬 Community Page Features

### **CommunityHeader** (Top Navigation)
- **Left Side**:
  - CodeArena logo with gradient (cyan → purple)
  - Clickable to return home
  - Orbitron font
- **Center**:
  - Page title: "💬 Community"
  - Animated gradient line (cyan, pulses)
  - Orbitron font
- **Right Side**:
  - 🔔 Notification Bell (glows with new replies)
  - Pulsing green dot indicator when active
  - "+ Ask Question" button (purple gradient)
  - Profile avatar (small circular with cyan ring)
  - All interactive elements have hover animations (scale + glow)

### **SearchHeroSection** (Hero Search Bar)
Top welcoming section with search functionality:

**Search Bar**:
- Large glassmorphic input field
- 🔍 Magnifying glass icon (cyan glow, left side)
- Placeholder: "Search questions, tags, or users..."
- JetBrains Mono font
- Height: 56px (h-14)
- Background: black/40 with blur
- Border: cyan/30, focus → cyan full
- Animated border glow on hover

**CTA Section** (Below search):
- Text: "Can't find your question?" (white/60%)
- "Ask Question ⚡" button
- Gradient: cyan → light cyan
- Text: black (high contrast)
- Hover: scale 1.05 + intensified shadow
- Shadow: cyan glow (0_0_30px)

**Community Stats**:
- Text: "Over 14,000 discussions and 6,200 active members online."
- JetBrains Mono font
- Numbers highlighted: 
  - "14,000" → cyan
  - "6,200" → green
- Fade-in animation (delay 0.3s)

**Background**:
- Animated gradient wave (cyan → purple)
- Background position animates (0% → 100% → 0%)
- Duration: 10s, infinite loop
- Size: 200% width

### **PostCard** (Discussion Thread Cards)
Each post displayed as a glassmorphic card with full interaction:

**Card Layout** (Horizontal):

**Left Column - Vote Panel**:
- Vertical layout (flex-col)
- Upvote button (🔼 ChevronUp icon)
- Vote count (large, neon green #00FF88)
- Downvote button (🔽 ChevronDown icon)
- Vote buttons: 
  - Size: 32px square
  - Hover: cyan glow + scale 1.1
  - Click: pulse animation
- Comment count: 💬 icon + number
- Tooltip: "Vote if this helped you!"

**Right Column - Main Content**:

**Post Title**:
- Bold JetBrains Mono font
- Cyan text (#00FFFF)
- Underline glow effect
- Hover: intensify glow + slight lift
- Clickable → opens thread detail
- Example: "How to optimize recursive calls in C++?"

**Short Description**:
- JetBrains Mono font
- White/80% opacity
- 2 lines max (truncated)
- Example: "Facing TLE on Codeforces when recursion depth > 10^5..."

**Tags Row**:
- Glowing badge chips
- Different colors per tag:
  - C++ → Orange (#FFB86C)
  - Python → Green (#00FF88)
  - Recursion → Cyan (#00FFFF)
  - Dynamic Programming → Purple (#A259FF)
- Border glow matching color
- Hover: gradient flow animation (2s loop)
- Pill shape, small padding

**User Info Row**:
- Small avatar (24px, cyan ring)
- Username: "@coderx" (white/80%)
- Separator dot: "•"
- Time posted: "2h ago" (white/60%)
- User badge: "Level 8 – Challenger" (small badge)
- Badge colors vary by level:
  - Beginner → Green
  - Challenger → Orange
  - Expert → Purple
  - Legend → Gold

**Footer Action Buttons**:
- 💬 Comment (hover: cyan)
- 🔄 Share (hover: purple)
- 📎 Save (hover: green)
- Icon-only buttons (minimal)
- Hover: icon glows + slight scale
- Tooltips on hover

**Card Styling**:
- Glassmorphic: blur 15px, opacity 0.12
- Border: white/10 default
- Hover: lift up (translateY -4px) + glow intensifies
- Transition: 0.3s ease-in-out
- Border color changes on hover → platform/difficulty color

**Example Post Cards**:
1. **"How to optimize recursive calls in C++?"** (Medium)
   - 54 votes | 14 comments | 2h ago
   - Tags: C++, Recursion, Optimization
   - Author: @coderx (Level 8 Challenger)

2. **"Best approach for dynamic programming problems?"** (Hard)
   - 89 votes | 23 comments | 5h ago
   - Tags: Dynamic Programming, Algorithms, Strategy
   - Author: @sarah_codes (Level 12 Expert)

3. **"Understanding graph traversal algorithms"** (Easy)
   - 32 votes | 8 comments | 1d ago
   - Tags: Graphs, BFS, DFS, Algorithms
   - Author: @newbie_dev (Level 3 Beginner)

### **VotePanel** (Voting Functionality)
Standalone component integrated into PostCard:

**Layout**:
- Vertical flex column
- Center-aligned
- Spacing: 2px gap between elements

**Upvote Button**:
- ChevronUp icon from lucide-react
- Size: w-8 h-8
- Hover: cyan glow (#00FFFF)
- Active state: filled cyan background
- Click animation: scale pop (1 → 1.2 → 1)

**Vote Count Display**:
- Large text (text-xl or text-2xl)
- Neon green color (#00FF88)
- JetBrains Mono font
- Glow effect (text-shadow)
- Animated counter (increments smoothly)

**Downvote Button**:
- ChevronDown icon
- Same styling as upvote
- Hover: red glow (#FF0088)
- Active state: filled red background

**Interaction States**:
- **Neutral**: gray icons, green count
- **Upvoted**: cyan icon + background, count glows brighter
- **Downvoted**: red icon + background, count dims
- **Disabled**: reduced opacity (e.g., own post)

**Vote Animation**:
- When voting: ripple effect emanates from button
- Count changes with smooth transition (0.3s)
- Confetti particles on upvote (optional)

### **SidebarTagPanel** (Popular Tags)
Right sidebar panel showing trending tags:

**Panel Header**:
- Title: "🔥 Trending Tags"
- Orbitron font, white text
- Flame emoji animation (subtle rotation)

**Tag List**:
Each tag shown as:
- **Tag Badge**:
  - Tag name (e.g., "Dynamic Programming")
  - Post count (e.g., "142 posts")
  - Glassmorphic badge with colored border
  - Border color unique per tag (cyan, purple, green, orange, red)
  - JetBrains Mono font

**Tag Colors**:
1. Dynamic Programming → Cyan (#00FFFF)
2. AI → Purple (#A259FF)
3. Python → Green (#00FF88)
4. C++ → Orange (#FFB86C)
5. Graphs → Red (#FF0088)
6. Arrays → Light Cyan (#00D4D4)

**Hover Effects**:
- Tag glows (matching border color)
- Gradient flow animation along border (2s)
- Slight scale increase (1.05)
- Cursor: pointer

**Click Action**:
- Filters main feed to show only posts with that tag
- Tag becomes "active" (filled background)

**Panel Styling**:
- Glassmorphic container
- Border: cyan/20
- Padding: 20px
- Rounded corners: 12px
- Max 6-8 tags visible

### **TopContributorCard** (Leaderboard Cards)
Shows top community contributors:

**Card Layout** (Horizontal):
- **Rank Badge** (Left):
  - Large number: "1", "2", "3"
  - Gradient circle background
  - Colors: 1st (Gold), 2nd (Silver), 3rd (Bronze)
  
- **Avatar** (Left-Center):
  - Circular avatar (40px)
  - Colored ring matching rank
  - Dicebear avatar API
  
- **User Info** (Center):
  - Username: "@meghram_meena"
  - Small badge: "Legend" / "Expert" / "Pro"
  - JetBrains Mono font
  
- **XP Points** (Right):
  - Large number: "1823 XP"
  - ⚡ Lightning bolt icon
  - Cyan color for text
  - Glowing effect

**Hover Effects**:
- Background pulse (subtle)
- Username glows (cyan)
- Avatar ring intensifies
- Slight lift (translateY -2px)

**Example Top Contributors**:
1. **@meghram_meena** – 1823 XP ⚡ (Legend)
2. **@code_warrior** – 1654 XP ⚡ (Expert)
3. **@algo_queen** – 1432 XP ⚡ (Expert)

**Panel Container**:
- Title: "🏆 Top Contributors This Week"
- Glassmorphic background
- Purple border (#A259FF/20)
- Vertical stack of 3 cards
- Space between cards: 12px

### **StatsPanel** (Community Statistics)
Quick metrics panel showing community activity:

**Panel Design**:
- Glassmorphic container
- Cyan border (#00FFFF/20)
- Rounded corners
- Padding: 20px

**Stats Displayed**:
1. **Active Threads**: 
   - Icon: 💬
   - Label: "Active Threads"
   - Value: "324" (large, cyan)
   
2. **Replies Today**: 
   - Icon: 💬
   - Label: "Replies Today"
   - Value: "1.2k" (large, green)
   
3. **Online Users**: 
   - Icon: 🟢
   - Label: "Online Users"
   - Value: "183" (large, green)
   - Pulsing green dot animation

**Stat Item Layout**:
- Flex row or column
- Icon + label above
- Large number below
- Separator lines between stats
- JetBrains Mono for numbers
- White/60% for labels

**Animation**:
- Numbers count up on mount (0 → target)
- Stagger animation (each stat delays 0.1s)
- Pulse effect on online users count

### **Ask Question Modal** (Dialog)
Popup modal for creating new discussion threads:

**Modal Container**:
- Dialog component from shadcn/ui
- Dark background: #0A0F1C
- Border: cyan/30 with glow
- Max width: 640px (2xl)
- Backdrop: blur overlay (dark transparent)
- Fade-in animation (0.3s)

**Modal Header**:
- Title: "⚡ Ask a New Question"
- Orbitron font, white text
- Animated lightning bolt emoji (rotation effect)

**Form Fields**:

1. **Question Title**:
   - Label: "Question Title" (JetBrains Mono)
   - Input field: "Your question title..."
   - Background: black/40
   - Border: cyan/30, focus → cyan
   - Text color: white

2. **Description**:
   - Label: "Description" (JetBrains Mono)
   - Textarea: "Explain your issue or approach..."
   - Min height: 120px
   - Supports markdown/code (future)
   - Same styling as title input

3. **Tags (Multi-select)**:
   - Label: "Tags"
   - Tag options displayed as badges
   - Click to select/deselect
   - Selected tags: cyan background + border
   - Unselected: outline only (white/20)
   - Popular tags shown: 8 options
   - Selected tags shown separately with X button to remove

**AI Assistant Toggle**:
- Switch component (shadcn/ui)
- Purple background panel (#A259FF/10)
- Border: purple/30
- Icon: ✨ Sparkles (purple)
- Label: "Enable AI suggestions for question formatting"
- JetBrains Mono font
- Toggle animates smoothly

**Action Buttons**:
1. **Post Question** (Primary):
   - Gradient: green (#00FF88 → #00D46E)
   - Text: black (high contrast)
   - Full width or flex-1
   - Shadow: green glow (0_0_20px)
   - Hover: scale + intensified glow

2. **Cancel** (Secondary):
   - Outline button
   - Border: white/20
   - Text: white/80
   - Hover: white/5 background

**Modal Animations**:
- **Open**: Backdrop fades in (0.2s) → Modal scales up (0.3s)
- **Close**: Modal scales down (0.2s) → Backdrop fades out (0.2s)
- **Success**: Green pulse + toast notification

### **Floating Action Button (FAB)**
Quick access button fixed at bottom-right:

**Button Design**:
- Circular button: 56px diameter (w-14 h-14)
- Gradient: purple (#A259FF → #9B51E0)
- Icon: ⚡ Lightning emoji (text-2xl)
- Shadow: purple glow (0_0_30px, rgba(162,89,255,0.5))
- Position: fixed, bottom: 32px, right: 32px
- Z-index: 50 (above content)

**Interactions**:
- Hover: scale 1.1 + rotate 5deg
- Click: scale 0.95 + opens Ask Question modal
- Smooth transitions (0.3s ease-in-out)
- Pulse animation when idle (subtle, every 3s)

**Alternative Design** (if 2 FABs):
- "Ask Question" FAB (purple)
- "Join Discussion" FAB (cyan)
- Stacked vertically with 12px gap

### **Background & Visual Effects**
- **Dark Base**: #0A0F1C (terminal atmosphere)
- **Animated Matrix Rain**: 30 columns of binary (0s and 1s)
  - Text: cyan (#00FFFF)
  - Font: JetBrains Mono
  - Opacity: 5% (very subtle)
  - Animation: fall from top to bottom (15-25s per cycle)
  - Stagger start delays (random)
  
- **Neon Grid Pattern**:
  - Cyan horizontal lines (rgba(0, 255, 255, 0.3))
  - Purple vertical lines (rgba(162, 89, 255, 0.3))
  - Grid size: 50px × 50px
  - Opacity: 8%
  
- **Floating Orbs**:
  - **Cyan Orb**: top 25%, left 25%, 384px diameter
    - Blur: 150px
    - Opacity: 10-15% (breathing animation)
    - Scale: 1 → 1.2 → 1 (8s cycle)
  - **Purple Orb**: bottom 25%, right 25%, 384px diameter
    - Blur: 150px
    - Opacity: 15-10% (inverse breathing)
    - Scale: 1.2 → 1 → 1.2 (8s cycle)

- **Glassmorphism**:
  - All panels: blur 15-20px
  - Background opacity: 0.12 (12%)
  - Border: white/10 or colored/20
  - Backdrop filter: blur(15px)

### **Interactions & Animations**

**Post Card Hover**:
- Lift: translateY(-4px)
- Glow: border color intensifies
- Shadow: 0_8px_30px (colored shadow)
- Transition: 0.3s ease-in-out

**Vote Buttons**:
- Hover: scale 1.1 + glow appears
- Click: scale 0.95 → 1.2 → 1 (pop effect)
- Ripple effect emanates from click point

**Tag Chips**:
- Hover: gradient flow along border (2s loop)
- Click: fills background with tag color (20% opacity)

**Ask Question Button**:
- Hover: scale 1.05 + shadow intensifies
- Click: ripple + modal opens

**Search Bar**:
- Focus: border cyan/30 → cyan/100
- Focus: animated glow pulse around border

**Modal Open**:
- Backdrop fades in (0.2s, dark overlay)
- Modal slides down + scales up (0.3s)
- Neon border pulses once on open

**Success Animation** (After posting):
- Green pulse wave from Post button
- Modal scales down + fades out
- Toast notification slides in from top-right
- Icon: ✓ checkmark with bounce

**Loading States**:
- Post cards: skeleton loaders with shimmer effect
- Vote count: pulsing animation during API call
- Tag badges: loading shimmer

### **Responsive Design**

**Desktop (>1024px)**:
- Sidebar visible (320px wide)
- 2-column layout: Feed + Sidebar
- Post cards full width in feed
- All panels visible simultaneously

**Tablet (768px-1023px)**:
- Sidebar moves below feed
- Single column layout
- Stats panel becomes horizontal
- Tags panel shows fewer tags (4-5)
- Top contributors: horizontal scroll

**Mobile (<768px)**:
- Full single column
- Search bar: reduced padding
- Post cards: simplified layout
- Vote panel: smaller icons
- Sidebar panels: collapsible accordions
- FAB: smaller (48px diameter)
- Ask Question modal: full screen

### **Data Structure** (Mock)

**Post Interface**:
```typescript
interface Post {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    username: string;
    avatar: string;
    level: string;
    badge: string;
  };
  timeAgo: string;
  votes: number;
  comments: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
```

**Features Ready for Backend**:
- Voting system (upvote/downvote)
- Comment posting and replies
- Tag filtering
- Search functionality
- User authentication
- Real-time updates (notifications)
- XP/reputation system

---

## 🎨 Color System

| Element | Color | Usage |
|---------|-------|-------|
| **Primary** | `#00FFFF` (Cyan) | Main accents, User 1, primary buttons |
| **Secondary** | `#FF00FF` (Magenta) | User 2, AI panel, highlights |
| **Success** | `#00FF88` (Green) | Success states, running code |
| **Error** | `#FF0088` (Red) | Errors, warnings, low time |
| **Background** | `#0D0D0D` | Main dark background |
| **Editor BG** | `#0A0F1C` | Code editor background |

---

## 📦 Key Dependencies

```typescript
// Animation
import { motion } from 'motion/react';

// Icons
import { ... } from 'lucide-react';

// UI Components
import { Button, Badge, Avatar, ... } from './components/ui/...';

// Images
import { ImageWithFallback } from './components/figma/ImageWithFallback';
```

---

## 🎯 File Purposes

### **Core Files**
| File | Purpose |
|------|---------|
| `App.tsx` | Main router - switches between Home and Arena |
| `globals.css` | Dark theme, neon effects, animations |

### **Home Components (8 files)**
All handle landing page sections with marketing content

### **Arena Components (6 files)**
All handle the live coding arena interface

### **UI Components (42 files)**
Reusable Shadcn components used across both pages

---

## 🔥 Interactive Features

### **Home Page**
- ✨ Animated neon rain effects
- 🌍 Live activity map
- 💬 Community feed
- 🏆 Contest cards
- 🤖 AI feature showcase

### **Arena Page**
- ⏱️ Live countdown timer with +5 min bonus
- 💻 Split-screen code editors
- 🤖 Real-time AI hints
- 💬 Live chat with typing indicators
- ▶️ Code execution with animations
- 📊 Session stats
- 🎨 Matrix code rain background

### **Community Page**
- 🔍 Advanced search with filters
- 📝 Post discussion threads
- ⬆️⬇️ Upvote/downvote system
- 💬 Comments and replies
- 🏷️ Tag filtering
- 🏆 Contributor leaderboard
- 📊 Live community stats
- ⚡ Floating action buttons
- 🎨 Matrix background + neon grid

---

## 📱 Responsive Design
- Desktop: Full split-screen layout
- Tablet: Stacked editors with collapsible sidebars
- Mobile: Single editor view with tab switching

---

## 🚀 Getting Started

### **View in Figma Make**
The app is already running in the preview pane!

### **Run Locally**
```bash
# Clone and install
npm create vite@latest codearena -- --template react-ts
cd codearena
npm install

# Install dependencies
npm install motion lucide-react
npm install tailwindcss@next @tailwindcss/vite@next

# Copy all files from Figma Make
# Run dev server
npm run dev
```

---

## 🎨 Design System
- **Font**: JetBrains Mono (monospace for code/terminal feel)
- **Animations**: Motion (Framer Motion)
- **Styling**: Tailwind CSS v4
- **Components**: Shadcn UI
- **Icons**: Lucide React

---

**Total Files Created**: 51 new components + 1 updated App.tsx
**Total Lines of Code**: ~12,000+
**Pages**: 7 (Home + Arena + Match + Question Bank + Profile + Announcements + Community)

---

✨ **CodeArena is ready to code!** ✨
