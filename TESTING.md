# Portfolio Testing Checklist

## ✅ Desktop Testing (1920x1080)

### Header/Navigation
- [ ] Brand logo and name visible
- [ ] All navigation links displayed horizontally
- [ ] Theme toggle button works (click 🌓)
- [ ] Resume download button works
- [ ] Hover effects on nav links

### Hero Section
- [ ] Profile card visible on right side
- [ ] Typing animation works on name
- [ ] Stats counters animate on scroll
- [ ] Gradient background visible
- [ ] 3D shapes visible (if not on mobile)

### Skills Section
- [ ] 3-column grid layout
- [ ] All 6 skill cards visible
- [ ] Hover tilt effect works
- [ ] Skill tags displayed properly

### Projects Section
- [ ] 3-column grid layout
- [ ] All 5 project cards visible
- [ ] Hover effects work
- [ ] Tech stack tags visible

### Experience Section
- [ ] Card layout displays properly
- [ ] All achievements listed
- [ ] Tech badges visible

### Certifications Section
- [ ] All 4 certifications visible
- [ ] Icons display correctly

### Education Section
- [ ] Education card displays properly

### Contact Section
- [ ] Contact info visible
- [ ] Form fields work
- [ ] Submit button visible

### Footer
- [ ] Links visible
- [ ] Social icons visible
- [ ] Copyright text correct

---

## 📱 Mobile Testing (375px width)

### How to Test
1. Press F12 to open DevTools
2. Click device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar

### Header
- [ ] Hamburger menu icon (☰) visible
- [ ] Brand name/pic visible
- [ ] Click hamburger - menu opens
- [ ] Menu links work
- [ ] Click hamburger again - menu closes

### Hero Section
- [ ] Profile card shows FIRST (top)
- [ ] Content stacked vertically
- [ ] Buttons stacked vertically
- [ ] Stats row visible (3 items)
- [ ] Text readable size

### Skills Section
- [ ] Single column layout
- [ ] All cards stack vertically

### Projects Section
- [ ] Single column layout
- [ ] Full-width cards

### Experience Section
- [ ] Content stacks properly
- [ ] Text readable
- [ ] No horizontal overflow

### Contact Section
- [ ] Form fields full width
- [ ] No horizontal overflow

---

## 🌓 Theme Testing

### Dark Theme (Default)
- [ ] Dark background (#0a0f1a)
- [ ] Purple/blue gradient blobs visible
- [ ] Text is light colored
- [ ] Cards have glass effect

### Light Theme (Click toggle)
- [ ] Light background (#f8fafc)
- [ ] Softer pastel gradient blobs visible
- [ ] Text is dark colored
- [ ] Header is white/transparent
- [ ] Hamburger icon is dark (visible)

---

## ⚡ Performance Testing

### Load Time
- [ ] Page loads within 3 seconds
- [ ] No console errors (Press F12 → Console)

### Animations
- [ ] Smooth scroll between sections
- [ ] Reveal animations work on scroll
- [ ] No lag on mobile

---

## 🔗 Link Testing

- [ ] All nav links scroll to correct sections
- [ ] Resume download works
- [ ] GitHub link works
- [ ] LinkedIn link works
- [ ] Email link opens mail client

---

## ✅ Final Checks Before GitHub

1. All sections display correctly
2. Both themes work
3. Mobile responsive layout works
4. No console errors
5. resume.pdf file exists (or remove link)
6. profile.svg displays correctly

---

## Ready for GitHub! 🚀

```bash
cd "d:\personal vp\my portfolio"
git init
git add .
git commit -m "Portfolio website with Bootstrap responsive design"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```
