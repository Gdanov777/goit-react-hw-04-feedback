import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Statistiks } from './Statistiks/Statistiks';
import { Section } from './Section/Section';
import { Notification } from './Notifikation/Notifikation';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // const handleIncrement = option => {
  //   this.setState(prevState => {
  //     return { [option]: prevState[option] + 1 };
  //   });
  // };

  const handleIncrement = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + bad + neutral;
  };

  const total = countTotalFeedback();

  const countPositiveFeedbackPercentage = () => {
    return ((good / total) * 100).toFixed(0);
  };

  const stateNames = Object.keys({ good, bad, neutral });

  return (
    <div>
      <GlobalStyle />
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={stateNames}
          onLeaveFeedback={handleIncrement}
        />
      </Section>
      {total === 0 ? (
        <Notification message="No feedback given" />
      ) : (
        <Section title="Statistics">
          <Statistiks
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback(total)}
            positivFeedback={good && countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </div>
  );
};