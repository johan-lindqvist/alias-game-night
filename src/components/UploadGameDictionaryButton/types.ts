export interface IGameDictionary {
  easy: string[];
  medium: string[];
  hard: string[];
  veryhard: string[];
}

export interface IUploadGameDictionaryButtonProps {
  onFileUpload: (data: IGameDictionary) => void;
}