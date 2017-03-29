import express from 'express';
import FacultyController from "../controllers/facultyController";

export default function initFacultyRoutes(){
  var facultyRouter = express.Router();
  facultyRouter.get('/',  FacultyController.showAll);
  facultyRouter.get('/:facultyId', FacultyController.showOne);
  facultyRouter.post('/', FacultyController.addData);
  facultyRouter.put('/:facultyId', FacultyController.updateData);
  facultyRouter.delete('/:facultyId', FacultyController.deleteData);

  return facultyRouter;
}

