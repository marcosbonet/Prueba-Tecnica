import mongoose from 'mongoose';
import { Candidates, CandidateType } from '../entities/candidate.js';

export class Repository {
    static instance: Repository;
    public static getInstance(): Repository {
        if (!Repository.instance) {
            Repository.instance = new Repository();
        }
        return Repository.instance;
    }
    #Model = Candidates;
    async get(): Promise<Array<CandidateType>> {
        return Candidates.find();
    }

    async create(data: Partial<CandidateType>): Promise<CandidateType> {
        const result = await Candidates.create(data);

        return result as CandidateType;
    }

    disconnect() {
        mongoose.disconnect();
    }
}
