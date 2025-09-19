import { Base } from "../Base.js";

export class InvestmentType extends Base
{
    public categoryId? : number;
    public name?: string;
    public growthRate?: number;
    public risk?: string;
}