import e from "express";
import { CreateEvent, GetAllEvents, GetEventById, GetAdminStats } from "./events.service.js";

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

const handleGetEvents = async (req,res,next)=>{
    try{
        const events = await GetAllEvents();
        return res.status(200).json(events);

    }catch(err){
        next(err);
    }
};

const handleGetEventsById = async (req,res,next)=>{
    try{
        const id = req.params.id
        const event = await GetEventById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json(event);

    }catch(err){
        next(err);
    }
}

const handleGetAdminStats = async (req,res,next)=>{
    try{
        const registeredEvents = await GetAdminStats();
        return res.status(200).json(registeredEvents);


    }catch(err){
        next(err);
    }
}

export {handleCreateEvent,handleGetEvents,handleGetEventsById, handleGetAdminStats};