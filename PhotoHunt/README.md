# PhotoHunt Game

A browser-based PhotoHunt game inspired by the Megatouch PhotoHunt. Find 7 differences between two nearly identical images within 60 seconds per round!

## Features

- **Multiple Rounds**: Play through several rounds with different image pairs
- **Time-based Scoring**: Higher points for finding differences quickly
  - 0-10 seconds: 6 points per difference
  - 10-20 seconds: 5 points per difference
  - 20-30 seconds: 4 points per difference
  - 30-40 seconds: 3 points per difference
  - 40-50 seconds: 2 points per difference
  - 50-60 seconds: 1 point per difference
- **Visual Feedback**: Green circles appear when you find differences
- **Answer Key**: Red circles show unfound differences when time runs out
- **Progress Tracking**: Real-time score and round progress display
- **Responsive Design**: Works on desktop and mobile devices

## Setup

### Required Files

You need to provide image pairs for each round. For each round defined in `game-config.json`, you need:

- `{name}_orig.jpg` - The original image
- `{name}_mod.jpg` - The modified image with 7 differences

For example, if your config has a round with `"image": "sample1"`, you need:
- `sample1_orig.jpg`
- `sample1_mod.jpg`

### File Structure
```
PhotoHunt/
├── index.html          # Main game file
├── style.css           # Game styling
├── script.js           # Game logic
├── game-config.json    # Game configuration
├── sample1_orig.jpg    # Original image for round 1
├── sample1_mod.jpg     # Modified image for round 1
├── sample2_orig.jpg    # Original image for round 2
├── sample2_mod.jpg     # Modified image for round 2
└── ...                 # Additional image pairs
```

### Configuration

Edit `game-config.json` to add or modify rounds:

```json
{
  "Game": {
    "Rounds": [
      {
        "image": "sample1",
        "coords": [
          {
            "x": 150,    // X coordinate of difference center
            "y": 200,    // Y coordinate of difference center
            "radius": 25 // Click detection radius in pixels
          }
          // ... 6 more coordinates for 7 total differences
        ]
      }
      // ... more rounds
    ]
  }
}
```

#### Finding Coordinates

To find the x, y coordinates for differences:
1. Open your modified image in an image editor
2. Note the pixel coordinates of each difference
3. Set appropriate radius values (20-35 pixels work well)
4. Coordinates are relative to the original image dimensions

## How to Play

1. Open `index.html` in a web browser
2. Click "Start Game" to begin
3. Look at both images side by side
4. Click on differences you spot in either image
5. Find all 7 differences before time runs out
6. Complete all rounds to see your final score

## Game Controls

- **Start Game**: Begin a new game
- **Reset Game**: Reset all progress and return to start screen
- **Next Round**: Proceed to the next round after completing current one
- **Play Again**: Start over after completing all rounds

## Technical Details

- **Browser Compatibility**: Works in all modern browsers
- **No Server Required**: Entirely client-side HTML/CSS/JavaScript
- **Responsive**: Adapts to different screen sizes
- **Touch Friendly**: Works on touch devices

## Customization

### Adding New Rounds
1. Create new image pairs following the naming convention
2. Add a new round object to `game-config.json`
3. Define the 7 difference coordinates

### Styling
Modify `style.css` to customize:
- Colors and themes
- Layout and sizing
- Animations and effects

### Game Logic
Edit `script.js` to customize:
- Scoring system
- Timer duration
- Number of differences per round
- Game flow and mechanics

## Tips for Creating Good PhotoHunt Images

1. **High Contrast**: Make differences noticeable but not obvious
2. **Appropriate Size**: Images work best at 500-800px width
3. **Clear Differences**: Avoid tiny or hard-to-see modifications
4. **Varied Types**: Mix color changes, added/removed objects, shape changes
5. **Testing**: Play through your rounds to ensure difficulty is appropriate

Enjoy your PhotoHunt game! 