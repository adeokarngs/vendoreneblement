/**
 * VendorEnablement
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Master } from './master';


export interface SubSkillMapping { 
    id?: number | null;
    createdBy?: number;
    updatedBy?: number | null;
    createdDate?: string;
    updatedDate?: string | null;
    skillId?: number;
    skill?: Master;
}

