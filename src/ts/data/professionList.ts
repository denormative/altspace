import { Profession } from '../Character'

const  professionList: Profession[] = [
  {
    name: 'Combat Spec',
    specialBenefits: {
      actionCheckScoreIncrease: +3
    }
  },
  {
    name: 'Diplomat',
    specialBenefits: {
      actionCheckScoreIncrease: +1
    }
  },
  {
    name: 'Free Agent',
    specialBenefits: {
      actionCheckScoreIncrease: +2
    }
  },
  {
    name: 'Tech Op',
    specialBenefits: {
      actionCheckScoreIncrease: +1
    }
  },
  {
    name: 'Mindwalker',
    specialBenefits: {
      actionCheckScoreIncrease: +1
    }
  }
];

export { professionList }
