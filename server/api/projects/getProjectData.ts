import { getProjectByName } from '../../database/interfaces/projects/Project';
import { connectDB } from '../../database/MongoDB';

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id || 'null';
  try {
    await connectDB();
    return { project: (await getProjectByName(id.toString().trim())) || {} };
  } catch (error) {
    console.error('Error on getting project data: ', error);
    return { project: {} };
  }
});
