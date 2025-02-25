import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const CycleProgress = () => {
  const percentage = 80; // Set to 80% 

  return (
    <div style={{ width: 70, height: 70, position: 'relative' }}> 
      <CircularProgressbar 
        value={percentage} 
        text={`${percentage}%`} 
        styles={buildStyles({
          textColor: "#000",        // Black text for better contrast
          pathColor: "#4CAF50",     // Green for the progress (80%)
          trailColor: "#fff",       // White for the remaining portion (20%)
          textSize: '24px',         // Slightly larger text for better visibility
          pathTransitionDuration: 0.5, // Smooth transition effect
        })}
      />
    </div>
  );
};
