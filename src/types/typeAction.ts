import { Constants } from "components/actions/actions";
import { Product } from "./typesState";
import { Types } from "mongoose";

type ConstantsValues = `${Constants}`;

export interface IAction {
    type: ConstantsValues,
    product:Product,
    index: number,
    products:Product[],
    id:Types.ObjectId
}
