import { Router } from "express";
import { sample_tags, sample_wine } from "../data";
import asyncHandler from 'express-async-handler';
import { WineModel } from "../models/wine.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const wineCount = await WineModel.countDocuments();
        if(wineCount > 0 ){
            res.send("Seed is already done");
            return;
        }
        await WineModel.create(sample_wine);
        res.send("Seed is done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const wines = await WineModel.find();
        res.send(wines);
}
))

router.get("/search/:searchTerm",asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const wines = await WineModel.find({name: {$regex:searchRegex}})
        res.send(wines);
    }
))

router.get("/tags", asyncHandler(
    async (req, res) =>{  
        const tags =  await WineModel.aggregate([
            {
                $unwind:'$tags'
            },
            {
                $group:{
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name:'$_id',
                    count:'$count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name: 'All',
            count: await WineModel.countDocuments()
        }
        tags.unshift(all);
        res.send(tags);
}
))

router.get("/tags/:tagName", asyncHandler(
    async (req, res) =>{
        const wines = await WineModel.find({tags: req.params.tagName})
        res.send(wines);
}
))

router.get("/:wineId", asyncHandler(async (req, res) => {
    const wines = await WineModel.findById(req.params.wineId)
     res.send(wines);
}
))

export default router;