import chalk from "chalk";
import ProgressBar from "progress";

console.log(chalk.yellow('hi!'));

const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);
