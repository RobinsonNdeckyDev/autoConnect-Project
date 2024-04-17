import { Commentaire } from "./commentaire";
import { Signalement } from "./signalement";

export interface Annonce {
  nom: string;
  marque: string;
  couleur: string;
  image: File; // Champs d'image de type File
  prix: number;
  description: string;
  nbrePlace: number;
  localisation: string;
  moteur: string;
  annee: number;
  carburant: string; // Peut-être un string selon la structure de vos données
  carosserie: string;
  kilometrage: string;
  transmission: string;
  climatisation: string;
  categorie_id: number;
  image1: File; // Champs d'image de type File
  image2: File; // Champs d'image de type File
  image3: File; // Champs d'image de type File
  image4: File; // Champs d'image de type File
  
  commentaires: Commentaire[];
  signalements: Signalement[];
}
