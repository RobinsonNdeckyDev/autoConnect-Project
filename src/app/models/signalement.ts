import { Annonce } from "./annonce";

export interface Signalement {
    description: string;
    annonce: Annonce;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
}
