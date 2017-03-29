import Student from "../models/student";
import Subject from "../models/subject";

export default class StudentController {
  static showAll(req, res){
    let newdata = [];
    Student.find({}, {name : 1, dob : 1, address : 1}, (err,data) => {
      newdata = data.map((n) => {
        console.log(n);
        n = n.toJSON();
        n["student_id"] = n["_id"];
        delete n["_id"];
        return n;
      });
      res.send(newdata);
    })
  }

  static showOne(req, res){
    let newdata = [];
    var id = req.params.studentId;
    Student.findOne({_id : id},{name : 1, dob : 1, address : 1}, (err,data) => {
        data = data.toJSON();
        data["student_id"] = data["_id"];
        delete data["_id"];
        res.send(data);
    })
  }

  static addSubject(req, res){
    var subject = req.body.subject;
    var id = req.params.studentId;
    Subject.find({ sub_name : subject}, (err,data) => {
      if(err)
        res.send("no such subject present");
      else{
        var newsub = data[0]._id;
        var query = { _id : id };
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
    var add = new Student(req.body);
    add.save(function(err,dataobj){
      if(err)
        res.send(err);
      else
        res.status(201).send("new document created");
    });
  }

  static updateData(req, res){
    var id = req.params.studentId;
    console.log(req.body);
    Student.findById({_id: id},function(err,data){
      if(err)
        res.send(err);
      else{
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
    var id = req.params.studentId;
    Student.findByIdAndRemove(id,function(err,data){
      if(err)
        res.send(err);
      res.send("object deleted");
    });

  }

  static deleteSubject(req, res){
    var id = req.params.studentId;
    var subid = req.params.subjectId;
    console.log(subid);
    var query = { _id : id };
    Student.update(query, { $pullAll : { subjects: [subid] } },(err,doc) => {
      if(err)
            res.send(err);
      else{
            res.send("subject has been removed");
          }

      });
  }

  static showSubject(req, res){
    var id = req.params.studentId;
    var subid = req.params.subjectId;
    Student.find({_id : id}, {name : 1, dob : 1, address : 1}, (err,data) => {
      if(err)
        res.send(err);

      else{
        Subject.find({_id : subid}, {_id : 0,sub_name : 1}, (err,data) => {
          if(err)
            res.send(err);
          else{
            res.send(data);
          }
        });
      }
    });

  }

  static showAllSubject(req, res){
    var id = req.params.studentId;
    Student.find({_id : id}, {_id : 0, subjects : 1}, (err,data) => {
      if(err)
        res.send(err);
      else{
        console.log(typeof data[0].subjects);
        Subject.find({_id:{$in:data[0].subjects}}, (err, data) => {
          if(err)
            res.send(err);
          else
            res.send(data);
        })
        
      }
    });
  }

  
}
