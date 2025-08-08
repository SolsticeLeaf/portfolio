import { getProjects } from '../../database/interfaces/projects/Project';
import { connectDB } from '../../database/MongoDB';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { amount } = body;
  try {
    await connectDB();
    const projects = await getProjects(amount);
    return { projects: projects || [] };
  } catch (error) {
    console.error('Error on getting some projects: ', error);
    return { projects: [] };
  }
});
