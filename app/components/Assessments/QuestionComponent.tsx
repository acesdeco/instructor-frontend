import { ChangeEvent, useState } from "react";
interface QuestionProps {
  id: string | number;
  question_text: string;
  question_type: string;
  options: { option_text: string; is_correct: boolean }[];
  marks: number;
  removeQuestion: (id: string | number) => void;
updateQuestion: (id: string | number, field: string, value: unknown) => void;
}
const AssessmentForm: React.FC<QuestionProps> = ({
  id,
  question_text,
  question_type,
  options: formOptions,
  marks,
  removeQuestion,
  updateQuestion
}: QuestionProps) => {
  const [options, setOptions] = useState([
    { option_text: "", is_correct: false },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const handleOptionChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...formOptions];
    newOptions[index].option_text = e.target.value;
    updateQuestion(id, 'options', newOptions);
  };

  const addOption = () => {
    if (formOptions.some((option) => option.option_text.trim() === "")) {
      alert("Please fill all existing options before adding a new one.");
      return;
    }
    updateQuestion(id, 'options', [...formOptions, { option_text: "", is_correct: false }]);
    setOptions([...formOptions, { option_text: "", is_correct: false }]);
    
  };
  const detSetCorrectAnswer = (index: number) => {
    setCorrectAnswer(index);
    const newOptions = [...formOptions];
    newOptions[index].is_correct = true;
    updateQuestion(id, 'options', newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    updateQuestion(id, 'options', newOptions);
    if (correctAnswer === index) {
      setCorrectAnswer(null);
    } else if (correctAnswer !== null && correctAnswer > index) {
      setCorrectAnswer(correctAnswer - 1);
    }
  };

  return (
    <form className="flex flex-col gap-2 mt-2 border-l-8 ps-4 py-2 border rounded-lg pr-2 border-blue-300">
      <div className="flex flex-col gap-1 ">
        <header className="flex items-center justify-between my-2">
          <label className="text-sm font-medium" htmlFor="description">
            Question {id}
          </label>
          <button
            className="bg-red-500 py-1 px-3 rounded-md text-white"
            onClick={() => removeQuestion(id)}
            type="button"
          >
            Remove Question
          </button>
        </header>

        <textarea
          className="bg-white border text-sm border-gray-300 p-1 rounded-md"
          id="description"
          placeholder="Enter assessment description"
          rows={3}
          value={question_text}
          onChange={(e) => updateQuestion(id, 'question_text', e.target.value)}
        //   readOnly
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="questionType">
          Marks Allotted
        </label>
        <input
          className="border bg-white border-gray-300 text-sm p-1 rounded-md"
          id="questionType"
          defaultValue={marks}
          onChange={(e) => updateQuestion(id, 'marks', e.target.value)}
          type="number"
        >
          <option value="objective">Objective</option>
          <option value="subjective">Subjective</option>
        </input>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="questionType">
          Question Type
        </label>
        <select
          className="border bg-white border-gray-300 text-sm p-1 rounded-md"
          id="questionType"
          defaultValue={question_type}
          onChange={(e) => updateQuestion(id, 'question_type', e.target.value)}
        >
          <option value="objective">Objective</option>
          <option value="subjective">Subjective</option>
        </select>
      </div>
      {question_type === "objective" && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="options">
            Options
          </label>
          {formOptions.map((option, index) => (
            <div key={index} className="flex gap-1 items-center">
              <input
                className="bg-white border border-gray-300 p-1 rounded-md flex-1"
                type="text"
                value={option.option_text}
                onChange={(e) => handleOptionChange(e, index)}
                placeholder={`Option ${index + 1}`}
              />
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === index}
                onChange={() => detSetCorrectAnswer(index)}
              />
              <button
                type="button"
                className="bg-red-500 text-white p-1 rounded-md"
                onClick={() => removeOption(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-600 w-fit text-white p-1 rounded-md mt-1"
            onClick={addOption}
          >
            Add Option
          </button>
        </div>
      )}
    </form>
  );
};

export default AssessmentForm;
