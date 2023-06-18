import { Schema, model } from "mongoose";

export interface Wine{
id: string;
name: string;
price: number;
tags: string[];
favourite: boolean;
stars: number;
imageUrl: string;
kind: string;
description: string;
}

export const WineSchema = new Schema<Wine>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String]},
        favourite: {type: Boolean, default: false},
        stars: {type: Number, required: true},
        imageUrl: {type: String, required: true},
        kind: {type: String},
        description: {type: String}
    }, {
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
);

export const WineModel = model<Wine>('wine', WineSchema);