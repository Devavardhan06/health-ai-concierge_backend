# 🤝 Contributing to AI Healthcare Concierge Frontend

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/ai-healthcare-concierge.git
   cd ai-healthcare-concierge/health-ai-concierge_frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### **Code Style**
- Use functional components with hooks
- Follow ES6+ JavaScript standards
- Use descriptive variable and function names
- Keep components small and focused
- Add comments for complex logic

### **File Structure**
```
src/
├── components/     # Reusable UI components
├── pages/         # Route-level components
├── services/      # API and external services
├── styles/        # CSS files
├── utils/         # Helper functions
└── hooks/         # Custom React hooks
```

### **Naming Conventions**
- **Components**: PascalCase (`ChatBubble.jsx`)
- **Files**: camelCase (`apiClient.js`)
- **CSS Classes**: kebab-case (`chat-bubble`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🎨 UI/UX Guidelines

### **Design Principles**
- **Healthcare-focused**: Professional, clean, trustworthy
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile-first**: Responsive design
- **Performance**: Fast loading, smooth interactions

### **Color Palette**
```css
--primary: #007bff;      /* Healthcare blue */
--secondary: #6c757d;    /* Professional gray */
--success: #28a745;      /* Success green */
--warning: #ffc107;      /* Warning yellow */
--error: #dc3545;        /* Error red */
--background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### **Typography**
- **Font Stack**: System fonts for performance
- **Headings**: 600 weight, appropriate hierarchy
- **Body**: 400 weight, 1.4 line height
- **Accessibility**: Minimum 16px font size

## 🧪 Testing

### **Manual Testing**
- Test all user flows
- Check responsive design
- Verify accessibility
- Test error states
- Validate form inputs

### **Browser Support**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📝 Pull Request Process

### **Before Submitting**
1. **Test thoroughly** - All features work
2. **Check responsiveness** - Mobile, tablet, desktop
3. **Verify accessibility** - Screen reader friendly
4. **Update documentation** - If needed

### **PR Guidelines**
1. **Clear title** - Describe what you changed
2. **Detailed description** - Explain why and how
3. **Screenshots** - For UI changes
4. **Link issues** - Reference related issues

### **PR Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] UI improvement
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested with backend
- [ ] Accessibility checked

## Screenshots
(If applicable)
```

## 🐛 Bug Reports

### **Bug Report Template**
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 91
- OS: Windows 10
- Screen size: 1920x1080
```

## 💡 Feature Requests

### **Feature Request Template**
```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives Considered
Other ways to solve this

## Additional Context
Screenshots, mockups, etc.
```

## 🔧 Development Tips

### **Useful Commands**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code style
```

### **Debugging**
- Use React Developer Tools
- Check browser console
- Use network tab for API issues
- Test with different screen sizes

### **Performance**
- Optimize images (WebP format)
- Lazy load components when possible
- Minimize bundle size
- Use React.memo for expensive components

## 📚 Resources

### **Learning Resources**
- [React Documentation](https://reactjs.org/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Healthcare UI Patterns](https://www.healthcareuxdesign.com/)

### **Tools**
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)

## 🎯 Contribution Areas

### **High Priority**
- Bug fixes
- Accessibility improvements
- Performance optimizations
- Mobile responsiveness

### **Medium Priority**
- New features
- UI enhancements
- Documentation improvements
- Testing additions

### **Low Priority**
- Code refactoring
- Style improvements
- Developer experience

## 📞 Getting Help

- **Questions**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Real-time help**: Check project Discord/Slack

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Invited to maintainer team (for significant contributions)

---

**Thank you for contributing to healthcare technology! 🏥❤️**