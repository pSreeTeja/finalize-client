/**
 * API Wrapper - Centralized fetch utility with error handling
 */

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  IS_AUTHENTICATED: '/isAuthenticated',
  LOGOUT: '/logout',
  DATA: '/data',
  INVITE: '/invite',
  DISPLAY_GROUPS: '/displaygroups',
  CREATE_GROUP: '/creategroupapi',
  UPDATE_STUDENT_PROJECT: '/updatestudentproject',
  ADD_STUDENT_PROJECT: '/addstudentproject',
  SUBMIT_PROJECT: '/submitproject',
  DELETE_GROUP: '/deletegroup',
  REJECT_PROJECT: '/rejectproject',
};

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - fetch options
 * @returns {Promise} - JSON response or throws error
 */
export const apiCall = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const errorMessage = error.message || error.error || response.statusText;
      throw new APIError(
        errorMessage,
        response.status,
        error
      );
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof APIError) {
      throw err;
    }

    if (err.name === 'AbortError') {
      throw new APIError('Request timeout', 408);
    }

    throw new APIError(
      err.message || 'Network error occurred',
      0,
      err
    );
  }
};

/**
 * Custom Error class for API errors
 */
export class APIError extends Error {
  constructor(message, status = 0, originalError = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.originalError = originalError;
  }

  isUnauthorized() {
    return this.status === 401;
  }

  isForbidden() {
    return this.status === 403;
  }

  isNotFound() {
    return this.status === 404;
  }

  isConflict() {
    return this.status === 409;
  }

  isValidationError() {
    return this.status === 422;
  }

  isServerError() {
    return this.status >= 500;
  }
}

/**
 * Helper methods for common API calls
 */
export const apiAuth = {
  login: (email, password) =>
    apiCall(ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password, isTeacher) =>
    apiCall(ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, isTeacher }),
    }),

  isAuthenticated: () =>
    apiCall(ENDPOINTS.IS_AUTHENTICATED, { method: 'GET' }),

  logout: () =>
    apiCall(ENDPOINTS.LOGOUT, { method: 'GET' }),

  getUserData: () =>
    apiCall(ENDPOINTS.DATA, { method: 'GET' }),
};

export const apiGroups = {
  getGroups: () =>
    apiCall(ENDPOINTS.DISPLAY_GROUPS, { method: 'GET' }),

  createGroup: (projectTitle, aboutProject, date, link) =>
    apiCall(ENDPOINTS.CREATE_GROUP, {
      method: 'POST',
      body: JSON.stringify({ projectTitle, aboutProject, date, link }),
    }),

  deleteGroup: (groupId) =>
    apiCall(ENDPOINTS.DELETE_GROUP, {
      method: 'POST',
      body: JSON.stringify({ _id: groupId }),
    }),
};

export const apiProjects = {
  addProject: (projectData) =>
    apiCall(ENDPOINTS.ADD_STUDENT_PROJECT, {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),

  updateProject: (projectData) =>
    apiCall(ENDPOINTS.UPDATE_STUDENT_PROJECT, {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),

  submitProject: (projectData) =>
    apiCall(ENDPOINTS.SUBMIT_PROJECT, {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),

  rejectProject: (projectId) =>
    apiCall(ENDPOINTS.REJECT_PROJECT, {
      method: 'POST',
      body: JSON.stringify({ _id: projectId }),
    }),

  inviteUser: (inviteData) =>
    apiCall(ENDPOINTS.INVITE, {
      method: 'POST',
      body: JSON.stringify(inviteData),
    }),
};
