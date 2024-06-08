import { ChangeEvent, useRef } from 'react';
import { usePapaParse } from 'react-papaparse';

import { useSetupContext } from '~/hooks/useSetupContext';
import { EDictionaryTypes, IWords } from '~/types';

import { schema } from './schema';
import { IUploadGameDictionaryButtonProps } from './types';

const TYPE_JSON = 'application/json';
const TYPE_CSV = 'text/csv';

export function UploadGameDictionaryButton({ onFileUpload }: IUploadGameDictionaryButtonProps) {
  const { dictionary } = useSetupContext();
  const { readString } = usePapaParse();

  const fileNameRef = useRef('');
  const fileTypeRef = useRef('');

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

    if (!result) {
      return;
    }

    if (fileTypeRef.current === TYPE_JSON) {
      const json = JSON.parse(result as string);

      const valid = await isJsonValid(json);

      if (valid) {
        onFileUpload({ fileName: fileNameRef.current, words: json });
      }
    }

    if (fileTypeRef.current === TYPE_CSV) {
      readString<string[]>(result as string, {
        worker: true,
        complete: (results) => {
          const columns: EDictionaryTypes[] = [
            EDictionaryTypes.Easy,
            EDictionaryTypes.Medium,
            EDictionaryTypes.Hard,
            EDictionaryTypes.Extreme,
          ];

          const isColumnKey = (column: string): column is EDictionaryTypes =>
            columns.includes(column as EDictionaryTypes);

          const wordsMap: Record<EDictionaryTypes, { words: string[]; index: number }> = {
            easy: {
              words: [],
              index: -1,
            },
            medium: {
              words: [],
              index: -1,
            },
            hard: {
              words: [],
              index: -1,
            },
            extreme: {
              words: [],
              index: -1,
            },
          };

          const [firstRow, ...restRows] = results.data;

          firstRow.forEach((column, colIndex) => {
            const col = column.toLowerCase();

            if (isColumnKey(col)) {
              wordsMap[col].index = colIndex;
            }
          });

          const isInvalid = Object.values(wordsMap).some(({ index }) => index === -1);

          if (isInvalid) {
            // eslint-disable-next-line no-console
            console.error('Invalid file format');
            return;
          }

          restRows.reduce((acc, row) => {
            columns.forEach((column) => {
              const newWord = row[acc[column].index];

              acc[column].words = [...acc[column].words, newWord];
            });

            return acc;
          }, wordsMap);

          const words = Object.entries(wordsMap).reduce<IWords>(
            (acc, [column, { words: columnWords }]) => {
              if (isColumnKey(column)) {
                acc[column] = columnWords;
              }

              return acc;
            },
            { easy: [], medium: [], hard: [], extreme: [] },
          );

          onFileUpload({ fileName: fileNameRef.current, words });
        },
      });
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();

      fileNameRef.current = file.name;
      fileTypeRef.current = file.type;

      reader.onload = onReaderLoad;
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <label htmlFor="upload">{dictionary ? `Cached file: ${dictionary.fileName}` : 'No file'}</label>
      <input type="file" name="upload" accept="text/csv,application/json" onChange={onFileChange} />
    </div>
  );
}
