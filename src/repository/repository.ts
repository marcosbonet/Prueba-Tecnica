import createDebug from 'debug';
import mongoose from 'mongoose';
import { Candidates, CandidateType } from '../entities/candidate.js';

const debug = createDebug('PF:candidates:repository');
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
        const result = await this.#Model.find({});

        return result;
    }

    async create(data: Partial<CandidateType>): Promise<CandidateType> {
        const result = await this.#Model.create(data);
        debug('repository');

        return result as CandidateType;
    }

    disconnect() {
        mongoose.disconnect();
    }
}
