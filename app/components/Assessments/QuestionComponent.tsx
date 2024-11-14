import { ChangeEvent, useState } from "react";

function AssessmentForm() {
    const [questionType, setQuestionType] = useState("objective");
    const [options, setOptions] = useState([{option_text: "", is_correct: false}]);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

    const handleOptionChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newOptions = [...options];
        newOptions[index].option_text = e.target.value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, {option_text: "", is_correct: false}]);
    };
    const detSetCorrectAnswer = (index: number) => {
        setCorrectAnswer(index);
        const newOptions = [...options];
        newOptions[index].is_correct = true;
        setOptions(newOptions);
    }

    const removeOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        if (correctAnswer === index) {
            setCorrectAnswer(null);
        } else if (correctAnswer !== null && correctAnswer > index) {
            setCorrectAnswer(correctAnswer - 1);
        }
    };

    return (
        <form className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
                <label className="text-lg font-medium" htmlFor="description">
                    Question
                </label>
                <textarea
                    className="bg-white border border-gray-300 p-2 rounded-md"
                    id="description"
                    placeholder="Enter assessment description"
                    rows={4}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-medium" htmlFor="questionType">
                    Question Type
                </label>
                <select
                    className="border bg-white border-gray-300 p-2 rounded-md"
                    id="questionType"
                    onChange={(e) => setQuestionType(e.target.value)}
                >
                    <option value="objective">Objective</option>
                    <option value="subjective">Subjective</option>
                </select>
            </div>
            {questionType === "objective" && (
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="options">
                        Options
                    </label>
                    {options.map((option, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                className="bg-white border border-gray-300 p-2 rounded-md flex-1"
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
                                className="bg-red-500 text-white p-2 rounded-md"
                                onClick={() => removeOption(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-blue-600 text-white p-2 rounded-md mt-2"
                        onClick={addOption}
                    >
                        Add Option
                    </button>
                </div>
            )}
            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md mt-4"
            >
                Create Assessment
            </button>
        </form>
    );
}

export default AssessmentForm;