import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// Sample trivia questions — expand to 35
const triviaData = [
  {
    question: "Who is known as 'His Airness'?",
    options: ["Kobe Bryant", "Michael Jordan", "LeBron James", "Magic Johnson"],
    answer: "Michael Jordan",
    fact: "Michael Jordan won 6 NBA championships with the Chicago Bulls.",
  },
  {
    question: "Which team won the most NBA titles?",
    options: [
      "Chicago Bulls",
      "Los Angeles Lakers",
      "Boston Celtics",
      "Miami Heat",
    ],
    answer: "Boston Celtics",
    fact: "The Celtics have won 18 NBA championships, one more than the Lakers.",
  },
  {
    question: "Which player is the NBA all-time leading scorer?",
    options: [
      "Karl Malone",
      "Kareem Abdul-Jabbar",
      "LeBron James",
      "Dirk Nowitzki",
    ],
    answer: "LeBron James",
    fact: "LeBron James surpassed Kareem Abdul-Jabbar's record in 2023.",
  },
  // Add 32 more...
  {
    question: "Who holds the record for the most points in a single NBA game?",
    options: [
      "Kobe Bryant",
      "Michael Jordan",
      "Wilt Chamberlain",
      "David Robinson",
    ],
    answer: "Wilt Chamberlain",
    fact: "Wilt Chamberlain scored 100 points in a game on March 2, 1962.",
  },
  {
    question: "Which team drafted Dirk Nowitzki?",
    options: [
      "Dallas Mavericks",
      "Milwaukee Bucks",
      "San Antonio Spurs",
      "Phoenix Suns",
    ],
    answer: "Milwaukee Bucks",
    fact: "Dirk Nowitzki was drafted by the Bucks but traded to the Mavericks.",
  },
  {
    question: "Who is the youngest player to score 30,000 points in the NBA?",
    options: ["LeBron James", "Kevin Durant", "Kobe Bryant", "Carmelo Anthony"],
    answer: "LeBron James",
    fact: "LeBron James reached 30,000 points at age 33.",
  },
  {
    question: "Which player has the most career assists in NBA history?",
    options: ["John Stockton", "Jason Kidd", "Chris Paul", "Magic Johnson"],
    answer: "John Stockton",
    fact: "John Stockton recorded 15,806 assists during his career.",
  },
  {
    question: "Who was the first player to win the NBA MVP award unanimously?",
    options: [
      "Stephen Curry",
      "LeBron James",
      "Shaquille O'Neal",
      "Michael Jordan",
    ],
    answer: "Stephen Curry",
    fact: "Stephen Curry won the unanimous MVP award in 2016.",
  },
  {
    question:
      "Which team did Shaquille O'Neal win his first championship with?",
    options: [
      "Los Angeles Lakers",
      "Miami Heat",
      "Orlando Magic",
      "Phoenix Suns",
    ],
    answer: "Los Angeles Lakers",
    fact: "Shaquille O'Neal won three consecutive titles with the Lakers from 2000-2002.",
  },
  {
    question: "Who is the only player to win NBA Finals MVP on a losing team?",
    options: ["Jerry West", "Elgin Baylor", "Bill Russell", "Wilt Chamberlain"],
    answer: "Jerry West",
    fact: "Jerry West won Finals MVP in 1969 despite the Lakers losing to the Celtics.",
  },
  {
    question: "Which player has the most triple-doubles in NBA history?",
    options: [
      "Magic Johnson",
      "Oscar Robertson",
      "Russell Westbrook",
      "Jason Kidd",
    ],
    answer: "Russell Westbrook",
    fact: "Russell Westbrook holds the record with over 180 triple-doubles.",
  },
];

function NBATriviaApp() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (option) => {
    if (option === triviaData[current].answer) {
      setScore(score + 1);
      setShowFact(triviaData[current].fact);
    } else {
      setShowFact("");
    }
    setTimeout(() => {
      setShowFact("");
      if (current + 1 < triviaData.length) {
        setCurrent(current + 1);
      } else {
        setIsFinished(true);
        if (((score + 1) / triviaData.length) * 100 >= 90) {
          confetti();
        }
      }
    }, 5000);
  };

  const resetGame = () => {
    setCurrent(0);
    setScore(0);
    setShowFact("");
    setIsFinished(false);
  };

  return (
    <main className="min-h-screen p-4 bg-gradient-to-b from-blue-50 to-blue-200 text-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
        🏀 NBA Trivia Challenge
      </h1>
      <p className="mb-4 text-lg text-center max-w-xl">
        Test your knowledge of NBA history. Answer all questions and score 90%+
        to celebrate!
      </p>

      {isFinished ? (
        <div className="text-center">
          <p className="text-2xl font-semibold mb-2">
            You scored {score} out of {triviaData.length}
          </p>
          <p className="text-xl mb-4">
            Your score: {((score / triviaData.length) * 100).toFixed(0)}%
          </p>
          {(score / triviaData.length) * 100 >= 90 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              className="text-5xl mb-4"
            >
              🎉🏆 Congratulations! 🏆🎉
            </motion.div>
          )}
          <button onClick={resetGame} className="primary">
            Start Over
          </button>
        </div>
      ) : (
        <section
          className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
          aria-live="polite"
        >
          <h2 className="text-xl mb-4">
            Question {current + 1} of {triviaData.length}
          </h2>
          <p className="mb-4">{triviaData[current].question}</p>
          <div className="flex flex-col gap-3">
            {triviaData[current].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="option"
              >
                {option}
              </button>
            ))}
          </div>

          {showFact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-green-100 border border-green-400 rounded"
            >
              ✅ Correct! Fun Fact: {showFact}
            </motion.div>
          )}

          <button onClick={resetGame} className="reset">
            Reset
          </button>
        </section>
      )}
    </main>
  );
}

export default NBATriviaApp;
