import {
  // createAssessment,
  getAssessmentByWeek,
  IAssessment,
  //   IAssessment,
} from "~/axios/Assessments";
import { useEffect, useState } from "react";
import ActiveAs from "./LargeAssessmentComponent";
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

export const AssessmentComponent = ({
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
  const goBack = ()=> {
    setSingleAssessmentView(false);
  }

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await getAssessmentByWeek(weekId);
        if(response.success){
            const assessmentsData = response.data as [];
            setAssessments([...assessmentsData]);
            setLoadingAssessments(false);
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };
    if(weekId){
      fetchAssessments();
    }else {
      setLoadingAssessments(false);
    }
  }, [weekId, courseId, singleAssessmentView]);
  if(loadingAssesments){
    return(
    <div className="flex justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
    );
  }
  return (
    <>
      {singleAssessmentView ? (
        <ActiveAs goBack={goBack} courseId={courseId} weekId={weekId} user={user} assessmentId={assessmentId} />
      ) : (
        <section>
          {assessments.length > 0 ? (
            <ul>
              {assessments.map((assessment: IAssessment) => (
                <li key={assessment._id} className="py-2">
                  <button onClick={() => showAssessment(assessment._id)} className="bg-blue-300 p-2 w-full text-left rounded-md">
                    <h3>{assessment.title}</h3>
                    <p className="text-sm text-gray-600">
                      {assessment.description}
                    </p>
                  </button>
                </li>
              ))}
              
                <button className="bg-blue-600 mt-2 p-2 w-fit text-white rounded-md" onClick={() => showAssessment("")}>
                    Create New Assessment
                </button>
            </ul>
          ) : (
            <>
              <p>You have no assessments for this week</p>
              <button className="bg-blue-600 p-2 w-full my-4 text-white rounded-md" onClick={() => showAssessment("")}>
                Create Assessment
              </button>
            </>
          )}
        </section>
      )}
    </>
  );
};
