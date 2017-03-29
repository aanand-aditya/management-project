import Subject from "../models/subject";

export default class SubjectController {
  static showAll(req, res){
    Subject.find({},function(err,data){
      res.send(data);
      console.log(data);
    })
  }

  static showOne(req, res){
    var id = req.params.subjectId;
    Subject.findOne({_id:id},function(err,data){
      res.send(data);
    })
  }

  static addData(req, res){
    var add = new Subject(req.body);
    add.save(function(err,dataobj){
      if(err)
        res.send(err);
      else
        res.send(dataobj);
    });
  }

  static updateData(req, res){
    var id = req.params.subjectId;
    console.log(req.body);
    Subject.findById({_id: id},function(err,data){
      if(err)
        res.send(err);
      else{
        data.sub_name = req.body.sub_name || data.sub_name;
        data.prof_name = req.body.prof_name || data.prof_name;
        //console.log(Subject.name);
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
    var id = req.params.subjectId;
    Subject.findByIdAndRemove(id,function(err,data){
      if(err)
        res.send(err);
      res.send(data);
    });

  }
}
