/**
 * VendorEnablement
 *
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ConsultantAddress } from './consultantAddress';
import { Contact } from './contact';

export interface Consultant {
  id?: number;
  createdBy?: number;
  updatedBy?: number | null;
  createdDate?: string;
  udpatedDate?: string | null;
  userId?: number;
  address?: Array<ConsultantAddress> | null;
  socialMediaAccounts?: string | null;
  alternateContact?: Array<Contact> | null;
  isOpenForVerification?: boolean;
}
