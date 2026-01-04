import e from "express";
import { CreateEvent, GetAllEvents, GetEventById } from "./events.service.js";

const handleCreateEvent = async (req,res,next)=>{
    try{
    const{title,description,totalSeats,startTime,endTime} = req.body;

    if(!title || !description || ! totalSeats || !startTime || !endTime){
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields: title, description, totalSeats, startTime, and endTime."
        });
    }
     const eventId = await CreateEvent({title,description,totalSeats,startTime,endTime});

     return res.status(201).json({
        success:true,
        message:"Event created successfully",
        data:{eventId}
     })
    }catch(err){
        next(err);
    }
};

const handleGetEvents = (req,res,next)=>{
    try{
        return GetAllEvents();

    }catch(err){
        next(err);
    }
};

const handleGetEventsById = (req,res,next)=>{
    try{
        const id = req.params.id
        return GetEventById(id);

    }catch(err){
        next(err);
    }
}

export {handleCreateEvent,handleGetEvents,handleGetEventsById};