/* eslint-disable react/prop-types */
import {
  useEffect,
  useState,
  //  useEffect
} from "react";
import { getSubmissionsByAssessment, ISubmission } from "~/axios/Submissions";
import { SubmissionDetail } from "./ActiveSubmission";
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
  goBack,
}: AssessmentComponentProps) {
    const [submissions, setSubmissions] = useState<Array<ISubmission>>([]);
    const [studentSubmissionView, setStudentSubmissionView] = useState<ISubmission>();
  useEffect(() => {
    const fetchSubmissionsData = async () => {
      try {
        const response = await getSubmissionsByAssessment(assessmentId);
        console.log(response);
        if (response.success) {
          if (response.data) {
            console.log(response.data);
            const responseTr = response.data as Array<ISubmission>;
            setSubmissions(responseTr);
            // setQuestions(responseTr.questions);
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
      fetchSubmissionsData();
    } else {
      setDataLoading(false);
    }
  }, [assessmentId]);
  const [dataLoading, setDataLoading] = useState(true);
  
 
  if (dataLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="loader"></div>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    studentSubmissionView ? 
    <section>
    <SubmissionDetail submission={studentSubmissionView} goBack={() => goBack()}></SubmissionDetail>
    </section>
    :
    <section>
      <button className="text-blue-600 underline mb-2" onClick={() => goBack()}>
        Back
      </button>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
        <th className="py-2">Student Name</th>
        <th className="py-2">Student Registration Number</th>
        <th className="py-2">Current Score</th>
        <th className="py-2">View</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission) => (
        <tr key={submission._id}>
          <td className="border px-4 py-2">{submission.student.student_name}</td>
          <td className="border px-4 py-2">{submission.student.reg_number}</td>
          <td className="border px-4 py-2">{submission.total_score}</td>
          <td className="border px-4 py-2">
            <button onClick={() => setStudentSubmissionView(submission)} className="text-blue-600 underline">View</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    </section>
  );
}
