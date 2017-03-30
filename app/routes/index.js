import initStudentRoutes from './studentRoutes';
import initFacultyRoutes from './facultyRoutes';
import initSubjectRoutes from './subjectRoutes';


export default function initRoutes(app) {
  app.use('/students', initStudentRoutes());
  app.use('/faculties', initFacultyRoutes());
  app.use('/subjects', initSubjectRoutes());
}