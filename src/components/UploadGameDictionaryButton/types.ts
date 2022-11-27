import { IGameDictionary } from "types";

export interface IUploadGameDictionaryButtonProps {
  onFileUpload: (data: IGameDictionary) => void;
}