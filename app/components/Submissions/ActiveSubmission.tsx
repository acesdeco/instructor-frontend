import {
  ISubmission,
  updateSubmission,
} from "~/axios/Submissions";
import { useState } from "react";

interface SubmissionDetailProps {
  submission: ISubmission;
  goBack: () => void;
}

export const SubmissionDetail: React.FC<SubmissionDetailProps> = ({
  submission,
  goBack,
}: SubmissionDetailProps) => {
  const [submissionData, setSubmissionData] = useState<ISubmission | null>(
    submission
  );
  if (!submissionData) {
    return <div>No submission data available</div>;
  }
  return (
    <div>
      <button className="text-blue-600 underline mb-2" onClick={goBack}>
        Back to Submissions
      </button>
      <h2 className="text-xl font-bold mb-4">Submission Details</h2>
      <div>
        {submissionData.answers.map((answer, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">Question {index + 1}</h3>
            <p>{answer.question.question_text}</p>
            {answer.question.question_type === "objective" ? (
              <>
                <p>
                  <strong>Given Answer:</strong> {answer.answer_text}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {answer.answer_text}
                </p>
                <p>
                  <strong>Score:</strong> {answer.marks_obtained}
                </p>
              </>
            ) : (
              <>
                {/* <p>
                  <strong>Given Answer:</strong> {answer.answer_text}
                </p> */}
                <p>
                  <strong>Given Answer:</strong>
                  <textarea
                    disabled
                    contentEditable={false}
                    value={answer.answer_text}
                  ></textarea>
                  <p>
                    <strong>Score:</strong> {answer.marks_obtained}
                  </p>
                  <button
                    className="text-blue-600 underline"
                    onClick={async () => {
                      // Implement the grading logic here
                      const newScore = prompt(
                        "Enter the score for this answer:"
                      );
                      if (newScore !== null) {
                        const updatedSubmissionData = { ...submissionData };
                        updatedSubmissionData.answers[index].marks_obtained =
                          parseFloat(newScore);
                        const response = await updateSubmission(
                          updatedSubmissionData._id,
                          updatedSubmissionData
                        );
                        if (response.success) {
                          setSubmissionData(updatedSubmissionData);
                        }
                      }
                    }}
                  >
                    Grade
                  </button>
                </p>
              </>
            )}

            {/* <p>
              <strong>Score:</strong> {answer}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};
