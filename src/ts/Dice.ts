export class Dice {
  static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  private static toInt(val: string) {
    return parseInt(val, 10);
  };

  static parseRoll(roll: string): {prefix: string, value: number} {
    let prefix = '';
    const split_prefix = roll.match(/^([-+/*><])(.*)$/);

    if (split_prefix !== null) {
      prefix = split_prefix[1];
      roll = split_prefix[2];
    }

    const parts = roll.split(/d/);
    let sum = 0;

    if (parts.length !== 1) {
      const limit = Dice.toInt(parts[1]);
      for (let i = Dice.toInt(parts[0]) - 1; i >= 0; i--) {
        sum += Dice.getRandomInt(1, limit);
      }
    } else {
      sum = Dice.toInt(parts[0]);
    }
    return {
      prefix: prefix,
      value: sum
    };
  };

  static rollDices(spec: string) {
    return spec.replace(/[^-+/*><0-9d]+/g, '')
      .split(/(?=[-+><])/)
      .map(function (str) {
        return str.split(/(?=[\/*])/)
          .map(Dice.parseRoll)
          .reduce((a, b): { prefix: string, value: number } => {
            switch (b.prefix) {
              case '*':
                return {
                  prefix: a.prefix,
                  value: a.value * b.value
                };
              case '/':
                return {
                  prefix: a.prefix,
                  value: Math.floor(a.value / b.value)
                };
              default:
                return { prefix: a.prefix, value: -1 }; // can't happen
            }
          });
      })
      .reduce((a, b): { prefix: string, value: number } => {
        switch (b.prefix) {
          case '+':
            return { prefix: '', value: a.value + b.value };
          case '-':
            return { prefix: '', value: a.value - b.value };
          case '>':
            return { prefix: '', value: (a.value > b.value) ? a.value : b.value };
          case '<':
            return { prefix: '', value: (a.value < b.value) ? a.value : b.value };
          default:
            return { prefix: '', value: 0 }; // can't happen
        }
      })
      .value;
  };
  static d20() {
    return Dice.getRandomInt(1, 20);
  }
  static roll(spec: string) {
    return Dice.rollDices(spec);
  }
};
