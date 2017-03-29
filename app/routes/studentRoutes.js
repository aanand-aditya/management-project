import express from 'express';
import StudentController from "../controllers/studentController";

export default function initStudentRoutes(){
  var studentRouter = express.Router();
  studentRouter.get('/',  StudentController.showAll);
  studentRouter.get('/:studentId', StudentController.showOne);
  studentRouter.post('/', StudentController.addData);
  studentRouter.put('/:studentId', StudentController.updateData);
  studentRouter.post('/:studentId/subjects', StudentController.addSubject);
  studentRouter.delete('/:studentId', StudentController.deleteData);
  studentRouter.delete('/:studentId/subjects/:subjectId', StudentController.deleteSubject);
  studentRouter.get('/:studentId/subjects/:subjectId', StudentController.showSubject);
  studentRouter.get('/:studentId/subjects', StudentController.showAllSubject);

  return studentRouter;
}

