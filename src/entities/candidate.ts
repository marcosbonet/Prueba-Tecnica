import { Schema, model } from 'mongoose';

export type CandidateType = {
    id: string;
    name: string;
    surname: string;
    phone: number;
    email: string;
    cv: string;
};
export const candidatesSchema = new Schema<CandidateType>({
    id: String,
    name: String,
    surname: String,
    phone: Number,
    email: String,
    cv: String,
});

export const Candidates = model<CandidateType>(
    'Candidates',
    candidatesSchema,
    'candidates'
);
