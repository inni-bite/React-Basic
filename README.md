# Coffee Explorer

An interactive web application that showcases the unique characteristics of coffee beans from around the world. Users can explore different beans through a visual and auditory experience, learning about flavor profiles, aromas, and brewing methods.

## Features

- Interactive coffee machine interface with animations and sound effects
- Detailed information about various coffee beans including origin, roast level, and flavor profile
- Visualization of coffee characteristics through intuitive UI components
- Filtering options to discover beans by roast level
- Responsive design for desktop and mobile devices

## Tech Stack

- React 18+
- TypeScript
- Vite
- SCSS for styling
- Jotai for state management
- Howler.js for audio playback
- Framer Motion for animations

## Project Structure

```
coffee-explorer/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── sounds/
│   │   └── styles/
│   ├── components/
│   │   ├── CoffeeMachine/
│   │   ├── CoffeeDetails/
│   │   └── CoffeeSelector/
│   ├── data/
│   │   └── coffeeData.ts
│   ├── jotai/
│   │   └── atoms/
│   │       └── coffeeAtoms.ts
│   ├── utilities/
│   │   └── soundManager.ts
│   ├── App.tsx
│   └── main.tsx
└── ...
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Audio Files

The application uses the following audio files (to be added to the assets/sounds directory):
- `grinding.mp3` - Sound of coffee beans being ground
- `pour.mp3` - Sound of coffee being poured

## Next Steps

- Add more coffee beans to the database
- Implement user preferences and favorites
- Add brewing guides and tutorials
- Create a coffee recommendation system based on flavor preferences
- Enhance animations and interactive elements