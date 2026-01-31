const { calculateDetailedAge, nextBirthdayCountdown, calculateLifeProgress } = require('./src/core/logic/ageCalculator.ts');

// Mock console.log to print to stdout
const log = console.log;

try {
    const birthDate = new Date('1990-05-15T09:30:00');
    log('Birth Date:', birthDate);

    const age = calculateDetailedAge(birthDate);
    log('Age:', age);

    const countdown = nextBirthdayCountdown(birthDate);
    log('Countdown:', countdown);

    const lifeProgress = calculateLifeProgress(birthDate);
    log('Life Progress:', lifeProgress, '%');

    // Test Leap Year
    const leapBaby = new Date('2000-02-29T10:00:00');
    log('Leap Baby Age:', calculateDetailedAge(leapBaby));

} catch (e) {
    console.error(e);
}
