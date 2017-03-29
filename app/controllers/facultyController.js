import Faculty from "../models/faculty";

export default class FacultyController {
  static showAll(req, res){
    Faculty.find({},function(err,data){
      res.send(data);
      console.log(data);
    })
  }

  static showOne(req, res){
    var id = req.params.studentId;
    Faculty.findOne({_id:id},function(err,data){
      res.send(data);
    })
  }

  static addData(req, res){
    var add = new Faculty(req.body);
    add.save(function(err,dataobj){
      if(err)
        res.send(err);
      else
        res.send(dataobj);
    });
  }

  static updateData(req, res){
    var id = req.params.facultyId;
    var query = {_id: id};
    var subject = req.body.subject;
    Faculty.update(query,{"subject.0": subject});
    //console.log(req.body);
    /*Faculty.findById({_id: id},function(err,data){
      if(err)
        res.send(err);
      else{
        console.log(data.subject[0]);
        data.name = req.body.name || data.name;
        data.subject[0] = req.body.subject || data.subject[0];
        //console.log(Faculty.name);
        data.save(function(err,data){
          if(err)
            res.send(err)
          else
            res.send(data);
        })
      }

    })*/
  }

  static deleteData(req, res){
    var id = req.params.studentId;
    Faculty.findByIdAndRemove(id,function(err,data){
      if(err)
        res.send(err);
      res.send("object deleted");
    });

  }
}
