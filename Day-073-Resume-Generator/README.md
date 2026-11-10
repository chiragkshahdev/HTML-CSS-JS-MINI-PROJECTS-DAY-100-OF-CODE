# Day-73 - Resume Generator

Form bharo -> Live Resume Preview -> Print / PDF Download.

## Features
- ✍️ 3-Step Form - Personal / Work & Skills / Design
- 👁️ Live Preview - Type karte hi resume update hota hai
- 🎨 4 Templates - Modern Blue, Classic Black, Creative Pink, Minimal Green
- 🔤 Font Size Control - Small / Medium / Large
- ✅ Toggle Sections - Photo, Projects, Skills show/hide
- ⚡ Quick Skill Add Buttons - + HTML, CSS, JS...
- 📊 Completion Progress Bar - Kitna % resume complete hai
- ✨ Load Sample Resume - 1 click me full sample data
- 🗑️ Clear All
- 💾 Auto-Save in localStorage - Refresh par bhi data rahega
- 🖨️ Print / Save as PDF - Browser Print se PDF download
- 📱 Fully Responsive

## Tech Stack
- HTML5 - Form + Resume Preview
- CSS3 - Resume Templates, Print Styles
- Vanilla JavaScript - Live Binding, State, localStorage

## File Structure
Day-073-Resume-Generator/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click "Load Sample" to see demo resume
4. Edit your details - Preview live update hoga
5. Choose Template in Step 3
6. Click Print / PDF -> Destination: Save as PDF

## How to Download as PDF
1. Click "Print / PDF" button
2. Print dialog me Destination = "Save as PDF"
3. Save button click karo - Resume PDF download ho jayega

## Logic Explained
- Every input has `input` event -> `updatePreview()` runs
- `updatePreview()` reads all fields and updates preview DOM
- Completion = `filledFields / totalFields * 100`
- All data saved in `localStorage` key: `resume_day73`
- Print CSS hides form + navbar, only resume prints

## Future Improvements
- Add Photo Upload (real photo)
- Add More Templates + Colors
- Add ATS Score Checker
- Add Download as DOCX

---
Built as part of 100 Days of Code Challenge - Day 73