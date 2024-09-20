'use client';
import React from 'react';
import { Stack, Paper } from '@mui/material';

import QuestionCard from './QuestionCard';

import styles from './QuizzCard.module.css';

const QuizzCard = ({ data, setAnswers, onQuestionComplete, subtopic }) => {
  const subtopicRefs = React.useRef({});
  const handleAnswerSubmit = (answer) => {
    setAnswers((prevAnswers) => {
      const nextResults = { ...prevAnswers, ...answer };
      return nextResults;
    });
  };
  React.useEffect(() => {
    const filteredDiv = subtopicRefs.current[subtopic];
    if (filteredDiv) {
      filteredDiv.scrollIntoView({ behavior: 'smooth' });
    }
  }, [subtopic]);
  return (
    <>
      {data.dashboard.map((quizz, quizzIndex) =>
        quizz.subtopics.map((subtopic, subtopicIndex) => (
          <div
            key={`${quizzIndex}-${subtopicIndex}`}
            ref={(el) => (subtopicRefs.current[subtopic.subtopic] = el)}
            className={styles.quizzCardSubtopicContainer}
            data-subtopic={subtopic.subtopic}
          >
            {subtopic.questions.map((question, questionIndex) => (
              <Paper
                key={`${quizzIndex}-${subtopicIndex}-${questionIndex}`}
                elevation={3}
                sx={{ width: 800, p: 2.5, borderRadius: 2 }}
              >
                <Stack spacing={2.5}>
                  <QuestionCard
                    key={question.global_question_index}
                    questionIndex={question.global_question_index}
                    question={question}
                    onAnswerSubmit={handleAnswerSubmit}
                    onComplete={() =>
                      onQuestionComplete(
                        quizzIndex,
                        subtopicIndex,
                        questionIndex,
                      )
                    }
                  />
                </Stack>
              </Paper>
            ))}
          </div>
        )),
      )}
    </>
  );
};

export default QuizzCard;

{
  /* <>
{data.dashboard.map((quizz, quizzIndex) =>
  quizz.subtopics.map((subtopic, subtopicIndex) => (
    <div
      key={`${quizzIndex}-${subtopicIndex}`}
      className={styles.quizzCardSubtopicContainer}
      data-subtopic={subtopic.subtopic}
    >
      {subtopic.questions.map((question, questionIndex) => (
        <Paper
          key={`${quizzIndex}-${subtopicIndex}-${questionIndex}`}
          elevation={3}
          sx={{ width: 800, p: 2.5, borderRadius: 2 }}
        >
          <Stack spacing={2.5}>
            <QuestionCard
              key={question.global_question_index}
              questionIndex={question.global_question_index}
              question={question}
              onAnswerSubmit={handleAnswerSubmit}
              onComplete={() =>
                onQuestionComplete(
                  quizzIndex,
                  subtopicIndex,
                  questionIndex,
                )
              }
            />
          </Stack>
        </Paper>
      ))}
    </div>
  )),
)}
</> */
}
