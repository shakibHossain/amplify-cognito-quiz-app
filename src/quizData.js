import { decode } from "html-entities";

async function getData() {
  const url =
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

  // Function to shuffle an array using sort
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: Error`);
    }

    const data = await response.json();

    const transformedResults = data.results.map((result) => {
      const options = [result.correct_answer, ...result.incorrect_answers];
      return {
        question: decode(result.question),
        options: shuffleArray(options), // Shuffle options
        answer: result.correct_answer,
      };
    });

    return transformedResults;
  } catch (error) {
    console.error(error.message);
  }
}

const quizData = await getData();

export default quizData;
