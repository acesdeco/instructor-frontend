import {
  // createAssessment,
  getAssessmentByWeek,
  IAssessment,
  //   IAssessment,
} from "~/axios/Assessments";
import { useEffect, useState } from "react";
import ActiveAs from "./SubmissionsList";
interface Question {
  id: number;
  question_text: string;
  question_type: string;
  options: { option_text: string; is_correct: boolean }[];
}
interface AssessmentComponentProps {
  assessmentData?: {
    title: string;
    description: string;
    questions: Question[];
  };
  weekId: string;
  courseId: string;
  user: {
    name: string;
    id: string;
  };
}

export const SubmissionsFlow = ({
  weekId,
  courseId,
  user,
}: // user,
AssessmentComponentProps) => {
  const [assessments, setAssessments] = useState([]);
  const [singleAssessmentView, setSingleAssessmentView] = useState(false);
  const [assessmentId, setAssessmentId] = useState("");
  const [loadingAssesments, setLoadingAssessments] = useState(true);
  const showAssessment = (id: string) => {
    setAssessmentId(id);
    setSingleAssessmentView(true);
  };
  const goBack = () => {
    setSingleAssessmentView(false);
    setAssessmentId("");
  };

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await getAssessmentByWeek(weekId);
        if (response.success) {
          const assessmentsData = response.data as [];
          setAssessments([...assessmentsData]);
          setLoadingAssessments(false);
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };
    if (weekId) {
      fetchAssessments();
    } else {
      setLoadingAssessments(false);
    }
  }, [weekId, courseId, singleAssessmentView]);
  if (loadingAssesments) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <>
      {singleAssessmentView ? (
        <ActiveAs
          goBack={goBack}
          courseId={courseId}
          weekId={weekId}
          user={user}
          assessmentId={assessmentId}
        />
      ) : (
        <section>
          {assessments.length > 0 ? (
            <ul>
              {assessments.map((assessment: IAssessment) => (
                <li key={assessment._id} className="py-2">
                  <button
                    onClick={() => showAssessment(assessment._id)}
                    className="bg-blue-300 p-2 py-4 w-full text-left rounded-md"
                  >
                    <h3>Submissions for {assessment.title}</h3>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p>You have no submissions for this week</p>
            </>
          )}
        </section>
      )}
    </>
  );
};
