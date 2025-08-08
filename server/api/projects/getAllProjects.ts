import { getAllProjects } from '../../database/interfaces/projects/Project';
import { connectDB } from '../../database/MongoDB';

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    return { projects: (await getAllProjects()) || [] };
  } catch (error) {
    console.error('Error on getting all projects: ', error);
    return { projects: [] };
  }
});
