import confetti from 'canvas-confetti';

const PANDA_COLORS = ['#005A2B', '#E34F26', '#F59E0B', '#10B981', '#FFFFFF'];

/**
 * Fires a joyful burst of confetti with Panda brand colors
 */
export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: PANDA_COLORS,
      ticks: 200,
      gravity: 1.1,
      scalar: 1.1,
    });
  } catch (err) {
    console.error('Confetti error:', err);
  }
};

/**
 * Fires a two-sided celebration blast (fireworks effect)
 */
export const triggerCelebration = () => {
  try {
    const end = Date.now() + 1.8 * 1000;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: PANDA_COLORS,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: PANDA_COLORS,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  } catch (err) {
    console.error('Celebration confetti error:', err);
  }
};

/**
 * Star burst effect for record-breaking scores
 */
export const triggerStarBurst = () => {
  try {
    confetti({
      particleCount: 50,
      spread: 360,
      ticks: 120,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#FBBF24', '#005A2B', '#E34F26'],
      shapes: ['star', 'circle'],
    });
  } catch (err) {
    console.error('Star burst error:', err);
  }
};
