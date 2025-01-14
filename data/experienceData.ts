interface WeekData {
  experience: number;
}

interface MonthData {
  [weekKey: string]: {
    experience: number;
  };
}

interface YearData {
  [month: string]: MonthData;
}

interface ExperienceData {
  week: {
    [year: number]: YearData;
  };
}

const experienceData: ExperienceData = {
  week: {
    2023: {
      January: {
        Week1: { experience: 10 },
        Week2: { experience: 35 },
        Week3: { experience: 45 },
        Week4: { experience: 20 },
        Week5: { experience: 45 },
      },
      February: {
        Week6: { experience: 30 },
        Week7: { experience: 40 },
        Week8: { experience: 0 },
        Week9: { experience: 35 },
      },
      March: {
        Week10: { experience: 45 },
        Week11: { experience: 25 },
        Week12: { experience: 35 },
        Week13: { experience: 40 },
      },
      April: {
        Week14: { experience: 50 },
        Week15: { experience: 60 },
        Week16: { experience: 30 },
        Week17: { experience: 0 },
      },
      May: {
        Week18: { experience: 55 },
        Week19: { experience: 45 },
        Week20: { experience: 35 },
        Week21: { experience: 50 },
      },
      June: {
        Week22: { experience: 40 },
        Week23: { experience: 0 },
        Week24: { experience: 25 },
        Week25: { experience: 35 },
      },
      July: {
        Week26: { experience: 20 },
        Week27: { experience: 45 },
        Week28: { experience: 55 },
        Week29: { experience: 30 },
        Week30: { experience: 45 },
      },
      August: {
        Week31: { experience: 40 },
        Week32: { experience: 30 },
        Week33: { experience: 0 },
        Week34: { experience: 25 },
      },
      September: {
        Week35: { experience: 35 },
        Week36: { experience: 25 },
        Week37: { experience: 45 },
        Week38: { experience: 40 },
      },
      October: {
        Week39: { experience: 50 },
        Week40: { experience: 60 },
        Week41: { experience: 0 },
        Week42: { experience: 45 },
        Week43: { experience: 45 },
      },
      November: {
        Week44: { experience: 35 },
        Week45: { experience: 25 },
        Week46: { experience: 40 },
        Week47: { experience: 30 },
      },
      December: {
        Week48: { experience: 45 },
        Week49: { experience: 55 },
        Week50: { experience: 50 },
        Week51: { experience: 0 },
        Week52: { experience: 40 },
      },
    },
    2024: {
      January: {
        Week1: { experience: 0 },
        Week2: { experience: 35 },
        Week3: { experience: 45 },
        Week4: { experience: 20 },
        Week5: { experience: 45 },
      },
      February: {
        Week6: { experience: 30 },
        Week7: { experience: 40 },
        Week8: { experience: 0 },
        Week9: { experience: 35 },
      },
      March: {
        Week10: { experience: 45 },
        Week11: { experience: 25 },
        Week12: { experience: 35 },
        Week13: { experience: 40 },
      },
      April: {
        Week14: { experience: 50 },
        Week15: { experience: 60 },
        Week16: { experience: 30 },
        Week17: { experience: 0 },
      },
      May: {
        Week18: { experience: 55 },
        Week19: { experience: 45 },
        Week20: { experience: 35 },
        Week21: { experience: 50 },
      },
      June: {
        Week22: { experience: 40 },
        Week23: { experience: 0 },
        Week24: { experience: 25 },
        Week25: { experience: 35 },
      },
      July: {
        Week26: { experience: 20 },
        Week27: { experience: 45 },
        Week28: { experience: 55 },
        Week29: { experience: 30 },
        Week30: { experience: 45 },
      },
      August: {
        Week31: { experience: 40 },
        Week32: { experience: 30 },
        Week33: { experience: 0 },
        Week34: { experience: 25 },
      },
      September: {
        Week35: { experience: 35 },
        Week36: { experience: 25 },
        Week37: { experience: 45 },
        Week38: { experience: 40 },
      },
      October: {
        Week39: { experience: 50 },
        Week40: { experience: 60 },
        Week41: { experience: 0 },
        Week42: { experience: 45 },
        Week43: { experience: 45 },
      },
      November: {
        Week44: { experience: 35 },
        Week45: { experience: 25 },
        Week46: { experience: 40 },
        Week47: { experience: 30 },
      },
      December: {
        Week48: { experience: 45 },
        Week49: { experience: 55 },
        Week50: { experience: 50 },
        Week51: { experience: 0 },
        Week52: { experience: 40 },
      },
    },
    2025: {
      January: {
        Week1: { experience: 20 },
        Week2: { experience: 35 },
        Week3: { experience: 45 },
        Week4: { experience: 20 },
        Week5: { experience: 45 },
      },
      February: {
        Week6: { experience: 30 },
        Week7: { experience: 40 },
        Week8: { experience: 0 },
        Week9: { experience: 35 },
      },
      March: {
        Week10: { experience: 45 },
        Week11: { experience: 25 },
        Week12: { experience: 35 },
        Week13: { experience: 40 },
      },
      April: {
        Week14: { experience: 50 },
        Week15: { experience: 60 },
        Week16: { experience: 30 },
        Week17: { experience: 0 },
      },
      May: {
        Week18: { experience: 55 },
        Week19: { experience: 45 },
        Week20: { experience: 35 },
        Week21: { experience: 50 },
      },
      June: {
        Week22: { experience: 40 },
        Week23: { experience: 0 },
        Week24: { experience: 25 },
        Week25: { experience: 35 },
      },
      July: {
        Week26: { experience: 20 },
        Week27: { experience: 45 },
        Week28: { experience: 55 },
        Week29: { experience: 30 },
        Week30: { experience: 45 },
      },
      August: {
        Week31: { experience: 40 },
        Week32: { experience: 30 },
        Week33: { experience: 0 },
        Week34: { experience: 25 },
      },
      September: {
        Week35: { experience: 35 },
        Week36: { experience: 25 },
        Week37: { experience: 45 },
        Week38: { experience: 40 },
      },
      October: {
        Week39: { experience: 50 },
        Week40: { experience: 60 },
        Week41: { experience: 0 },
        Week42: { experience: 45 },
        Week43: { experience: 45 },
      },
      November: {
        Week44: { experience: 35 },
        Week45: { experience: 25 },
        Week46: { experience: 40 },
        Week47: { experience: 30 },
      },
      December: {
        Week48: { experience: 45 },
        Week49: { experience: 55 },
        Week50: { experience: 50 },
        Week51: { experience: 0 },
        Week52: { experience: 40 },
      },
    },
  },
};

export default experienceData;