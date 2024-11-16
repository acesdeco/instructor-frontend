/* eslint-disable react/prop-types */
import {
  useEffect,
  useState,
  //  useEffect
} from "react";
import { BiPlus } from "react-icons/bi";
import QuestionComponent from "~/components/Assessments/QuestionComponent";
import {
  createAssessment,
  getAssessment,
  IAssessment,
  //   getAssessmentByCourseAndWeek,
  //   IAssessment,
} from "~/axios/Assessments";
interface Question {
  _id?: string;
  id: number | string;
  question_text: string;
  question_type: string;
  options: { option_text: string; is_correct: boolean }[];
  marks: number;
}

interface AssessmentComponentProps {
  assessmentData?: {
    title: string;
    description: string;
    questions: Question[];
  };
  assessmentId: string;
  weekId?: string;
  courseId?: string;
  user?: {
    name: string;
    id: string;
  };
  goBack: () => void;
}

export default function AssessmentComponent({
  assessmentId,
  weekId,
  courseId,
  user,
  goBack,
}: AssessmentComponentProps) {
  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        const response = await getAssessment(assessmentId);
        if (response.success) {
          if (response.data) {
            const responseTr = response.data as IAssessment;
            setAssessment({
              title: responseTr.title,
              description: responseTr.description,
              questions: responseTr.questions,
              startTime: responseTr.startTime || new Date().toISOString().slice(0, 16),
              endTime:
                responseTr.endTime || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
            });
            setQuestions(responseTr.questions);
            setDataLoading(false);
          }
        } else {
          setDataLoading(false);
          console.error("Failed to fetch assessment data:", response.message);
        }
      } catch (error) {
        setDataLoading(false);
        console.error("Error fetching assessment data:", error);
      }
    };

    if (assessmentId) {
      fetchAssessmentData();
    } else {
      setDataLoading(false);
    }
  }, [assessmentId]);
  const [dataLoading, setDataLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question_text: "What is Python?",
      question_type: "objective",
      options: [{ option_text: "", is_correct: false }],
      marks: 1,
    },
    {
      id: 2,
      question_text: "Explain the beginnings of python",
      question_type: "subjective",
      options: [{ option_text: "", is_correct: false }],
      marks: 1,
    },
  ]);

const [assessment, setAssessment] = useState({
    title: "",
    description: "",
    questions: questions,
    startTime: new Date().toISOString().slice(0, 16), // formatted as datetime-local
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 3 days from now, formatted as datetime-local
});
  const addQuestion = (text: string) => {
    const newQuestion = {
      id: questions.length + 1,
      question_text: text,
      question_type: "objective",
      options: [{ option_text: "", is_correct: false }],
      marks: 1,
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
  const updateQuestion = (
    id: number | string,
    field: string,
    value: unknown
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, [field]: value } : question
      )
    );
  };

  const validateAndSubmit = async () => {
    for (const question of questions) {
      if (!question.question_text.trim()) {
        alert("Question text cannot be empty.");
        return;
      }
      if (question.question_type === "objective") {
        for (const option of question.options) {
          if (!option.option_text.trim()) {
            alert("Option text cannot be empty.");
            return;
          }
        }
      }
    }

    try {
      const response = await createAssessment({
        title: assessment.title,
        description: assessment.description,
        courseId: courseId,
        created_by: user?.id,
        week_id: weekId,
        questions,
        startTime: assessment.startTime,
        endTime: assessment.endTime,
        
      });

      if (!response.success) {
        console.log(response);
        throw new Error(response.message || "Failed to create assessment");
      }

      alert("Assessment created successfully!");
        goBack();
    } catch (error) {
      console.error("Error creating assessment:", error);
      alert("Error creating assessment. Please try again.");
    }
  };
  const updateAssessment = (field: string, value: unknown) => {
    setAssessment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  if (dataLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-8 border-t-8  h-32 w-32 border-blue-500"></div>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <section>
      <button className="text-blue-600 underline mb-2" onClick={() => goBack()}>
        Back
      </button>
      <h1 className="text-2xl font-semibold mb-2">Create Assessment</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validateAndSubmit();
        }}
        className="flex flex-col gap-4"
      >
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
            value={assessment.title}
            onChange={(e) => updateAssessment("title", e.target.value)}
            required
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
            value={assessment.description}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter assessment description"
            onChange={(e) => updateAssessment("description", e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            className="mt-1 block w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={assessment.startTime}
            onChange={(e) => updateAssessment("startTime", e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            type="datetime-local"
            className="mt-1 block w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={assessment.endTime}
            onChange={(e) => updateAssessment("endTime", e.target.value)}
            required
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
              <div key={question._id} className="relative group">
                <QuestionComponent
                  id={question.id}
                  question_text={question.question_text}
                  question_type={question.question_type}
                  options={question.options}
                  removeQuestion={removeQuestion}
                  updateQuestion={updateQuestion}
                  marks={question.marks}
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
        <button
          className="py-1 px-4 w-fit bg-blue-600 text-white rounded-md"
          type="submit"
          //   onClick={(e) => {
          //     e.preventDefault();
          //   }}
        >
          Submit
        </button>
      </form>
      {/* <AssessmentForm/> */}
    </section>
  );
}
