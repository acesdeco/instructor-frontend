import { baseConfig as api, axios, AxiosError } from "./baseConfig";

export interface ISubmission {
    _id: string;
  assessment: string;
  student: {
    student_id: string;
    student_name: string;
    reg_number: string;
  };
  total_score: number;
  answers: {
    question: {
      question_id: string;
      question_text: string;
      question_type: string;
    };
    marks_obtained: number;
    answer_text: string;
  }[];
  submitted_at: string;
}

interface ApiResponse {
  success: boolean;
  data?: unknown;
  message?: string;
  details?: unknown;
}

export const getSubmissionsByAssessment = async (
  assessmentId: string
): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/assessment/submissions/${assessmentId}`);
    return {
      success: true,
      data: response.data.data as ISubmission[],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const getSubmission = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/assessment/submissions/s/${id}`);
    return {
      success: true,
      data: response.data.data as ISubmission,
    };
  } catch (error) {
    console.error("Error fetching submission:", error);
    throw error;
  }
};

export const deleteSubmission = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/submission/${id}`);
    return response.data as { message: string };
  } catch (error) {
    console.error("Error deleting submission:", error);
    throw error;
  }
};

export const updateSubmission = async (
  id: string,
  submissionData: Partial<ISubmission>
): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/submission/${id}`, submissionData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};
