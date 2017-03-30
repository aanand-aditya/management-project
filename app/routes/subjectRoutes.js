import express from 'express';
import SubjectController from "../controllers/subjectController";

export default function initSubjectRoutes(){
  let subjectRouter = express.Router();
  subjectRouter.get('/',  SubjectController.showAll);
  subjectRouter.get('/:subjectId', SubjectController.showOne);
  subjectRouter.post('/', SubjectController.addData);
  subjectRouter.put('/:subjectId', SubjectController.updateData);
  subjectRouter.delete('/:subjectId', SubjectController.deleteData);

  return subjectRouter;
}

