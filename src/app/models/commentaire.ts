import { Annonce } from "./annonce";

export interface Commentaire {
    commentaire: Commentaire;
    annonce: Annonce;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
}
