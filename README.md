# To-Do List Life Dashboard

A comprehensive, responsive web dashboard for productivity management with Pomodoro timer, to-do list, quick links, and customizable features.

## Features

### MVP Features
1. **Real-time Greeting**
   - Displays current time and date
   - Dynamic greeting (Good Morning/Afternoon/Evening)
   - Customizable user name

2. **Focus Timer (Pomodoro)**
   - 25-minute countdown timer
   - Start, Stop, and Reset controls
   - Timer status indicators
   - Audio notification on completion

3. **To-Do List**
   - Add, edit, complete, and delete tasks
   - Task filtering (All/Active/Completed)
   - Duplicate task prevention
   - Task statistics display

4. **Quick Links**
   - Save frequently used web links
   - Open links in new tab
   - Link icons from website favicons
   - Duplicate URL prevention

### Challenge Features
1. **Light/Dark Mode Toggle**
   - Theme persistence across sessions
   - Smooth transitions

2. **Custom Name Greeting**
   - Personalize dashboard with user name
   - Name saved in local storage

3. **Duplicate Task Prevention**
   - Prevents adding duplicate tasks
   - Case-insensitive comparison

## Technology Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser Local Storage
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Poppins, Roboto)
- **Responsive**: CSS Grid & Flexbox
- **No Dependencies**: No frameworks, no npm, no build tools

## File Structure
```
project/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All CSS styles
├── js/
│   └── script.js      # All JavaScript code
└── README.md          # This file
```

## How to Run
1. Open `index.html` in any modern web browser
2. No installation or server required
3. All data is saved locally in your browser

## Browser Compatibility
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Features in Detail

### Greeting System
- Updates time every second
- Shows full date (Monday, October 16, 2026)
- Personal greeting with saved name
- Time-based greeting messages

### Pomodoro Timer
- 25-minute focus sessions
- Visual timer display
- Status indicators (Ready, Focusing, Paused, Time's up)
- Audio alert on completion

### To-Do Management
- Add tasks with Enter key or button
- Mark tasks as complete/incomplete
- Edit existing tasks
- Delete individual tasks
- Clear all completed tasks
- Task count statistics

### Quick Links
- Add name and URL pairs
- Auto-detects favicon
- Opens in new tab
- Remove unwanted links

### Theme System
- Light and dark themes
- Theme persists across sessions
- Toggle with moon/sun icon
- Smooth theme transitions

### Data Persistence
- All data saved in browser Local Storage
- Persists across browser sessions
- No backend required
- Private to your browser

## Responsive Design
- Mobile-first approach
- Responsive grid layout
- Adjusts for all screen sizes
- Touch-friendly buttons

## Development Notes
- Pure Vanilla JavaScript (no frameworks)
- Modular code structure
- ES6+ features
- Error handling for localStorage
- Accessible HTML structure

## License
MIT License - Free to use and modify