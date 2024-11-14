import { useState } from "react";
import {BiPlus } from "react-icons/bi";
import QuestionComponent from "~/components/Assessments/QuestionComponent";


export default function AssessmentComponent() {
    const [questions, setQuestions] = useState([
        {
          id: 1,
          question_text: "What is Python?",
          question_type: "objective",
          options: [{ option_text: "", is_correct: false }],
        },
        {
          id: 2,
          question_text: "What is Python?",
          question_type: "objective",
          options: [{ option_text: "", is_correct: false }],
        },
      ]);
      const addQuestion = (text: string) => {
        const newQuestion = {
          id: questions.length + 1,
          question_text: text,
          question_type: "objective",
          options: [{ option_text: "", is_correct: false }],
        };
        setQuestions([...questions, newQuestion]);
      };
      const removeQuestion = (id: number | string) => {
        if (questions.length > 1) {
          setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
          );
        } else {
          alert("There must be at least one question.");
        }
      };
      const updateQuestion = (id: number | string, field: string, value: unknown) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id
              ? { ...question, [field]: value}
              : question
          )
        );
        console.log(questions);
      };
    return (
        <section>
        <h1 className="text-2xl font-semibold">Create Assessment</h1>
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter assessment title"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter assessment description"
            />
          </div>
          <div>
            <label
              htmlFor="questions"
              className="block font-medium text-lg text-gray-700"
            >
              Questions
            </label>
            <div className="mt-1 flex flex-col gap-4">
              {questions.map((question) => (
                <div key={question.id} className="relative group">

                  <QuestionComponent
                    id={question.id}
                    question_text={question.question_text}
                    question_type={question.question_type}
                    options={question.options}
                    removeQuestion = {removeQuestion}
                    updateQuestion= {updateQuestion}
                  />
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
                    onClick={() => {
                      // Logic to add a new question
                      addQuestion("");
                    }}
                    type="button"
                  >
                    <BiPlus size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>
        {/* <AssessmentForm/> */}
      </section>
    )
}