const Event = require("../../Models/Event")
exports.getStudents = async (req,res)=>{
    try{
        const {className,section,year} = req.body;
        if(!className||!section||!year){
            return res.status(405).json({
                message:"Incomplete Details"
            })
        }
        const events = await Event.find().populate({
        path: 'students_attended',
        match: {
          year: year,        // Match the year
          section: section,  // Match the section
          className: className // Match the class
        },
        
      })
      .exec();

    // Filter out events where no students match the query
    const filteredEvents = events.filter(event => event.students_attended.length > 0);

    res.json(filteredEvents);
  
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}