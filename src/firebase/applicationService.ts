import { ref, update } from 'firebase/database';
import { db } from './firebaseConfig';

interface UpdateApplicationParams {
  applicationId: string;
  updates: {
    cvUrl?: string;
    cvPath?: string;
    status?: 'submitted' | 'under_review' | 'completed' | 'rejected';
    [key: string]: any; // Allows other fields
  };
}

/**
 * Updates a job application in Firebase Realtime Database
 */
export const updateJobApplication = async ({
  applicationId,
  updates
}: UpdateApplicationParams): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    // Add timestamp to updates
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: Date.now()
    };

    await update(ref(db, `jobApplications/${applicationId}`), updatesWithTimestamp);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update application:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Database update failed'
    };
  }
};

/**
 * Specialized function to update application with CV details
 */
export const updateApplicationWithCV = async (
  applicationId: string,
  cvData: {
    url: string;
    path: string;
  }
) => {
  return updateJobApplication({
    applicationId,
    updates: {
      cvUrl: cvData.url,
      cvPath: cvData.path,
      status: 'completed'
    }
  });
};