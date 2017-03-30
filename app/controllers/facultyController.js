import Faculty from "../models/faculty";

export default class FacultyController {
  static showAll(req, res){
    Faculty.find({}, function(err,data){
      res.send(data);
      console.log(data);
    })
  }

  static showOne(req, res){
    let id = req.params.studentId;
    Faculty.findOne({_id : id},function(err, data){
      res.send(data);
    })
  }

  static addData(req, res){
    let add = new Faculty(req.body);
    add.save(function(err, dataobj){
      if(err)
        res.send(err);
      else
        res.send(dataobj);
    });
  }

  static updateData(req, res){
    let id = req.params.facultyId;
    let query = {_id : id};
    let subject = req.body.subject;
    Faculty.findById({_id : id},function(err,data){
      if(err)
        res.send(err);
      else{
        data.name = req.body.name || data.name;
        data.subject[0] = req.body.subject || data.subject[0];
        data.save(function(err, data){
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
    Faculty.findByIdAndRemove(id, function(err, data){
      if(err)
        res.send(err);
      res.send("object deleted");
    });

  }
}
