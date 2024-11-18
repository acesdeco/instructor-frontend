import { baseConfig as api, axios, AxiosError } from "./baseConfig";

export interface ICourse {
  _id?: string;
  title: string;
  code: string;
  description: string;
  published: boolean;
  instructor: {
    id: string;
    name: string;
  };
  courseImage: string;
  coursePrice: number;
  slug: string;
  introduction: {
    video: string;
    notes: string;
  };
  weeks: {
    [key: string]: {
      weekNumber: number;
      _id: string;
      video: string;
      assessments: string;
      notes: string;
      topic: string;
    };
  };
  // Add more weeks as needed
}

export const getCourse = async (id: string): Promise<ICourse> => {
  try {
    const response = await api.get(`/course/${id}`);
    return response.data.data as ICourse;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export const addWeek = async (id: string, data: any): Promise<any> => {
  try {
    const response = await api.post(`/course/${id}/week`, data);
    return response.data.data as ICourse;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export const getWeeksByCoursesId = async (id: String): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/course/weeks/${id}`);
    return {
      success: true,
      data: response.data.data as ICourse[],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const getCourseBySlug = async (slug: string): Promise<ICourse> => {
  try {
    const response = await api.get(`/course/slug/${slug}`);
    return response.data.data as ICourse;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

interface ApiResponse {
  success: boolean;
  data?: ICourse | ICourse[];
  message?: string;
  details?: unknown;
}

export const createCourse = async (
  courseData: Partial<Pick<ICourse, "title" | "code" | "description">>
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/course", courseData);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error: unknown | { message: string }) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const updateWeek = async (id: string, weekData: any): Promise<any> => {
  try {
    const response = await api.put(`/course/week/${id}`, weekData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const updateCourse = async (
  id: string,
  courseData: any
): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/course/${id}`, courseData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const deleteCourse = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/course/${id}`);
    return response.data as { message: string };
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
export const getAllCourses = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get("/course");
    return {
      success: true,
      data: response.data.data as ICourse[],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const getCoursesByCreatorId = async (
  id: string
): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/course/creator/${id}`);
    if (response.status === 200) {
      const userCourses = response.data.data as ICourse[];
      return {
        success: true,
        data: userCourses,
      };
    }
    return {
      success: true,
      data: response.data.data as ICourse[],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};
