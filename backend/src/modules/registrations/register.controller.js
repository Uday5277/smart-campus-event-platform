import RegisterForEvent from "./registeration.service.js";

const handleRegisterForEvent = async (req,res,next)=>{
    try{
        const userId = req.user.id;
        const eventId  = req.params.eventId;
        const registerId = await RegisterForEvent(userId,eventId);
        if (registerId === -1) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        if (registerId === 0) {
            return res.status(400).json({ success: false, message: "Event is already full" });
        }
        return res.status(201).json({
            success:true,
            message:"Registered for Event",
            registerId:registerId
        })

    }catch(err){
        next(err);
    }
}

export default handleRegisterForEvent;