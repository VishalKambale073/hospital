
const updateDoctor = async(req,res)=>{
    try {
        const {Name,Email,Contact,Expereince,Education,Address,Fees,Gender} = req.body;
        const educationArray = Degree.split(",");
        const doctorId = req.id;
        let doctor = await User.findById(doctorId)
        if(!doctor){
            res.status(400).json({
                success:false,
                message:"No Doctor found"
            })
        }
        doctor.Name = Name,
        doctor.Email = Email,
        doctor.Contact = Contact,
        doctor.Age = Age,
        doctor.Expereince = Expereince,
        doctor.Education = educationArray,
        doctor.Address = Address,
        doctor.Fees = Fees,
        doctor.Gender = Gender

        await doctor.save();
        res.status(200).json({
            success:true,
            message:"Profile Updated successfully"
        })
    } catch (error) {
        console.log(error);
        
    }
}