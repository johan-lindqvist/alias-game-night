import { ChangeEvent } from "react";
import { IUploadGameDictionaryButtonProps } from "./types";
import { schema } from './schema';

export const UploadGameDictionaryButton = ({ onFileUpload }: IUploadGameDictionaryButtonProps) => {
  const isJsonValid = async (json: any): Promise<boolean> => {
    try {
      await schema.validate(json);

      return true;
    } catch {
      return false;
    }
  };

  const onReaderLoad = async (event: ProgressEvent<FileReader>) => {
    const result = event.target?.result;

    if (result) {
      const json = JSON.parse(result as string);
      
      const valid = await isJsonValid(json);

      if (valid) {
        onFileUpload(json);
      } else {
        console.log('nope');
      }
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = onReaderLoad;
      reader.readAsText(file);
    }
  };

  return <input type="file" accept="application/json" onChange={onFileChange} />
};