# Day 46 - Drag & Drop Kanban Board 📋

A Trello-like Kanban board with native HTML5 Drag & Drop API.

## Features
- 3 Columns: To Do / In Progress / Done
- Drag & Drop tasks between columns
- Add / Delete tasks
- Task title + description
- Task counter per column
- LocalStorage persistence
- Responsive + Smooth animations
- Modal for adding tasks

## Tech Stack
- HTML5 Drag & Drop API
- CSS Flexbox
- Vanilla JavaScript
- LocalStorage

## How Drag & Drop Works
1. `draggable="true"` on task
2. `dragstart` -> store task id + source column in dataTransfer
3. `dragover` -> preventDefault + highlight
4. `drop` -> move task from source array to target array
5. Re-render + save to localStorage

## How to Run
Open `index.html` in browser. No build needed.

## Enhancements Ideas
- Edit task on click
- Add priority colors
- Due dates
- Search filter

## Day 46 of 100 Days of Code