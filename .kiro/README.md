# .kiro Folder

This folder contains Kiro IDE configuration and project specifications.

## Structure

```
.kiro/
├── specs/                    # Project specifications
│   └── todo-life-dashboard.spec.md  # Main project spec
└── README.md                # This file
```

## Purpose

The `.kiro` folder is used for:
1. **Project Specifications** - Detailed documentation of project requirements
2. **Kiro Configuration** - IDE settings and workflows
3. **Agent Hooks** - Automation scripts for development tasks
4. **Steering Files** - Context and instructions for AI agents

## Project Specification

The main specification file (`specs/todo-life-dashboard.spec.md`) contains:

### Project Overview
- **Name**: To-Do List Life Dashboard
- **Type**: Frontend Web Application
- **Tech Stack**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser Local Storage
- **Deployment**: Static files only

### Features Implemented
1. **MVP Features**:
   - Real-time greeting with clock and date
   - 25-minute Pomodoro timer (Start/Stop/Reset)
   - Full-featured To-Do List (CRUD operations)
   - Quick Links management

2. **Challenge Features**:
   - Light/Dark mode toggle
   - Custom user name in greeting
   - Duplicate task prevention

### Technical Details
- **File Structure**: Strictly 1 HTML, 1 CSS, 1 JS file
- **No Dependencies**: Pure Vanilla JavaScript
- **Responsive Design**: Mobile-first CSS Grid/Flexbox
- **Browser Support**: Chrome, Firefox, Safari, Edge

## Git Integration

This folder should be committed to Git for:
- **Team Collaboration**: Share project specifications
- **Documentation**: Maintain project requirements
- **Onboarding**: Help new developers understand the project
- **AI Assistance**: Provide context for Kiro agents

## Notes for Developers

1. **Spec Updates**: Update the specification file when adding new features
2. **Configuration**: Add Kiro-specific configs as needed
3. **Hooks**: Create automation hooks for repetitive tasks
4. **Steering**: Add context files for AI-assisted development

## Related Files

- `index.html` - Main application file
- `css/style.css` - All styles
- `js/script.js` - All JavaScript code
- `README.md` - Main project documentation