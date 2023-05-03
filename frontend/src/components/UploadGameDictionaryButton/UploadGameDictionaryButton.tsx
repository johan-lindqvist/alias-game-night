import { ChangeEvent, useRef } from 'react';

import { useSetupContext } from '~/hooks/useSetupContext';

import { schema } from './schema';
import { IUploadGameDictionaryButtonProps } from './types';

export function UploadGameDictionaryButton({ onFileUpload }: IUploadGameDictionaryButtonProps) {
  const { dictionary } = useSetupContext();
  const fileNameRef = useRef('');

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
        onFileUpload({ fileName: fileNameRef.current, words: json });
      }
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();

      fileNameRef.current = file.name;

      reader.onload = onReaderLoad;
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <label htmlFor="upload">{dictionary ? `Cached file: ${dictionary.fileName}` : 'No file'}</label>
      <input type="file" name="upload" accept="application/json" onChange={onFileChange} />
    </div>
  );
}
