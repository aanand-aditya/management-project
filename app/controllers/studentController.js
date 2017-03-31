import Student from "../models/student";
import Subject from "../models/subject";
let _ = require("lodash");

export default class StudentController {
  static showAll(req, res){
    Student
     .find()
     .select("name dob address")
     .limit(3)
     .then(data => {
        data = StudentController._filterData(data);
        res.send(data);
      })
     .catch(err => {
       res.send(err);
     })
  }

  static showOne(req, res){
    let newdata = [];
    let id = req.params.studentId;
    Student
     .findOne()
     .where('_id').equals(id)
     .select("name dob address")
     .lean()
     .then(data => {
        let newdata = _.pick(data, 'name', 'dob', 'address');
        newdata.student_id = data['_id'];
        res.send(newdata);
      })
     .catch(err => {
        res.send(err);
      });
  }

  static addSubject(req, res){
    let subject = req.body.subject;
    let id = req.params.studentId;
    Subject
     .find()
     .where('sub_name').equals(subject)
     .then(data => {
      if(err)
        res.send("no such subject present");
      else{
        let newsub = data[0]._id;
        let query = { _id : id };
        Student.update(query, { $push : { subjects: newsub } },(err,doc) => {
          if(err)
            res.send(err);
          else{
            res.send("subject has been added");
          }

        });
        
      }
    });
  }
  static addData(req, res){
    let add = new Student(req.body);
    add.save(function(err, dataobj){
      if(err)
        res.send(err);
      else{
        dataobj = _.pick(dataobj, 'name', 'dob', 'address');
        res.status(201).send(dataobj);
      }
    });
  }

  static updateData(req, res){
    let id = req.params.studentId;
    console.log(req.body);
    Student.findById({_id: id},function(err,data){
      if(err)
        res.send(err);
      else {
        data.name = req.body.name || data.name;
        console.log(Student.name);
        data.save(function(err,data){
          if(err)
            res.send(err)
          else
            res.send(data);
        })
      }

    })
  }

  static deleteData(req, res){
    let id = req.params.studentId;
    Student.findByIdAndRemove(id,function(err, data){
      if(err)
        res.send(err);
      res.send("object deleted");
    });

  }

  static deleteSubject(req, res){
    let id = req.params.studentId;
    let subid = req.params.subjectId;
    console.log(subid);
    let query = { _id : id };
    Student.update(query, { $pullAll : { subjects: [subid] } },(err,doc) => {
      if(err)
            res.send(err);
      else{
            res.send("subject has been removed");
          }

      });
  }

  static showSubject(req, res){
    let id = req.params.studentId;
    let subid = req.params.subjectId;
    Student
     .find({_id : id})
     .select("name dob address")
     .then(data => {
        Subject
         .find()
         .where('_id').equals(subid)
         .select("sub_name")
         .then(data => {
            res.send(data);
          })
         .catch(err => {
            res.send(err);
          })
      })
     .catch(err => {
        res.send(err);
     })
        
  }
    

  static showAllSubject(req, res){
    let id = req.params.studentId;
    Student.find({_id : id})
     .select("subjects")
     .then((data) => {
        if(err)
          res.send(err);
        else{
          Subject
           .find()
           .where('_id').in(data[0].subjects)
           .then(data => {
              res.send(data);
            })
           .catch(err => {
              res.send(err);
           })
        
        }
      })
     .catch((err) => {
        if(err)
          res.send(err);
     })
  }

  static _filterData(data){
    data = data.map(n => {
      let n1 = _.pick(n, 'name', 'dob', 'address');
      n1.student_id = n['_id'];
      return n1;
    })
    return data;
  }

  
}
